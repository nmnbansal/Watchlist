// movieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMovies, deleteMovieById, addNewMovie, editExistingMovie } from "../../api";

const initialState = {
  watchlist: [],
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (userId) => {
  const moviesData = await getAllMovies(userId);
  return moviesData;
});

export const removeMovie = createAsyncThunk("movies/removeMovie", async ({ userId, movieId }) => {
  await deleteMovieById(movieId, userId);
  return movieId;
});

export const addEditMovie = createAsyncThunk("movies/addEditMovie", async ({ userId, movie }) => {
  if (movie.id) {
    const updatedMovie = await editExistingMovie(movie, userId);
    return updatedMovie;
  } else {
    const newMovie = await addNewMovie(movie, userId);
    return newMovie;
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.watchlist = action.payload;
      })
      .addCase(removeMovie.fulfilled, (state, action) => {
        state.watchlist = state.watchlist.filter((movie) => movie.id !== action.payload);
      })
      .addCase(addEditMovie.fulfilled, (state, action) => {
        const { id } = action.payload;
        const existingMovieIndex = state.watchlist.findIndex((movie) => movie.id === id);
        if (existingMovieIndex !== -1) {
          state.watchlist[existingMovieIndex] = action.payload;
        } else {
          state.watchlist.push(action.payload);
        }
      });
  },
});

export default movieSlice.reducer;
