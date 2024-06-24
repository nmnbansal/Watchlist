import axios from "axios";

const API_URL = "https://json-server-7kfj.onrender.com";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllMovies = async (userId) => {
  try {
    const response = await axiosInstance.get(`/movies`, {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const addNewMovie = async (movie, userId) => {
  try {
    const response = await axiosInstance.post("/movies", { ...movie, userId });
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    return null;
  }
};

export const editExistingMovie = async (movie, userId) => {
  try {
    const response = await axiosInstance.put(`/movies/${movie.id}`, { ...movie, userId });
    return response.data;
  } catch (error) {
    console.error("Error editing movie:", error);
    return null;
  }
};

export const deleteMovieById = async (movieId, userId) => {
  try {
    const response = await axiosInstance.delete(`/movies/${movieId}`, {
      data: { userId }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    return null;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};
