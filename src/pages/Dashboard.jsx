import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import Column from "../components/Column";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import {
  getUserTasks,
  createTaskForUser,
  updateTaskForUser,
  deleteTaskForUser,
  moveTaskForUser,
} from "../api/apiService";

function Dashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id; // Assuming the API returns `id`

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [columns] = useState(["To Do", "In Progress", "Done"]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getUserTasks(userId)
      .then(setTasks)
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [userId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAdding(false);
  };

  const onAddTask = () => {
    setIsAdding(true);
    openModal();
  };

  const saveTask = (task) => {
    createTaskForUser(userId, { ...task, status: "To Do" })
      .then((newTask) => setTasks((prevTasks) => [...prevTasks, newTask]))
      .catch((error) => console.error(error));
  };

  const deleteTask = useCallback((taskId) => {
    deleteTaskForUser(userId, taskId)
      .then(() =>
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
      )
      .catch((error) => console.error(error));
  }, []);

  const editTask = useCallback(
    (taskId) => {
      const taskToEdit = tasks.find((task) => task.id == taskId);
      if (taskToEdit) {
        setSelectedTask(taskToEdit);
        openModal();
      }
    },
    [tasks]
  );

  const saveEditedTask = (editedTask) => {
    updateTaskForUser(userId, editedTask.id, editedTask)
      .then((updatedTask) =>
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editedTask.id ? updatedTask : task
          )
        )
      )
      .catch((error) => console.error(error));
    closeModal();
  };

  const moveTask = (taskId, targetColumn) => {
    const taskToMove = tasks.find((task) => task.id === taskId);
    if (!taskToMove) return;

    moveTaskForUser(userId, taskId, columns[targetColumn])
      .then((updatedTask) =>
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
        )
      )
      .catch((error) => console.error(error));
  };

  return (
    <div className="w-full max-w-6xl p-4">
      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent rounded-full text-white"></div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">To do</h1>
      <div className="flex justify-between items-center gap-4 mb-8">
        <SearchBar onSearch={setSearchTerm} />
        <button
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center"
          onClick={onAddTask}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {columns.map((column, index) => (
          <Column
            index={index}
            key={index}
            title={column}
            tasks={tasks.filter((task) => task.status === column)}
            searchTerm={searchTerm}
            onDelete={deleteTask}
            onEdit={editTask}
            moveTask={moveTask}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={isAdding ? saveTask : saveEditedTask}
        task={selectedTask}
        isAdding={isAdding}
      />
    </div>
  );
}

export default Dashboard;
