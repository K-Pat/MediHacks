// src/components/SignUp.tsx
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import '../../assets/background.css';
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
      return; // Stop the form submission
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setTimeout(() => {
        setPasswordError('');
      }, 5000);
      return; // Stop the form submission
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        email,
      });
      navigate('/login');
      console.log('Account Created Successfully');
    } catch (err) {
      const error = err as FirebaseError;
      if (error.code === 'auth/email-already-in-use') {
        setPasswordError('This email is already in use. Please use a different email');
      } else if (error.code === 'auth/weak-password') {
        setPasswordError('Password must be longer than 6 characters. Please try a different password');
      } else {
        console.error('Signup failed: ', error.message);
        setPasswordError('Failed to create account. Please try again later');
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
        <Heading>Sign Up</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              {passwordError && <Text color="red.500">{passwordError}</Text>}
            </FormControl>
            <Button type="submit" colorScheme="red">
              Sign Up
            </Button>
          </VStack>
        </form>
        <Text>
          Already have an account?{' '}
          <Link color="red.300" onClick={() => navigate('/login')}>
            Login
          </Link>
        </Text>
        <Button colorScheme="red" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default SignUpPage;
