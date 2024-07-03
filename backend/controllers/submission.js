const Problem = require('../models/ProblemModel');
const Submission = require('../models/SubmissionModel');
const { generateFile } = require('../generateFile');
const { generateInputFile } =  require('../generateInputFile');
const { executeCpp } = require('../executeCpp');
const { get } = require('mongoose');

const submitCode = async (req, res) => {
    const { userId, language = 'cpp', code, problemId } = req.body;
    if (!code || !problemId) {
        return res.status(400).json({ success: false, error: "Code or problem ID is missing!" });
    }

    try {
        // Fetch hidden test cases for the specified problem ID
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ success: false, error: 'Problem not found' });
        }

        const hiddenTestCases = problem.hiddenTestCases;
        const filePath = await generateFile(language, code);
        const results = [];

        for (const testCase of hiddenTestCases) {
            const inputPath = await generateInputFile(testCase.input);
            const output = await executeCpp(filePath, inputPath);

            const isCorrect = output.trim() === testCase.expectedOutput.trim();
            results.push({ input: testCase.input, expectedOutput: testCase.expectedOutput, actualOutput: output, isCorrect });
        }

        const allCorrect = results.every(result => result.isCorrect);
        const result = allCorrect ? 'accepted' : 'wrong answer';

        // Save the submission
        const submission = new Submission({
            userId, 
            problemId, 
            code, 
            language, 
            result
        });
        await submission.save();

        res.json({ status: result, results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSubmissions = async (req, res) => {
    const { problemId } = req.params;

    try {
        const submissions = await Submission.find({ problemId }).populate('userId', 'username');
        res.json({ success: true, submissions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { submitCode, getSubmissions };
