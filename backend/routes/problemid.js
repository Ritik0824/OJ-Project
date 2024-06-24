const express = require('express');
const Problem = require('../models/ProblemModel'); // Import your Mongoose model

const router = express.Router();

// Route to fetch a single problem by ID
router.get('/problem/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Problem not found'
      });
    }

    res.status(200).json({
      status: 'Success',
      data: problem
    });
  } catch (error) {
    console.error('Error fetching problem:', error);
    res.status(500).json({
      status: 'Failed',
      message: 'Internal server error'
    });
  }
});

module.exports = router;
