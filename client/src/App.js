import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasksUpdated, setTasksUpdated] = useState(false);

  // Function to refresh the task list
  const refreshTasks = () => {
    setTasksUpdated(!tasksUpdated);
  };

  return (
    <div className="container">
      <h1>Task Manager App</h1>
      <TaskForm refreshTasks={refreshTasks} />
      <TaskList tasksUpdated={tasksUpdated} />
    </div>
  );
}

export default App;

