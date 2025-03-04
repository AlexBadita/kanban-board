import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

export const getUserTasks = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/tasks`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching tasks");
  }
};

export const createTaskForUser = async (userId, taskData) => {
  try {
    console.log(taskData);
    const response = await axios.post(
      `${API_URL}/users/${userId}/tasks`,
      taskData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating task");
  }
};

export const updateTaskForUser = async (userId, taskId, taskData) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/${userId}/tasks/${taskId}`,
      taskData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating task");
  }
};

export const deleteTaskForUser = async (userId, taskId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/users/${userId}/tasks/${taskId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting task");
  }
};

export const moveTaskForUser = async (userId, taskId, newStatus) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/${userId}/tasks/${taskId}/move`,
      { newStatus }
    );
    return response.data;
  } catch (error) {
    console.error("Error moving task:", error);
    throw error;
  }
};
