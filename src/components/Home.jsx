import React, { useState, useEffect } from "react";
import { Box, Button, Text, Grid, GridItem, Stack, Flex, Skeleton } from "@chakra-ui/react";
import MovieFormModal from "./MovieFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, removeMovie, addEditMovie } from "../features/movies/movieSlice";
import { getUserDetails } from "../api";
import { FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies.watchlist);
  const userId = localStorage.getItem('token');
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true); // State to track loading state

  useEffect(() => {
    if (userId) {
      dispatch(fetchMovies(userId))
        .then(() => setLoading(false)) // Set loading to false when movies are fetched
        .catch(() => setLoading(false)); // Handle error case
      fetchUserDetails(userId);
    } else {
      navigate('/login');
    }
  }, [dispatch, userId, navigate]);

  const fetchUserDetails = async (userId) => {
    const userDetails = await getUserDetails(userId);
    if (userDetails) {
      setUserName(userDetails.name);
    }
  };

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
      await dispatch(removeMovie({ userId, movieId }));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleAddEditMovie = async (movie) => {
    try {
      await dispatch(addEditMovie({ userId, movie }));
      setIsMovieFormOpen(false);
    } catch (error) {
      console.error("Error adding/editing movie:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Layout>
      <Flex justifyContent="space-between" mb={12} alignItems="center" flexWrap="wrap">
        <Flex alignItems="center" mb={[2, 0]}>
          <FaFilm color="white" size="1.5em" />
          <Text fontSize="2xl" fontWeight={700} color="white" ml={2}>
            Watchlist
          </Text>
        </Flex>
        <Flex alignItems="center" ml={[0, "auto"]} mt={[2, 0]}>
          <Text fontSize="lg" fontWeight={700} color="white" mr={4} mb={[2, 0]}>
            Hi, {userName}
          </Text>
          <Button
            bgGradient="linear(to-r, teal.400, blue.400)"
            _hover={{ bgGradient: "linear(to-r, teal.500, blue.500)" }}
            onClick={openAddMovieModal}
            mr={4}
            mb={[0, 0]}
          >
            Add Movie
          </Button>
          <Button
            bgGradient="linear(to-r, red.400, pink.400)"
            _hover={{ bgGradient: "linear(to-r, red.500, pink.500)" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
      {loading ? (
        <Grid templateColumns={{ base: "repeat(auto-fill, minmax(100%, 1fr))", md: "repeat(auto-fill, minmax(300px, 1fr))" }} gap={6}>
          {[...Array(6)].map((_, index) => (
            <GridItem key={index} height="100%">
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
                  <Skeleton height="20px" width="80%" />
                  <Skeleton height="40px" />
                  <Flex justify="space-between" color="white">
                    <Skeleton height="20px" width="40%" />
                    <Skeleton height="20px" width="30%" />
                  </Flex>
                  <Flex justify="space-between" color="white">
                    <Skeleton height="20px" width="40%" />
                    <Skeleton height="20px" width="30%" />
                  </Flex>
                  <Skeleton height="20px" width="100%" />
                </Stack>
                <Flex justify="space-between">
                  <Skeleton height="30px" width="45%" />
                  <Skeleton height="30px" width="45%" />
                </Flex>
              </Box>
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Grid templateColumns={{ base: "repeat(auto-fill, minmax(100%, 1fr))", md: "repeat(auto-fill, minmax(300px, 1fr))" }} gap={6}>
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
          ))}
        </Grid>
      )}
      {isMovieFormOpen && (
        <MovieFormModal
          isOpen={isMovieFormOpen}
          onClose={() => setIsMovieFormOpen(false)}
          onSubmit={handleAddEditMovie}
          movieId={currentMovieId}
          userId={userId}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteMovie}
          movieId={currentMovieId}
        />
      )}
    </Layout>
  );
};

export default Home;
