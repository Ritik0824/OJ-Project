const express = require('express');
const mongoose = require('mongoose');
const Problem = require("../models/ProblemModel");
const problemRouter = require('./problemid');

const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use('/', problemRouter);

// Ensure your DB connection is properly imported and used
const { DBConnection } = require('../database/db');
DBConnection();

app.post("/problem", async (req, res) => {
    console.log("Received POST request to /problem");
    console.log(req.body); // Check if req.body is correctly received

    const problemDescription = new Problem(req.body);
    try {
        const savedProblem = await problemDescription.save();
        res.status(201).json({
            status: 'Success',
            data: {
                problem: savedProblem
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});

app.get('/get-problem', async(req,res) => {
    const savedGetProblem = await Problem.find({})
    try{
        res.status(200).json({
            status: 'Success',
            data : {
                savedGetProblem
            }
        })
    } 
    catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})

app.patch('/update-problem/:id', async (req,res) => {
    const updatedProblem = await Problem.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
      })
    try{
        res.status(200).json({
            status : 'Success',
            data : {
                updatedProblem
            }
          })
    }catch(err){
        console.log(err)
    }
})

app.delete('/delete-problem/:id', async(req,res) => {
    await Problem.findByIdAndDelete(req.params.id)
    try{
      res.status(204).json({
          status : 'Success',
          data : {}
      })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

module.exports = app;
