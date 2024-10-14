import React, { useState } from 'react';
import initialData from '../utils/inital-data';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Profile = () => {



    const [state, setState] = useState(initialData);

    const fullName = localStorage.getItem('fullName');
    const email = localStorage.getItem('email');
    const profession = localStorage.getItem('profession');


    const handleDragStart = (result) => {
        document.body.style.color= 'orange'
        document.body.style.transition = 'background-color 0.2s ease'
    }
    const handleDragUpdate = (result) => {

    }

    
    const handleDragEnd = (result) => {
        document.body.style.color= 'inherit'

        const { destination, source, draggableId } = result;
        
        // If there's no destination, exit the function
        if (!destination) {
            return;
        }
    
        // If the item is dropped in the same position, exit the function
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
    
        // Get the column where the drag started
        const column = state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        
        // Remove the task from the source index
        newTaskIds.splice(source.index, 1);
        
        // Insert the task at the destination index
        newTaskIds.splice(destination.index, 0, draggableId);
    
        // Create a new column object with updated taskIds
        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };
    
        // Update the entire state with the modified columns object
        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newColumn.id]: newColumn,  // Corrected columns key here
            },
        };
    
        // Update the state
        setState(newState);
    };
    

    return (
        <div>

        <div className="p-6 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Full Name:</h2>
        <p className="text-lg">{fullName || 'N/A'}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Email:</h2>
        <p className="text-lg">{email || 'N/A'}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Profession:</h2>
        <p className="text-lg">{profession || 'N/A'}</p>
      </div>
        </div>
        
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragUpdate={handleDragUpdate}>
            <div className='border-2 border-black p-2 m-2'>
                {state.columnOrder.map((columnId) => {
                    const column = state.columns[columnId];
                    const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

                    return (
                        <div key={column.id}>
                            <h2>{column.title}</h2>
                            <Droppable droppableId={column.id} key={column.id}>
                                {(provided,snapshot) => (
                                    <ul
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        isDraggingOver={snapshot.isDraggingOver}
                                        className={`p-2 ${snapshot.isDraggingOver ? 'bg-blue-500' : 'bg-white'}`}
                                    >
                                        {tasks.map((task, index) => (
                                            <Draggable
                                                key={task.id}
                                                draggableId={task.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`border border-black p-2 m-1 ${snapshot.isDragging ? 'bg-green-500' : 'bg-white'}`}
                                                        isDragging= {snapshot.isDragging}
                                                    >
                                                        {task.content}
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </div>
                    );
                })}
            </div>
        </DragDropContext>
        </div>
    );
};

export default Profile;






/*
1. React beautiful DND is made of 3 different components.
    - The first is DragDropContext component,The component We will wrap this around the context where we want to enable the drag and drop.
    - Droppable- whill create a region where we can drop into.
    - Draggable - are the componets that are draggable and can be dropped in droppable.    
DragDropContext has 3 callbacks
- onDragStart calls when drag starts.
- onDragUpdate calls when something changes during the drag like the position.
- OnDragEnd calls at the end of the drag. required callback
   
Droppable has one required prop that is droppableId, It should be Unique.
Droppable utilises a render prop pattern expects child to be a function. that returns a react component.
because react dnd might not create new doms
provided has droppableProps
innerRef function to supply dom node of component to react-dnd returns dom node of component
placeholder will increase the place when your dropping a draggable


Draggable
draggableId
and index
provided has draggableProps, dragHandleProps innerref


result will have
1. draggableId, type, reason and the important are source and destination.
destination can be null if dropped out of the table.

handleDragEnd -> code will handle the drag and drop saved state. 
so that drag object in the new position is saved.

<Draggable /> and <Droppable /> components provide snapshot objects to their child functions. These snapshot objects can be used to create beautiful visual queues for users while a drag is occurring.
draggable snapshot has 2 properties, isDraggaing true or false and draggingover id of the
droppbale snapashot has 2 properties, isDraggaingOver true or false and draggingoverwith id of the
isDropDisabled is true you cant drop it
direction to hotizontal..reordering

https://egghead.io/courses/beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd
*/