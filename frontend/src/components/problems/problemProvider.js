import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ProblemContext from './problemContext';

const ProblemProvider = ({ children }) => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        console.log("Fetching problems");
        const response = await Axios.get('http://localhost:8000/api/get-problem');
        console.log('API Response:', response.data);

        // Correctly access the problems array
        if (
          response.data && 
          response.data.status === 'Success' && 
          Array.isArray(response.data.data.savedGetProblem)
        ) {
          setProblems(response.data.data.savedGetProblem);
        } else {
          console.error('API response does not contain an array of problems:', response.data);
        }
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  const addProblem = (newProblem) => {
    console.log("Adding problem:", newProblem);
    setProblems((prevProblems) => [...prevProblems, newProblem]);
  };


  return (
    <ProblemContext.Provider value={{ problems, addProblem }}>
      {children}
    </ProblemContext.Provider>
  );
};

export default ProblemProvider;
