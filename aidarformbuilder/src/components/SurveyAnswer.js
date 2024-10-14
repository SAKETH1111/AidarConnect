import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyAnswer = () => {
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({}); // Store errors for each survey
  const fullName = localStorage.getItem('fullName'); // Get the user's name from localStorage

  // Fetch surveys when the component mounts
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://localhost:9000/surveys');
        setSurveys(response.data);

        // Filter surveys based on assignedPatients matching fullName
        const filtered = response.data.filter(survey => {
          // Check if this user is assigned to the survey
          const isAssigned = survey.assignedPatients.includes(fullName);

          // Check if the user has already responded to the survey
          const hasResponded = survey.responses.some(response => response.patientName === fullName);

          // Only show the survey if the user is assigned and hasn't responded yet
          return isAssigned && !hasResponded;
        });

        setFilteredSurveys(filtered);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };

    fetchSurveys();
  }, [fullName]);

  // Handle input change for each question's answer
  const handleAnswerChange = (surveyId, questionId, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [surveyId]: {
        ...prevAnswers[surveyId],
        [questionId]: value
      }
    }));
  };

  // Validate required questions before submission
  const validateSurvey = (survey) => {
    const surveyErrors = {};
    let isValid = true;

    survey.questions.forEach(question => {
      const answer = answers[survey._id]?.[question._id] || '';
      if (question.required && !answer) {
        surveyErrors[question._id] = `Answer required for: "${question.questiontext}"`;
        isValid = false;
      }
    });

    setErrors(prevErrors => ({
      ...prevErrors,
      [survey._id]: surveyErrors
    }));

    return isValid;
  };

  // Handle form submission to save answers and remove the survey from the list
  const handleSubmit = async (surveyId) => {
    const survey = filteredSurveys.find(s => s._id === surveyId);

    // Validate the survey before submitting
    if (!validateSurvey(survey)) {
      alert('Please fill out all required questions.');
      return;
    }

    try {
      // Get answers for the specific survey
      const surveyAnswers = answers[surveyId] || {};

      // Structure the data in the expected format
      const payload = {
        patientName: fullName,
        answers: Object.keys(surveyAnswers).map(questionId => ({
          questionId,
          answer: surveyAnswers[questionId]
        }))
      };

      // Post the answers to the specific survey's answers endpoint
      const response = await axios.post(`http://localhost:9000/surveys/${surveyId}/answers`, payload);
      console.log('Answers submitted successfully:', response.data);
      alert('Answers submitted successfully!');

      // Remove the submitted survey from the filteredSurveys list
      setFilteredSurveys(prevSurveys => prevSurveys.filter(survey => survey._id !== surveyId));
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Error submitting answers');
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl mb-4">Answer Surveys</h1>

      {filteredSurveys.length === 0 && <p>No surveys assigned to you.</p>}

      {filteredSurveys.map(survey => (
        <div key={survey._id} className="mb-6">
          <h2 className="text-xl font-bold">{survey.nameofsurvey}</h2>
          <p>Created by: {survey.createdBy}</p>
          <p>Assigned to: {survey.assignedPatients.join(', ')}</p>

          {survey.questions.map(question => (
            <div key={question._id} className="mb-4">
              <p className="font-semibold">{question.questiontext} {question.required && <span className="text-red-500">*</span>}</p>

              {/* Render input based on question type */}
              {question.questiontype === 'short-answer' && (
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Your answer..."
                  onChange={(e) =>
                    handleAnswerChange(survey._id, question._id, e.target.value)
                  }
                />
              )}

              {question.questiontype === 'multiple-choice' && (
                <select
                  className="w-full p-2 border rounded"
                  onChange={(e) =>
                    handleAnswerChange(survey._id, question._id, e.target.value)
                  }
                >
                  <option value="">Select an option</option>
                  {question.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {question.questiontype === 'rating' && (
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="w-full p-2 border rounded"
                  placeholder="Rate from 1 to 5"
                  onChange={(e) =>
                    handleAnswerChange(survey._id, question._id, e.target.value)
                  }
                />
              )}

              {/* Display error message if the question is required and not answered */}
              {errors[survey._id]?.[question._id] && (
                <p className="text-red-500">{errors[survey._id][question._id]}</p>
              )}
            </div>
          ))}

          {/* Submit button for each survey */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => handleSubmit(survey._id)}
          >
            Submit Answers
          </button>
        </div>
      ))}
    </div>
  );
};

export default SurveyAnswer;
