

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { FaPlay, FaPaperPlane, FaTerminal } from 'react-icons/fa'; // Import icons

const themeColor = 'blue'; // Set the theme color for your page


const SubmissionRow = ({ submission }) => {
  return (
    <tr>
      <td className="border px-4 py-2">{submission.userId ? submission.userId._id : 'Anonymous'}</td>
      <td className="border px-4 py-2">{submission.problemId}</td>
      <td className="border px-4 py-2">{submission.language}</td>
      <td className="border px-4 py-2">{submission.status}</td>
      <td className="border px-4 py-2">{submission.submissionDate}</td>
    </tr>
  );
};

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}`);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('input');
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('problem');
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [googleUser, setGoogleUser] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);

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

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await Axios.get(`http://localhost:4000/api/submissions/${id}`);
        console.log('API Submissions:', response.data);
  
        if (response.data.success) {
          setAllSubmissions(response.data.submissions);
        } else {
          console.error('Failed to fetch submissions:', response.data);
        }
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };
  
    if (id) {
      fetchSubmission();
    }
  }, [id]);

  const handleRun = async () => {
    const payload = {
      language: 'cpp',
      code,
      input
    };

    try {
      const { data } = await Axios.post('http://localhost:4000/run', payload);
      console.log("running /run request");
      console.log(data);
      setOutput(data.output);
      setActiveTab('output');
      setConsoleOpen(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users");
        const response = await Axios.get('http://localhost:8000/api/auth/getUser');
        console.log('API User Response:', response.data);

        if (
          response.data &&
          response.data.status === 'Success' &&
          Array.isArray(response.data.data.savedGetUser)
        ) {
          setUsers(response.data.data.savedGetUser);
        } else {
          console.error('API response does not contain users:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchGoogleUser = async () => {
      try {
        console.log("Fetching Google user");
        const response = await Axios.get('http://localhost:8000/api/auth/getGoogleUser');
        console.log('API Google User Response:', response.data);
        console.log('response.data.data.savedGetUser is : ', response.data.data.savedGetUser);
        if (
          response.data &&
          response.data.status === 'Success' &&
          response.data.data.savedGetUser
        ) {
          setGoogleUser(response.data.data.savedGetUser);
        } else {
          console.error('API response does not contain Google user:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Google user:', error);
      }
    };

    fetchGoogleUser();
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    console.log('Stored Email:', storedEmail);

    if (storedEmail) {
      const currentUser = users.find(user => user.email === storedEmail);
      console.log('Current User:', currentUser);
      const googlecurrentUser = googleUser.find(user => user.email === storedEmail);
      console.log('Google Current User:', googlecurrentUser);
      if (currentUser) {
        setUserId(currentUser._id);
        console.log('User ID:', currentUser._id);
      } else if (googlecurrentUser && googlecurrentUser.email === storedEmail) {
        setUserId(googlecurrentUser._id);
        console.log('Google User ID:', googlecurrentUser._id);
      } else {
        console.error('Current user not found in fetched users or Google user');
      }
    }
  }, [users, googleUser]);

  const handleSubmit = async () => {
    const payload = {
      userId,
      problemId: id,
      language: 'cpp',
      code
    };

    console.log("Submitting payload:", payload);

    try {
      const { data } = await Axios.post('http://localhost:4000/api/submissions/submit', payload);
      console.log(data);
      setOutput(data.status === 'accepted' ? 'All hidden test cases passed!' : 'Some hidden test cases failed.');
      setActiveTab('output');
      setConsoleOpen(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  const infoItems = [
    { label: 'Description', value: problem?.description },
    { label: 'Difficulty', value: problem?.difficulty },
    { label: 'Submissions', value: problem?.submissions },
    { label: 'Marks', value: problem?.marks },
    { label: 'Author', value: problem?.author },
    { label: 'Constraints', value: problem?.constraints },
    { label: 'Input Format', value: problem?.inputFormat },
    { label: 'Output Format', value: problem?.outputFormat },
    { label: 'Sample Input', value: problem?.sampleInput },
    { label: 'Sample Output', value: problem?.sampleOutput },
    { label: 'Explanation', value: problem?.explanation },
  ];

  const InfoItem = ({ label, value }) => (
    <div className="mb-4">
      <strong>{label}:</strong>
      <p>{value}</p>
    </div>
  );

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
    <div className="container mx-auto p-4 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="problem-details p-4 bg-white rounded shadow-md overflow-auto">
          <div className="flex mb-4 border-b">
            <button
              className={`tab px-4 py-2 ${activeSection === 'problem' ? 'bg-blue-200 border-t border-r border-l rounded-t' : 'bg-gray-100'}`}
              onClick={() => setActiveSection('problem')}
            >
              Problem
            </button>
            <button
              className={`tab px-4 py-2 ${activeSection === 'mySubmissions' ? 'bg-blue-200 border-t border-r border-l rounded-t' : 'bg-gray-100'}`}
              onClick={() => setActiveSection('mySubmissions')}
            >
              My Submissions
            </button>
            <button
              className={`tab px-4 py-2 ${activeSection === 'allSubmissions' ? 'bg-blue-200 border-t border-r border-l rounded-t' : 'bg-gray-100'}`}
              onClick={() => setActiveSection('allSubmissions')}
            >
              All Submissions        
              </button>
      </div>

      {activeSection === 'problem' && (
          <>
            <InfoItem label="Description" value={problem?.description} />

            <div className="flex mb-0">
              <div className="flex-1 mr-4">
                <InfoItem label="Difficulty" value={problem?.difficulty} />
              </div>
              <div className="flex-1">
                <InfoItem label="Submissions" value={problem?.submissions} />
              </div>
            </div>

            <div className="flex mb-1">
              <div className="flex-1 mr-4">
                <InfoItem label="Marks" value={problem?.marks} />
              </div>
              <div className="flex-1">
                <InfoItem label="Author" value={problem?.author} />
              </div>
            </div>

            {infoItems.slice(5).map((item, index) => (
              <InfoItem key={index} label={item.label} value={item.value} />
            ))}
          </>
        )}

      {activeSection === 'mySubmissions' && (
        <div>
          <h2 className="text-xl font-bold mb-4">My Submissions</h2>
          {/* Display my submissions here */}
        </div>
      )}

      {activeSection === 'allSubmissions' && (
        <div>
        <h2 className="text-xl font-bold mb-4">All Submissions</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Problem ID</th>
              <th className="border px-4 py-2">Language</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {allSubmissions.length > 0 ? (
              allSubmissions.map((submission, index) => (
                <SubmissionRow key={index} submission={submission} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No submissions available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      )}
    </div>

    <div className="coding-area p-4 bg-white rounded shadow-md flex flex-col h-full">
        <ResizableBox
        width={600}
        height={550}
        minConstraints={[300, 200]}
        maxConstraints={[800, 600]}
        resizeHandles={['s', 'e', 'se']}
        >
        <div style={{ height: '100%', width: '100%' }}>
          <Editor
            height="100%"
            language="cpp"
            theme="vs-dark"
            value={code}
            onChange={(newValue) => setCode(newValue)}
            options={{
              inlineSuggest: true,
              fontSize: 16,
              formatOnType: true,
              autoClosingBrackets: 'always',
              minimap: { enabled: true },
            }}
          />
        </div>
        </ResizableBox>
        <div className={`mt-4 ${consoleOpen ? 'block' : 'hidden'} flex-grow`}>
      <div className="flex space-x-4 mb-2">
        <button
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'input' ? 'bg-gray-200' : 'bg-gray-100'}`}
          onClick={() => setActiveTab('input')}
        >
          Input
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'output' ? 'bg-gray-200' : 'bg-gray-100'}`}
          onClick={() => setActiveTab('output')}
        >
          Output
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'verdict' ? 'bg-gray-200' : 'bg-gray-100'}`}
          onClick={() => setActiveTab('verdict')}
        >
          Verdict
        </button>
      </div>
      <div className="border rounded-b-lg p-2">
        {activeTab === 'input' && (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your input here"
            rows={5}
            className="w-full p-2 border rounded"
          />
        )}
        {activeTab === 'output' && (
          <pre className="w-full p-2 border rounded bg-gray-100">{output}</pre>
        )}
        {activeTab === 'verdict' && (
          <pre className="w-full p-2 border rounded bg-gray-100">{output ? 'Successful' : 'Failed'}</pre>
        )}
      </div>
    </div>

    <div className="mt-4 flex space-x-4">
      <button
        onClick={() => setConsoleOpen(!consoleOpen)}
        className={`bg-black text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-${themeColor}-600 focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 focus:ring-opacity-50`}
      >
        <FaTerminal />
        <span>{consoleOpen ? 'Close Console' : 'Open Console'}</span>
      </button>
      <button
        onClick={handleRun}
        className="bg-green-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        <FaPlay />
        <span>Run</span>
      </button>
      <button
        onClick={handleSubmit}
        className="bg-red-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        <FaPaperPlane />
        <span>Submit</span>
      </button>
        </div>
        </div>
        </div>
        </div>
        );
        };

export default ProblemDetail;
