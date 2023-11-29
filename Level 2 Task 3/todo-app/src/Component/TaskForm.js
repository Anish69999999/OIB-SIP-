// TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    if (title.trim() !== '') {
      onAddTask({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;
