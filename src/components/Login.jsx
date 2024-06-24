import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import Layout from './Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/users?email=${email}`);
      const user = response.data[0];
      if (user && await bcrypt.compare(password, user.password)) {
        localStorage.setItem('token', user.id);
        navigate('/home');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Layout>
      <Box p={6} mt='10%' rounded="md" shadow="md" color="white" 
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(1px)">
        <Text fontSize="2xl" mb={5}>Login</Text>
        <form onSubmit={handleLogin}>
          <VStack spacing={3}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </FormControl>
            {error && <Text color="red.500">{error}</Text>}
            <Button type="submit" colorScheme="teal">Login</Button>
          </VStack>
        </form>
        <Button mt={3} onClick={() => navigate('/signup')}>Signup</Button>
      </Box>
    </Layout>
  );
};

export default Login;
