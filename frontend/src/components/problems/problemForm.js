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
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="problemName">Problem Name: </label>
                <input
                    type="text"
                    id="problemName"
                    value={problemName}
                    onChange={(e) => setProblemName(e.target.value)}
                /><br/><br/>

                <label htmlFor="description">Description: </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                /><br/><br/>

                <label htmlFor="difficulty">Difficulty: </label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select><br/><br/>

                <label htmlFor="submissions">Submissions: </label>
                <input
                    type="number"
                    id="submissions"
                    value={submissions}
                    onChange={(e) => setSubmissions(parseInt(e.target.value))}
                /><br/><br/>

                <label htmlFor="marks">Marks: </label>
                <input
                    type="number"
                    id="marks"
                    value={marks}
                    onChange={(e) => setMarks(parseInt(e.target.value))}
                /><br/><br/>

                <label htmlFor="author">Author: </label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                /><br/><br/>

                <label htmlFor="constraints">Constraints: </label>
                <textarea
                    id="constraints"
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                /><br/><br/>

                <label htmlFor="inputFormat">Input Format: </label>
                <textarea
                    id="inputFormat"
                    value={inputFormat}
                    onChange={(e) => setInputFormat(e.target.value)}
                /><br/><br/>

                <label htmlFor="outputFormat">Output Format: </label>
                <textarea
                    id="outputFormat"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                /><br/><br/>

                <label htmlFor="sampleInput">Sample Input: </label>
                <textarea
                    id="sampleInput"
                    value={sampleInput}
                    onChange={(e) => setSampleInput(e.target.value)}
                /><br/><br/>

                <label htmlFor="sampleOutput">Sample Output: </label>
                <textarea
                    id="sampleOutput"
                    value={sampleOutput}
                    onChange={(e) => setSampleOutput(e.target.value)}
                /><br/><br/>

                <label htmlFor="explanation">Explanation: </label>
                <textarea
                    id="explanation"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                /><br/><br/>

                <button type="submit">Add New Problem</button>
            </form>
        </div>
    );
};

export default ProblemForm;
