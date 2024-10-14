const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  nameofsurvey: { type: String, required: true }, // Survey name
  assignedPatients: [String], // Array of patient IDs the survey is assigned to
  createdBy: { type: String, required: true }, // Who created the survey (e.g., user ID or name)
  questions: [
    {
      questiontype: { type: String, required: true }, // "short-answer", "multiple-choice", or "rating"
      questiontext: { type: String, required: true }, // The actual question text
      required: { type: Boolean, default: false },
      options: [String], // Options for multiple-choice questions
    },
  ],
  responses: [
    {
      patientName: { type: String, required: true }, // The patient who provided the response
      answers: [
        {
          questionId: { type: mongoose.Schema.Types.ObjectId, required: true }, // The question being answered
          answer: { type: String, required: true } // The answer provided by the patient
        }
      ]
    }
  ],
  createdAt: { type: Date, default: Date.now }, // Survey creation date
});

module.exports = mongoose.model('Survey', SurveySchema);
