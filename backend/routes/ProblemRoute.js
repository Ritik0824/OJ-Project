const express = require('express');
const { createProblem, getProblems, updateProblem, deleteProblem ,getProblembyID } = require('../controllers/problem');

const ProblemRoutes = express.Router();

ProblemRoutes.post("/problem", createProblem);
ProblemRoutes.get('/get-problem', getProblems);
ProblemRoutes.get('/get-problem/:id', getProblembyID);
ProblemRoutes.patch('/update-problem/:id', updateProblem);
ProblemRoutes.delete('/delete-problem/:id', deleteProblem);

module.exports = ProblemRoutes;
