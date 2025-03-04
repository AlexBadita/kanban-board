import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

export const registerUser = async (userData) => {
  console.log(API_URL);
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error registering user");
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error logging in");
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching user data"
    );
  }
};
