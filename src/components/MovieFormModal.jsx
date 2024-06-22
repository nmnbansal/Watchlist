// MovieFormModal.js

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Switch,
  Box,
  Icon,
  Flex,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, editMovie } from "../features/movies/movieSlice";
import { FaStar } from "react-icons/fa";
import { editExistingMovie, addNewMovie } from "../api";

const initialMovieState = {
  title: "",
  description: "",
  releaseYear: "",
  genre: "",
  watched: false,
  rating: 0,
  review: "",
};

const MovieFormModal = ({ isOpen, onClose, movieId }) => {
  const dispatch = useDispatch();
  const movieToEdit = useSelector((state) =>
    state.movies.watchlist.find((movie) => movie.id === movieId)
  );

  const [movie, setMovie] = useState(initialMovieState);
  const [ratingError, setRatingError] = useState(false); // State to track rating validation

  useEffect(() => {
    if (movieId && movieToEdit) {
      setMovie(movieToEdit);
    } else {
      setMovie(initialMovieState);
    }
  }, [movieId, movieToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const handleWatchedChange = () => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      watched: !prevMovie.watched,
    }));
  };

  const handleRatingChange = (rating) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      rating,
    }));
    // Clear rating error when a valid rating is selected
    if (ratingError && rating > 0) {
      setRatingError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (movie.rating === 0) {
      setRatingError(true);
      return; // Exit if rating is not selected
    }

    if (movieId) {
      const updatedMovie = await editExistingMovie(movie);
      if (updatedMovie) {
        dispatch(editMovie(updatedMovie));
        onClose();
      }
    } else {
      const newMovie = await addNewMovie(movie);
      if (newMovie) {
        dispatch(addMovie(newMovie));
        onClose();
        setMovie(initialMovieState); // Clear form after adding a new movie
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="600px">
        <ModalHeader>{movieId ? "Edit Movie" : "Add Movie"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={3} isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={movie.title}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mb={3} isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={movie.description}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mb={3} isRequired>
              <FormLabel>Release Year</FormLabel>
              <Input
                name="releaseYear"
                type="number"
                value={movie.releaseYear}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl mb={3} isRequired>
              <FormLabel>Genre</FormLabel>
              <Input
                name="genre"
                value={movie.genre}
                onChange={handleChange}
                required
              />
            </FormControl>
            <Flex mb={3} alignItems="center">
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Watched?</FormLabel>
                <Switch
                  id="movie-watched"
                  isChecked={movie.watched}
                  onChange={handleWatchedChange}
                />
              </FormControl>
              <FormControl ml={4} isRequired>
                <FormLabel>Rating</FormLabel>
                <Box>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      as={FaStar}
                      key={star}
                      color={
                        star <= movie.rating ? "teal.500" : "gray.300"
                      }
                      cursor="pointer"
                      onClick={() => handleRatingChange(star)}
                    />
                  ))}
                </Box>
                {ratingError && (
                  <FormErrorMessage>Please select a rating</FormErrorMessage>
                )}
              </FormControl>
            </Flex>
            <FormControl mb={3} isRequired>
              <FormLabel>Review</FormLabel>
              <Textarea
                name="review"
                value={movie.review}
                onChange={handleChange}
                required
              />
            </FormControl>
            <ModalFooter display="flex" justifyContent="center">
              <Button type="submit" colorScheme="teal" mr={3}>
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MovieFormModal;
