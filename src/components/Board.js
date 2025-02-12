import { useState, useCallback, useEffect } from "react";
import Column from "./Column";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import { Plus } from "lucide-react";
import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}`;

function Board() {
  console.log(API_BASE_URL);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const [columns, setColumns] = useState(["To Do", "In Progress", "Done"]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
    axios
      .post(API_BASE_URL, {
        title: task.title,
        description: task.description,
        status: "To Do",
      })
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  const deleteTask = useCallback((taskId) => {
    axios
      .delete(`${API_BASE_URL}/${taskId}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
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
    console.log(editedTask);
    axios
      .put(`${API_BASE_URL}/${editedTask.id}`, editedTask)
      .then((response) => {
        console.log(response.data);
        setTasks((prevTasks) =>
          prevTasks.map((task) => {
            console.log(editedTask);
            return task.id == editedTask.id ? response.data : task;
          })
        );
        closeModal();
      })
      .catch((error) => {
        console.error("Error editing task:", error);
      });
  };

  const moveTask = (taskId, targetColumn) => {
    console.log("move " + taskId + " to " + targetColumn);
    const taskToMove = tasks.find((task) => task.id == taskId);
    console.log(taskToMove);

    if (!taskToMove) return;
    console.log(taskToMove);

    const updatedTask = { ...taskToMove, status: columns[targetColumn] };
    console.log(updatedTask);

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id == taskId ? updatedTask : task))
    );

    axios
      .put(`${API_BASE_URL}/${taskId}`, updatedTask)
      .then((response) => {
        // Ensure the UI reflects the server's response
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id == taskId ? response.data : task))
        );
      })
      .catch((error) => {
        console.error("Error updating task status:", error);

        // Roll back the optimistic update if the API call fails
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id == taskId ? taskToMove : task))
        );
      });
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

export default Board;
