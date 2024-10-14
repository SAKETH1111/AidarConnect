import React, { useState, useEffect } from 'react';
import SurveyBuilder from './SurveyBuilder';
import axios from 'axios';

const Survey = () => {
  const [savedSurveys, setSavedSurveys] = useState([]);
  const [editingSurvey, setEditingSurvey] = useState(null);

  // Fetch surveys from the backend when the component loads
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://localhost:9000/surveys');
        setSavedSurveys(response.data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };

    fetchSurveys();
  }, []);

  const handleSaveSurvey = async (survey) => {
    try {
      let response;
      const doctor_name = localStorage.getItem('fullName');
  
      if (editingSurvey !== null) {
        // Edit an existing survey
        const updatedSurvey = savedSurveys[editingSurvey];
        updatedSurvey.nameofsurvey = survey.nameofsurvey;
        updatedSurvey.questions = survey.questions;
        updatedSurvey.assignedPatients = survey.assignedPatients;
        response = await axios.patch(`http://localhost:9000/surveys/${updatedSurvey._id}`, updatedSurvey);
      } else {
        // Save a new survey (ensure createdBy is passed)
        response = await axios.post('http://localhost:9000/surveys', { ...survey, createdBy: doctor_name });
      }
  
      if (response.status === 201 || response.status === 200) {
        // Check if we are editing or creating a new survey
        if (editingSurvey !== null) {
          const updatedSurveys = savedSurveys.map((survey, index) =>
            index === editingSurvey ? response.data : survey
          );
          setSavedSurveys(updatedSurveys);
        } else {
          // Add the new survey directly to the list
          setSavedSurveys(prevSurveys => [...prevSurveys, response.data.survey]);
        }
  
        setEditingSurvey(null); // Reset after saving
      }
    } catch (error) {
      console.error('Error saving survey:', error);
    }
  };
  

  const handleEditSurvey = (index) => {
    setEditingSurvey(index);
  };

  const handleDeleteSurvey = async (id, index) => {
    try {
      await axios.delete(`http://localhost:9000/surveys/${id}`);
      // Remove the deleted survey from the list
      setSavedSurveys(savedSurveys.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting survey:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow p-6">
        <h1 className="text-3xl mb-4">Create or Edit a Survey</h1>
        <SurveyBuilder
          onSaveSurvey={handleSaveSurvey}
          surveyToEdit={editingSurvey !== null ? savedSurveys[editingSurvey] : null}
        />
        <div className="mt-6">
          <h2 className="text-2xl mb-4">Saved Surveys</h2>
          {savedSurveys.length === 0 && <p>No surveys saved yet.</p>}
          <ul>
            {savedSurveys.map((survey, index) => (
              <li
                key={index}
                className="bg-white p-4 mb-2 rounded shadow flex items-center"
              >
                <div className="flex-1 cursor-pointer" onClick={() => handleEditSurvey(index)}>
                  {survey.nameofsurvey} {/* Changed name to nameofsurvey */}
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleEditSurvey(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteSurvey(survey._id, index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Survey;
