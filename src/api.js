import axios from "axios";

const API_URL = "http://localhost:3000"; // Adjust as per your JSON Server port

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/movies");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const addNewMovie = async (movie) => {
  try {
    const response = await axiosInstance.post("/movies", movie);
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    return null;
  }
};

export const editExistingMovie = async (movie) => {
  try {
    const response = await axiosInstance.put(`/movies/${movie.id}`, movie);
    return response.data;
  } catch (error) {
    console.error("Error editing movie:", error);
    return null;
  }
};

export const deleteMovieById = async (movieId) => {
  try {
    const response = await axiosInstance.delete(`/movies/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    return null;
  }
};
