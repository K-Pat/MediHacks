// src/components/Login.tsx
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../../assets/background.css';
import { auth } from '../../firebase'
import { FirebaseError } from 'firebase/app';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      navigate('/onboarding'); // Change this to your desired route
    } catch (err) {
      const error = err as FirebaseError;
      switch (error.code) {
        case 'auth/missing-email':
          setPasswordError('Missing email');
          break;

        case 'auth/invalid-email':
          setPasswordError('Invalid email');
          break;

        case 'auth/missing-password':
          setPasswordError('Missing password');
          break;

        case 'auth/user-not-found':
          setPasswordError('No user found with this email');
          break;

        case 'auth/wrong-password':
          setPasswordError('Incorrect password');
          break;

        case 'auth/invalid-credential':
          setPasswordError('Incorrect email and/or password');
          break;

        default:
          setPasswordError('Login failed: ' + error.message);
      }
      setTimeout(() => {
        setPasswordError('');
      }, 5000);
    }
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
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {passwordError && <Text color="red.500">{passwordError}</Text>}
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
