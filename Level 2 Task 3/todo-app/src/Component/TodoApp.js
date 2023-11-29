// TodoApp.js
import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './TodoApp.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    setTasks(storedTasks);
    setCompletedTasks(storedCompletedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks are updated
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // Save completed tasks to local storage whenever completed tasks are updated
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const addTask = ({ title, description }) => {
    const newTask = {
      id: new Date().getTime(),
      title,
      description,
      createdAt: new Date().toLocaleString(),
    };

    setTasks([...tasks, newTask]);
  };

  const handleTaskAction = (taskId, action, updatedTask) => {
    if (action === 'complete') {
      const completedTask = tasks.find((t) => t.id === taskId);
      setCompletedTasks([...completedTasks, completedTask]);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } else if (action === 'delete') {
      setTasks(tasks.filter((t) => t.id !== taskId));
      setCompletedTasks(completedTasks.filter((t) => t.id !== taskId));
    } else if (action === 'edit') {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? { ...t, ...updatedTask } : t))
      );
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onTaskAction={handleTaskAction} listType="pending" />
      <TaskList tasks={completedTasks} onTaskAction={handleTaskAction} listType="completed" />
    </div>
  );
};

export default TodoApp;
