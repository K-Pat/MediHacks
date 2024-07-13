import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, Flex, HStack, Spacer, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { FirebaseError } from 'firebase/app';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      setTimeout(() => {
        setPasswordError('');
      }, 5000);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setTimeout(() => {
        setPasswordError('');
      }, 5000);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User credential:', userCredential);

      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        email,
      });
      console.log('Document successfully written!');

      navigate('/login');
    } catch (err) {
      const error = err as FirebaseError;
      console.error('Error during sign-up:', error);
      if (error.code === 'auth/email-already-in-use') {
        setPasswordError('This email is already in use. Please use a different email');
      } else if (error.code === 'auth/weak-password') {
        setPasswordError('Password must be longer than 6 characters. Please try a different password');
      } else if (error.code === 'permission-denied') {
        setPasswordError('You do not have permission to perform this action. Please check your Firestore rules.');
      } else {
        setPasswordError('Failed to create account. Please try again later');
      }
      setTimeout(() => {
        setPasswordError('');
      }, 5000);
      navigate('/login'); // Navigate to login page even if there are errors
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
          <Heading color="teal.600">Sign Up</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} bg={useColorModeValue('gray.100', 'gray.700')} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} bg={useColorModeValue('gray.100', 'gray.700')} />
                {password.length > 0 && password.length < 6 && (
                  <Text mt={2} color="red.500">
                    Password must be at least 6 characters long
                  </Text>
                )}
                {password.length >= 6 && (
                  <Text mt={2} color="green.500">
                    Password is valid
                  </Text>
                )}
              </FormControl>
              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} bg={useColorModeValue('gray.100', 'gray.700')}/>
                {passwordError && <Text color="red.500">{passwordError}</Text>}
              </FormControl>
              <Button type="submit" colorScheme="teal">
                Sign Up
              </Button>
            </VStack>
          </form>
          <Text>
            Already have an account?{' '}
            <Link color="teal.300" onClick={() => navigate('/login')}>
              Login
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

export default SignUpPage;
