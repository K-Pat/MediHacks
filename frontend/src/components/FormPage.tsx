// src/components/FormPage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading } from '@chakra-ui/react';

const FormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role; // either 'Interviewer' or 'Interviewee'
  const interviewType = location.state?.interviewType;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    navigate('/dashboard/certificate', { state: { role, interviewType } });
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <VStack spacing={8} width="100%" maxWidth="md">
        <Heading>{role} Form</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="question1">
              <FormLabel>Question 1</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="question2">
              <FormLabel>Question 2</FormLabel>
              <Input type="text" />
            </FormControl>
            {/* Add more questions as needed */}
            <Button type="submit" colorScheme="teal">
              Submit
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default FormPage;
