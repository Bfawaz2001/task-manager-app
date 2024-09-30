import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

const TaskList = ({ tasksUpdated }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tasksUpdated]);

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      try {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const toggleTaskCompletion = async (task) => {
    try {
      await axios.put(`/api/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleModalSave = async () => {
    try {
      await axios.put(`/api/tasks/${currentTask._id}`, {
        title: currentTask.title,
        description: currentTask.description,
      });
      fetchTasks();
      setShowModal(false);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return filter === 'completed' ? task.completed : !task.completed;
  });

  return (
    <div>
      <h2 className="mb-4">Task List</h2>

      {/* Task Counter */}
      <h4>
        {filteredTasks.length} {filter === 'all' ? 'Tasks' : filter === 'completed' ? 'Completed Tasks' : 'Incomplete Tasks'}
      </h4>

      {/* Task Filter */}
      <div className="mb-3">
        <label>Filter Tasks: </label>
        <select onChange={(e) => setFilter(e.target.value)} className="ml-2">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      {/* No Tasks Message */}
      {tasks.length === 0 ? (
        <p>No tasks available. Add a new task to get started!</p>
      ) : (
        <div className="row">
          {filteredTasks.map((task) => (
            <div className="col-md-4 mb-4" key={task._id}>
              <div className={`card ${task.completed ? 'border-success' : 'border-primary'} shadow-sm`}>
                <div className="card-body">
                  <h5 className={`card-title ${task.completed ? 'text-success' : ''}`}>
                    {task.title}
                    <span className={`badge ml-2 ${task.completed ? 'badge-success' : 'badge-warning'}`}>
                      {task.completed ? 'Completed' : 'Incomplete'}
                    </span>
                  </h5>
                  <p className="card-text">{task.description}</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task)}
                          className="mr-2"
                        />
                        Mark as {task.completed ? 'Incomplete' : 'Complete'}
                      </label>
                    </div>
                    <div>
                      <button
                        className="btn btn-danger btn-sm mr-2"
                        onClick={() => deleteTask(task._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleEditClick(task)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-3"
            value={currentTask.title}
            onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
          />
          <textarea
            className="form-control"
            value={currentTask.description}
            onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;

