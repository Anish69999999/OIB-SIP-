// TaskList.js
import React, { useState } from 'react';

const TaskList = ({ tasks, onTaskAction, listType }) => {
  const [editTask, setEditTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const handleEdit = (task) => {
    setEditTask(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = (taskId) => {
    onTaskAction(taskId, 'edit', { title: editedTitle, description: editedDescription });
    setEditTask(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  const handleCancelEdit = () => {
    setEditTask(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  return (
    <div className={`${listType}-tasks`}>
      <h2>{listType === 'pending' ? 'Pending Tasks' : 'Completed Tasks'}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <strong>Title:</strong>
              {editTask === task.id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <span>{task.title}</span>
              )}
            </div>
            {task.description && (
              <div>
                <strong>Description:</strong>
                {editTask === task.id ? (
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  ></textarea>
                ) : (
                  <span>{task.description}</span>
                )}
              </div>
            )}
            {listType === 'pending' && (
              <>
                {editTask === task.id ? (
                  <>
                    <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    <button onClick={() => onTaskAction(task.id, 'complete')}>Complete</button>
                    <button onClick={() => onTaskAction(task.id, 'delete')}>Delete</button>
                  </>
                )}
              </>
            )}
            {listType === 'completed' && (
              <button onClick={() => onTaskAction(task.id, 'delete')}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
