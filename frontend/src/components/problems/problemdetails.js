import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const ProblemDetail = () => {
  const { id } = useParams(); // This fetches the id parameter from the URL
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        console.log('Fetching problem with ID:', id); // Debug line
        const response = await Axios.get(`http://localhost:8000/api/get-problem/${id}`);
        console.log('API response:', response.data); // Debug line

        // Log the exact structure of the response to understand the nesting
        console.log('Problem data:', response.data.data);

        // Log the entire data object
        console.log('Entire data object:', response.data);

        setProblem(response.data.data.problem); // Adjust this path based on the actual response structure
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setError('Error fetching problem data');
        setLoading(false);
      }
    };

    if (id) {
      fetchProblem();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!problem) {
    return <div>No problem data available</div>;
  }

  return (
    <div>
      <h2>{problem.problemName}</h2>
      <p><strong>Description:</strong> {problem.description}</p>
      <p><strong>Difficulty:</strong> {problem.difficulty}</p>
      <p><strong>Submissions:</strong> {problem.submissions}</p>
      <p><strong>Marks:</strong> {problem.marks}</p>
      <p><strong>Author:</strong> {problem.author}</p>
      <p><strong>Constraints:</strong> {problem.constraints}</p>
      <p><strong>Input Format:</strong> {problem.inputFormat}</p>
      <p><strong>Output Format:</strong> {problem.outputFormat}</p>
      <p><strong>Sample Input:</strong> {problem.sampleInput}</p>
      <p><strong>Sample Output:</strong> {problem.sampleOutput}</p>
      <p><strong>Explanation:</strong> {problem.explanation}</p>
    </div>
  );
};

export default ProblemDetail;
