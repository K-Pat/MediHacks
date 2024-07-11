// src/components/JoinMeeting.tsx
import { Box, Button, VStack, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const JoinMeeting = () => {
  const navigate = useNavigate();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <VStack spacing={8}>
        <Heading>Select Your Role</Heading>
        <Button colorScheme="teal" onClick={() => navigate('/meeting/interviewer')}>
          Interviewer
        </Button>
        <Button colorScheme="teal" onClick={() => navigate('/meeting/interviewee')}>
          Interviewee
        </Button>
      </VStack>
    </Box>
  );
};

export default JoinMeeting;
