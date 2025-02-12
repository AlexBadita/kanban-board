import React from "react";
import Task from "./Task";

function Column({
  index,
  title,
  tasks,
  searchTerm,
  onDelete,
  onEdit,
  moveTask,
}) {
  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    moveTask(taskId, index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {filteredTasks.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default Column;
