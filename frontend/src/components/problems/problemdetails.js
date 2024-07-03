import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

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
  const [userId, setUserId] = useState(null); // State to store current user's ID
  const [users, setUsers] = useState([]); // State to store users
  const [googleUser, setGoogleUser] = useState([]); // State to store Google user data

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
        console.log('response.data.data.savedGetUser is : ',response.data.data.savedGetUser);
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
    const storedEmail = localStorage.getItem('email'); // Get current user's email from local storage
    console.log('Stored Email:', storedEmail); // Debug: Log the stored email

    if (storedEmail) {
      // Check for regular users
      const currentUser = users.find(user => user.email === storedEmail);
      console.log('Current User:', currentUser); // Debug: Log the current user found in users array
      //console.log(googleUser);
      const googlecurrentUser = googleUser.find(user => user.email === storedEmail);
      console.log('Google Current User:', googlecurrentUser); // Debug: Log the current user found in users array
      if (currentUser) {
        setUserId(currentUser._id); // Set current user's ID in state
        console.log('User ID:', currentUser._id); // Debug: Log the user ID
      } else if (googlecurrentUser && googlecurrentUser.email === storedEmail) {
        // Check for Google user
        setUserId(googlecurrentUser._id); // Assuming you use googleId as userId for Google users
        console.log('Google User ID:', googlecurrentUser._id); // Debug: Log the Google user ID
      } else {
        console.error('Current user not found in fetched users or Google user');
      }
    }
  }, [users, googleUser]);

  const handleSubmit = async () => {
    const payload = {
      userId, // This should be dynamic based on your app logic
      problemId: id, // id from useParams
      language: 'cpp',
      code
    };

    console.log("Submitting payload:", payload); // Log the payload

    try {
      const { data } = await Axios.post('http://localhost:4000/api/submissions/submit', payload);
      console.log(data);
      setOutput(data.status === 'accepted' ? 'All hidden test cases passed!' : 'Some hidden test cases failed.');
      setActiveTab('output');
      setConsoleOpen(true);
    } catch (error) {
      console.log(error.response); // Log the error response
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
    <div className="mb-2">
      <strong>{label}:</strong> {value}
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
          <ResizableBox
            width={600}
            height={400}
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
          <div className={`mt-4 ${consoleOpen ? 'block' : 'hidden'}`}>
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
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {consoleOpen ? 'Close Console' : 'Open Console'}
            </button>
            <button
              onClick={handleRun}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Run
            </button>
            <button
              onClick={handleSubmit}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {googleUser && (
        <div className="mt-4 p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Google User Details</h2>
          <div>
            <div className="mb-2">
              <strong>Google ID:</strong> {googleUser.googleId}
            </div>
            <div className="mb-2">
              <strong>Display Name:</strong> {googleUser.displayName}
            </div>
            <div className="mb-2">
              <strong>Email:</strong> {googleUser.email}
            </div>
            <div className="mb-2">
              <img src={googleUser.image} alt={googleUser.displayName} style={{ maxWidth: '100px' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemDetail;
