import { createContext } from 'react';

const ProblemContext = createContext({
  problems: [],
  addProblem: () => {},
});

export default ProblemContext;
