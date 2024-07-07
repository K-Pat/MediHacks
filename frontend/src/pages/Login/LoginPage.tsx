// src/components/Login.tsx
import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../../assets/background.css'

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login form submission logic here
  };

  return (
    <Box
      className="background"
      color="black"
      minHeight="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <VStack spacing={8} width="100%" maxWidth="md">
        <Heading>Login</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button type="submit" colorScheme="red">
              Login
            </Button>
          </VStack>
        </form>
        <Text>
          Don't have an account?{' '}
          <Link color="red.300" onClick={() => navigate('/signup')}>
            Sign Up
          </Link>
        </Text>
        <Button colorScheme="red" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;