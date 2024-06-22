// Home.js

import React, { useState, useEffect } from "react";
import { Box, Button, Text, Grid, GridItem, Stack, Flex } from "@chakra-ui/react";
import MovieFormModal from "./MovieFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, removeMovie, addMovie } from "../features/movies/movieSlice";
import { FaFilm } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.watchlist);
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(null);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const openAddMovieModal = () => {
    setCurrentMovieId(null);
    setIsMovieFormOpen(true);
  };

  const openEditMovieModal = (id) => {
    setCurrentMovieId(id);
    setIsMovieFormOpen(true);
  };

  const openDeleteModal = (id) => {
    setCurrentMovieId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await dispatch(removeMovie(movieId));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleAddEditMovie = (updatedMovie) => {
    // Prepend the new movie to the movies array
    dispatch(addMovie(updatedMovie));

    // Close modal after adding/editing
    setIsMovieFormOpen(false);
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" mb={12} alignItems="center">
        <Flex alignItems="center">
          <FaFilm color="white" size="1.5em" />
          <Text fontSize="2xl" fontWeight={700} color="white" ml={2}>
            Watchlist
          </Text>
        </Flex>
        <Button
          bgGradient="linear(to-r, teal.400, blue.400)"
          _hover={{ bgGradient: "linear(to-r, teal.500, blue.500)" }}
          onClick={openAddMovieModal}
        >
          Add Movie
        </Button>
      </Flex>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {movies.map((movie) => (
          <GridItem key={movie.id} height="100%">
            <Box
              height="100%"
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              bg="rgba(255, 255, 255, 0.1)"
              backdropFilter="blur(1px)"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Stack spacing={3}>
                <Text fontSize="xl" fontWeight="bold" color="white">
                  {movie.title}
                </Text>
                <Text fontSize="sm" color="white">
                  {movie.description}
                </Text>
                <Flex justify="space-between" color="white">
                  <Text>
                    <strong>Release Year:</strong> {movie.releaseYear}
                  </Text>
                  <Text>
                    <strong>Genre:</strong> {movie.genre}
                  </Text>
                </Flex>
                <Flex justify="space-between" color="white">
                  <Text>
                    <strong>Watched:</strong> {movie.watched ? "Yes" : "No"}
                  </Text>
                  <Text>
                    <strong>Rating:</strong>{" "}
                    <span role="img" aria-label="rating">
                      {"★".repeat(movie.rating)}
                    </span>
                  </Text>
                </Flex>
                <Text fontSize="sm" color="white" mb={3}>
                  <strong>Review:</strong> {movie.review}
                </Text>
              </Stack>
              <Flex justify="space-between">
                <Button
                  bgGradient="linear(to-r, blue.400, purple.400)"
                  _hover={{ bgGradient: "linear(to-r, blue.500, purple.500)" }}
                  onClick={() => openEditMovieModal(movie.id)}
                >
                  Edit
                </Button>
                <Button
                  bgGradient="linear(to-r, red.400, pink.400)"
                  _hover={{ bgGradient: "linear(to-r, red.500, pink.500)" }}
                  onClick={() => openDeleteModal(movie.id)}
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          </GridItem>
        )).reverse()} {/* Reverse the map to display the latest movie first */}
      </Grid>
      <MovieFormModal
        isOpen={isMovieFormOpen}
        onClose={() => setIsMovieFormOpen(false)}
        movieId={currentMovieId}
        onAddEditMovie={handleAddEditMovie} // Pass callback to handle add/edit
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        movieId={currentMovieId}
        onDelete={handleDeleteMovie}
      />
    </Box>
  );
};

export default Home;
