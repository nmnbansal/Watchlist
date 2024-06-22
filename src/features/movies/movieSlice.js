import { createSlice } from "@reduxjs/toolkit";
import { getAllMovies, deleteMovieById } from "../../api";

const initialState = {
  watchlist: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.watchlist = action.payload;
    },
    addMovie(state, action) {
      state.watchlist.push(action.payload);
    },
    editMovie(state, action) {
      const index = state.watchlist.findIndex((movie) => movie.id === action.payload.id);
      if (index !== -1) {
        state.watchlist[index] = action.payload;
      }
    },
    deleteMovie(state, action) {
      state.watchlist = state.watchlist.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { setMovies, addMovie, editMovie, deleteMovie } = movieSlice.actions;

// Async action to fetch movies
export const fetchMovies = () => async (dispatch) => {
  try {
    const moviesData = await getAllMovies();
    dispatch(setMovies(moviesData));
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// Async action to delete a movie
export const removeMovie = (movieId) => async (dispatch) => {
  try {
    await deleteMovieById(movieId);
    dispatch(deleteMovie(movieId));
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
};

export default movieSlice.reducer;
