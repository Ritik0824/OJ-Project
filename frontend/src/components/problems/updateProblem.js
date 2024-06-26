import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdatedProblem = () => {
  const { id } = useParams(); // Get the id from URL params

  // State variables for each field
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

  // Function to fetch problem details based on id
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/problem/${id}`);
        const problemData = response.data.data; // Assuming data is structured as { status: 'Success', data: { problem details } }
        // Set state with fetched problem details
        setProblemName(problemData.problemName);
        setDescription(problemData.description);
        setDifficulty(problemData.difficulty);
        setSubmissions(problemData.submissions);
        setMarks(problemData.marks);
        setAuthor(problemData.author);
        setConstraints(problemData.constraints);
        setInputFormat(problemData.inputFormat);
        setOutputFormat(problemData.outputFormat);
        setSampleInput(problemData.sampleInput);
        setSampleOutput(problemData.sampleOutput);
        setExplanation(problemData.explanation);
      } catch (error) {
        console.error('Error fetching problem details:', error);
      }
    };

    if (id) {
      fetchProblem();
    }
  }, [id]);

  // Function to handle form submission and update problem
  const updProblem = () => {
    const updatedProblem = {
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
    };

    axios.put(`http://localhost:8000/update-problem/${id}`, updatedProblem)
      .then(response => {
        console.log('Problem updated successfully:', response.data);
        // Optionally, handle success behavior like showing a success message or redirecting
      })
      .catch(error => {
        console.error('Error updating problem:', error);
        // Optionally, handle error behavior like showing an error message
      });
  };

  return (
    <div>
      {/* Example form fields - replace with your actual form */}
      <input type="text" value={problemName} onChange={(e) => setProblemName(e.target.value)} placeholder="Problem Name" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
      <input type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} placeholder="Difficulty" />
      <input type="number" value={submissions} onChange={(e) => setSubmissions(e.target.value)} placeholder="Submissions" />
      <input type="number" value={marks} onChange={(e) => setMarks(e.target.value)} placeholder="Marks" />
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
      <textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} placeholder="Constraints"></textarea>
      <textarea value={inputFormat} onChange={(e) => setInputFormat(e.target.value)} placeholder="Input Format"></textarea>
      <textarea value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} placeholder="Output Format"></textarea>
      <textarea value={sampleInput} onChange={(e) => setSampleInput(e.target.value)} placeholder="Sample Input"></textarea>
      <textarea value={sampleOutput} onChange={(e) => setSampleOutput(e.target.value)} placeholder="Sample Output"></textarea>
      <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Explanation"></textarea>
      
      {/* Example button to trigger update */}
      <button onClick={updProblem}>Update Problem</button>
    </div>
  );
};

export default UpdatedProblem;
