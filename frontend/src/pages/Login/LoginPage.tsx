import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, Flex, HStack, Spacer, useColorModeValue } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
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
      navigate('/dashboard', { state: { email } });
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
    <Box minHeight="100vh" width="100vw" bg="#F9FAFB">
      <Flex as="nav" width="100%" p={6} bg="white" boxShadow="lg" position="fixed" top="0" zIndex="10" alignItems="center">
        <Box fontWeight="bold" fontSize="2xl" cursor="pointer" onClick={() => navigate("/")} color="teal.600" _hover={{ color: "teal.800" }}>
          AccredMed
        </Box>
        <Spacer />
        <HStack spacing={10}>
          <Button variant="link" fontSize="xl" color="teal.600" _hover={{ textDecoration: "underline", color: "teal.800" }} onClick={() => navigate("/about-us")}>
            About Us
          </Button>
          <Button variant="link" fontSize="xl" color="teal.600" _hover={{ textDecoration: "underline", color: "teal.800" }} onClick={() => navigate("/explore-tracks")}>
            Explore Tracks
          </Button>
          <Button variant="link" fontSize="xl" color="teal.600" _hover={{ textDecoration: "underline", color: "teal.800" }} onClick={() => navigate("/coming-soon")}>
            Coming Soon
          </Button>
        </HStack>
      </Flex>

      <Flex justifyContent="center" alignItems="center" height="100vh" pt="80px">
        <VStack spacing={8} width="100%" maxWidth="md" p={8} bg="white" borderRadius="lg" boxShadow="lg">
          <Heading color="teal.600">Login</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} bg={useColorModeValue('gray.100', 'gray.700')}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} bg={useColorModeValue('gray.100', 'gray.700')}/>
                {passwordError && <Text color="red.500">{passwordError}</Text>}
              </FormControl>
              <Button type="submit" colorScheme="teal">
                Login
              </Button>
            </VStack>
          </form>
          <Text>
            Don't have an account?{' '}
            <Link color="teal.300" onClick={() => navigate('/signup')}>
              Sign Up
            </Link>
          </Text>
          <Button colorScheme="teal" variant="outline" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Login;
