import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import axios from 'axios';

const questionTypes = [
  { id: 'short-answer', label: 'Short Answer' },
  { id: 'multiple-choice', label: 'Multiple Choice' },
  { id: 'rating', label: 'Rating Scale' },
];

const SurveyBuilder = ({ onSaveSurvey, surveyToEdit }) => {
  const { register, handleSubmit, control, reset, setValue, getValues } = useForm();
  const [questions, setQuestions] = useState([]);
  const [surveyName, setSurveyName] = useState('');
  const [patients, setPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);

  useEffect(() => {
    // Fetch patient data from the API
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:9000/users');
        const patients = response.data.filter(user => user.profession === 'patient');
        const patientOptions = patients.map(patient => ({
          value: patient._id,
          label: patient.fullName || patient.email,
        }));
        setPatients(patientOptions);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();

    if (surveyToEdit) {
      setSurveyName(surveyToEdit.nameofsurvey || ''); // Safeguard against undefined values
      setQuestions(surveyToEdit.questions || []); // Ensure questions is an array

      // Set the form values for each question, but only if the questions array exists
      if (surveyToEdit.questions) {
        surveyToEdit.questions.forEach((q, index) => {
          setValue(`questions[${index}].questiontext`, q.questiontext); // Set the question text
        });
      }

      setSelectedPatients(
        surveyToEdit.assignedPatients?.map(patient => ({
          value: patient,
          label: patient,
        })) || []
      );
    } else {
      resetBuilder();
    }
  }, [surveyToEdit, setValue]);

  const resetBuilder = () => {
    setSurveyName('');
    setQuestions([]);
    setSelectedPatients([]);
    reset();
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === 'question-types' && destination.droppableId === 'survey-area') {
      const questionType = questionTypes[source.index];
      addQuestion(questionType.id);
    }

    if (source.droppableId === 'survey-area' && destination.droppableId === 'survey-area') {
      const reorderedQuestions = Array.from(questions);
      const [movedItem] = reorderedQuestions.splice(source.index, 1);
      reorderedQuestions.splice(destination.index, 0, movedItem);
      setQuestions(reorderedQuestions);
    }
  };

  const addQuestion = (type) => {
    const newQuestion = {
      id: `question-${questions.length + 1}`,
      questiontype: type, // Changed type to questiontype
      questiontext: '', // Ensure questiontext is properly set for each question
      required: false,
      options: type === 'multiple-choice' ? ['Option 1', 'Option 2'] : [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const onSubmit = (data) => {
    const values = getValues(); // Get the form values
    const survey = {
      nameofsurvey: surveyName || '', // Ensure the survey name is provided
      assignedPatients: selectedPatients.map(patient => patient.label), // Save selected patient IDs
      questions: questions.map((q, index) => ({
        ...q,
        questiontext: values.questions[index]?.questiontext || '', // Ensure questiontext is passed correctly
        required: values.questions[index]?.required || false, // Handle required field
        options: q.questiontype === 'multiple-choice' && values.questions[index]?.options
          ? values.questions[index].options.split(',') // Split options for multiple-choice questions
          : [], // Default to an empty array if not a multiple-choice question
      })),
    };

    // Check if questiontext (label) is filled out for all questions
    const missingQuestionText = survey.questions.some((q) => !q.questiontext || q.questiontext.trim() === '');
    if (missingQuestionText) {
      alert('Please fill out question text for all questions.');
      return;
    }

    onSaveSurvey(survey);
    resetBuilder();
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <div className="mb-4">
        <input
          type="text"
          value={surveyName}
          onChange={(e) => setSurveyName(e.target.value)}
          placeholder="Enter Survey Name"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assign Survey to Patients:
        </label>
        <Select
          isMulti
          options={patients}
          value={selectedPatients}
          onChange={setSelectedPatients}
          placeholder="Select patients..."
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {/* Droppable area for question types */}
          <Droppable droppableId="question-types">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="w-1/3 p-4 bg-gray-200 rounded">
                <h2 className="text-lg font-semibold mb-2">Drag or Click to Add Questions</h2>
                {questionTypes.map((type, index) => (
                  <Draggable key={type.id} draggableId={type.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-2 cursor-pointer"
                        onClick={() => addQuestion(type.id)}
                      >
                        {type.label}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Droppable area for the survey questions */}
          <Droppable droppableId="survey-area">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-2/3 p-4 bg-gray-100 rounded"
              >
                <h2 className="text-lg font-semibold mb-2">Survey Area</h2>
                {questions.length === 0 && <p className="text-gray-500">Drag questions here or click buttons to add them to your survey.</p>}
                {questions.map((question, index) => (
                  <Draggable key={question.id} draggableId={question.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-4 p-4 border rounded bg-white shadow-sm"
                      >
                        <input
                          {...register(`questions[${index}].questiontext`, { required: true })}
                          placeholder={`Question ${index + 1}`}
                          className="w-full p-2 border rounded mb-2"
                          defaultValue={question.questiontext}
                        />
                        {question.questiontype === 'short-answer' && (
                          <input type="text" placeholder="Short answer" className="w-full p-2 border rounded" disabled />
                        )}
                        {question.questiontype === 'multiple-choice' && (
                          <input
                            {...register(`questions[${index}].options`)}
                            defaultValue={question.options.join(', ')}
                            placeholder="Enter options (comma separated)"
                            className="w-full p-2 border rounded"
                          />
                        )}
                        {question.questiontype === 'rating' && (
                          <input type="number" placeholder="Rating scale (1-5)" className="w-full p-2 border rounded" disabled />
                        )}
                        <div className="flex items-center mt-2">
                          <label className="mr-2">
                            <input type="checkbox" {...register(`questions[${index}].required`)} /> Required
                          </label>
                          <button
                            type="button"
                            className="text-red-500 ml-auto"
                            onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleSubmit(onSubmit)}>
        Save Survey
      </button>
    </div>
  );
};

export default SurveyBuilder;
