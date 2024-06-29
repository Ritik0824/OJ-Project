import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [code, setCode] = useState(`
    #include <iostream>
    using namespace std;
    int main() {
      cout << "Hello, World!" << endl;
      return 0;
    }
  `);

  const [output, setOutput] = useState('');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        console.log('Fetching problem with ID:', id);
        const response = await Axios.get(`http://localhost:8000/api/get-problem/${id}`);
        console.log('API response:', response.data);

        setProblem(response.data.data.problem);
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

  const handleSubmit = async () => {
    const payload = {
      language: 'cpp',
      code
    };

    try {
      const { data } = await Axios.post('http://localhost:4000/run', payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  };

  const infoItems = [
    { label: 'Description', value: problem.description },
    { label: 'Difficulty', value: problem.difficulty },
    { label: 'Submissions', value: problem.submissions },
    { label: 'Marks', value: problem.marks },
    { label: 'Author', value: problem.author },
    { label: 'Constraints', value: problem.constraints },
    { label: 'Input Format', value: problem.inputFormat },
    { label: 'Output Format', value: problem.outputFormat },
    { label: 'Sample Input', value: problem.sampleInput },
    { label: 'Sample Output', value: problem.sampleOutput },
    { label: 'Explanation', value: problem.explanation }
  ];

  const InfoItem = ({ label, value }) => (
    <div className="mb-2">
      <strong>{label}:</strong> {value}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="problem-details p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">{problem.problemName}</h2>
          <div>
            {infoItems.map((item, index) => (
              <InfoItem key={index} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
        <div className="code-editor p-4 bg-white rounded shadow-md">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              minHeight: '300px',
              backgroundColor: '#f7fafc',
              borderRadius: '4px',
              border: '1px solid #e2e8f0',
            }}
          />
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Run
            </button>
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
              Reset
            </button>
          </div>
          {output && (
            <div className="output mt-4 p-2 bg-gray-100 rounded border border-gray-300">
              <pre>{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
