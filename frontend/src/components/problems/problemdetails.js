import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const ProblemDetails = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Axios.get(`http://localhost:8000/get-problem/${id}`)
            .then(response => {
                setProblem(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading problem: {error.message}</div>;
    }

    if (!problem) {
        return <div>Problem not found</div>;
    }

    const {
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
    } = problem;

    return (
        <div className="container">
            <h2>Problem Details</h2>
            <p><strong>Problem Name:</strong> {problemName}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Difficulty:</strong> {difficulty}</p>
            <p><strong>Submissions:</strong> {submissions}</p>
            <p><strong>Marks:</strong> {marks}</p>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Constraints:</strong> {constraints}</p>
            <p><strong>Input Format:</strong> {inputFormat}</p>
            <p><strong>Output Format:</strong> {outputFormat}</p>
            <p><strong>Sample Input:</strong> {sampleInput}</p>
            <p><strong>Sample Output:</strong> {sampleOutput}</p>
            <p><strong>Explanation:</strong> {explanation}</p>
        </div>
    );
};

export default ProblemDetails;
