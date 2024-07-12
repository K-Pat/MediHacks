// src/components/JoinMeeting.tsx
import { useEffect } from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';

const JoinMeeting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const interviewType = location.state?.interviewType;
  const interviewRole = location.state?.interviewRole;

  useEffect(() => {
    if (interviewRole && interviewType) {
      setTimeout(() => {
        navigate(`/meeting/${interviewRole.toLowerCase()}`, { state: { interviewType, interviewRole } });
      }, 1000); // Adjust the delay as needed
    }
  }, [interviewRole, interviewType, navigate]);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <VStack spacing={8}>
        <Heading>Joining Meeting...</Heading>
        <Text>Please wait while we set things up for you.</Text>
      </VStack>
    </Box>
  );
};

export default JoinMeeting;
