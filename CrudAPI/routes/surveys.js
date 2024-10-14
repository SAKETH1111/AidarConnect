const express = require('express');
const router = express.Router();
const Survey = require('../models/survey'); // Survey model

// Get all surveys
router.get("/", async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Create a new survey
router.post("/", async (req, res) => {
  const { nameofsurvey, assignedPatients, questions, createdBy } = req.body; // Use nameofsurvey and createdBy

  const newSurvey = new Survey({
    nameofsurvey, // Updated from name to nameofsurvey
    assignedPatients,
    questions, // Assuming the questions follow the new schema with questiontype and questiontext
    createdBy,  // Include the creator
  });

  try {
    const savedSurvey = await newSurvey.save();
    res.status(201).json({ message: "Survey created successfully", survey: savedSurvey });
  } catch (err) {
    res.status(500).json({ message: "Error creating survey", error: err.message });
  }
});

// Update a survey by ID
router.patch("/:id", async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    survey.nameofsurvey = req.body.nameofsurvey || survey.nameofsurvey; // Updated from name to nameofsurvey
    survey.assignedPatients = req.body.assignedPatients || survey.assignedPatients;
    survey.questions = req.body.questions || survey.questions;
    survey.createdBy = req.body.createdBy || survey.createdBy; // Allow updating createdBy if necessary

    const updatedSurvey = await survey.save();
    res.json({ message: "Survey updated successfully", survey: updatedSurvey });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a survey
router.delete("/:id", async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    await survey.deleteOne();
    res.json({ message: "Survey deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /surveys/:id/answers - Save survey answers
router.post('/:id/answers', async (req, res) => {
  const { patientName, answers } = req.body; // Expecting patient's name and their answers

  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    // Add the patient's responses to the survey
    survey.responses.push({ patientName, answers });

    const updatedSurvey = await survey.save();
    res.json({ message: 'Answers saved successfully', survey: updatedSurvey });
  } catch (err) {
    res.status(500).json({ message: 'Error saving answers', error: err.message });
  }
});

module.exports = router;
