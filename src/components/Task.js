import React from "react";
import { Trash2, Edit } from "lucide-react";

function Task({ task, onDelete, onEdit }) {
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
      className="bg-white border border-gray-200 rounded-md p-3 mb-2 shadow-sm"
    >
      <div className="flex justify-between items-start mb-2 flex-col">
        <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <div className="flex space-x-2 self-end">
          <button
            onClick={() => onEdit(task.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;
