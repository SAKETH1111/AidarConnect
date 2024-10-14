import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnsweredSurvey = () => {
  const [surveys, setSurveys] = useState([]);
  const fullName = localStorage.getItem('fullName'); // Get the user's name from localStorage

  // Fetch surveys when the component mounts
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://localhost:9000/surveys');
        
        // Filter surveys based on:
        // - The survey was created by the user (matches `fullName`)
        // - The survey has at least one response
        const filtered = response.data.filter(survey => {
          const isCreatedByUser = survey.createdBy === fullName;
          const hasResponses = survey.responses && survey.responses.length > 0;
          return isCreatedByUser && hasResponses;
        });

        setSurveys(filtered);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };

    fetchSurveys();
  }, [fullName]);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl mb-4">Answered Surveys</h1>

      {surveys.length === 0 && <p>No surveys with responses yet.</p>}

      {surveys.map(survey => (
        <div key={survey._id} className="mb-6">
          <h2 className="text-xl font-bold">{survey.nameofsurvey}</h2>
          <p>Created by: {survey.createdBy}</p>
          <p>Responses:</p>

          {/* Show all responses */}
          {survey.responses.map((response, index) => (
            <div key={index} className="border p-4 mb-4 bg-gray-100 rounded">
              <p><strong>Respondent:</strong> {response.patientName}</p>
              <div>
                {response.answers.map((answer, answerIndex) => {
                  // Find the corresponding question text using the questionId
                  const question = survey.questions.find(q => q._id === answer.questionId);
                  return (
                    <div key={answerIndex} className="mb-2">
                      <p><strong>Question:</strong> {question ? question.questiontext : 'Unknown question'}</p>
                      <p><strong>Answer:</strong> {answer.answer}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnsweredSurvey;
