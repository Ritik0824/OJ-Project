import React, { useState, useContext } from 'react';
import Axios from 'axios';
import ProblemContext from './problemContext';

const ProblemForm = () => {
    const [problemName, setProblemName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [submissions, setSubmissions] = useState(0);
    const [marks, setMarks] = useState(0);
    const [author, setAuthor] = useState('');
    const [constraints, setConstraints] = useState('');
    const [inputFormat, setInputFormat] = useState('');
    const [outputFormat, setOutputFormat] = useState('');
    const [sampleInput, setSampleInput] = useState('');
    const [sampleOutput, setSampleOutput] = useState('');
    const [explanation, setExplanation] = useState('');

    const { addProblem } = useContext(ProblemContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:8000/api/problem', {
                problemName,
                description,
                difficulty,
                submissions,
                marks,
                author,
                constraints,
                inputFormat,
                outputFormat,
                sampleInput,
                sampleOutput,
                explanation
            });
            addProblem(response.data);

            // Optionally, reset form fields after successful submission
            setProblemName('');
            setDescription('');
            setDifficulty('');
            setSubmissions(0);
            setMarks(0);
            setAuthor('');
            setConstraints('');
            setInputFormat('');
            setOutputFormat('');
            setSampleInput('');
            setSampleOutput('');
            setExplanation('');
        } catch (error) {
            console.error('Error adding problem:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Problem</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="problemName" className="block text-sm font-medium text-gray-700">Problem Name</label>
                    <input
                        type="text"
                        id="problemName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={problemName}
                        onChange={(e) => setProblemName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
                    <select
                        id="difficulty"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="">Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="submissions" className="block text-sm font-medium text-gray-700">Submissions</label>
                    <input
                        type="number"
                        id="submissions"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={submissions}
                        onChange={(e) => setSubmissions(parseInt(e.target.value))}
                    />
                </div>

                <div>
                    <label htmlFor="marks" className="block text-sm font-medium text-gray-700">Marks</label>
                    <input
                        type="number"
                        id="marks"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={marks}
                        onChange={(e) => setMarks(parseInt(e.target.value))}
                    />
                </div>

                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                    <input
                        type="text"
                        id="author"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        className="mt-1 block w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="constraints" className="block text-sm font-medium text-gray-700">Constraints</label>
                    <textarea
                        id="constraints"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={constraints}
                        onChange={(e) => setConstraints(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="inputFormat" className="block text-sm font-medium text-gray-700">Input Format</label>
                    <textarea
                        id="inputFormat"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={inputFormat}
                        onChange={(e) => setInputFormat(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="outputFormat" className="block text-sm font-medium text-gray-700">Output Format</label>
                    <textarea
                        id="outputFormat"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="sampleInput" className="block text-sm font-medium text-gray-700">Sample Input</label>
                    <textarea
                        id="sampleInput"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={sampleInput}
                        onChange={(e) => setSampleInput(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="sampleOutput" className="block text-sm font-medium text-gray-700">Sample Output</label>
                    <textarea
                        id="sampleOutput"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={sampleOutput}
                        onChange={(e) => setSampleOutput(e.target.value)}
                    />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="explanation" className="block text-sm font-medium text-gray-700">Explanation</label>
                    <textarea
                        id="explanation"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                    />
                </div>

                <div className="md:col-span-2 text-center">
                    <button type="submit" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Add New Problem
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProblemForm;
