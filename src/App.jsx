// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from "@chakra-ui/react";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import BG from './assets/Bg.jpg';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
    <Box
        minH="100vh"
        backgroundImage={`linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${BG})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  </Box>
    </>
  );
};

export default App;
