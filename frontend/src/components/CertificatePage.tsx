// src/components/CertificatePage.tsx

import { useLocation } from 'react-router-dom';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const CertificatePage = () => {
  const location = useLocation();
  const role = location.state?.role; // either 'Interviewer' or 'Interviewee'
  const interviewType = location.state?.interviewType;

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <VStack spacing={8}>
        <Heading>Certificate of Completion</Heading>
        <Text>
          This certifies that you have successfully completed the {interviewType} track as an {role}.
        </Text>
        <Text>Congratulations!</Text>
      </VStack>
    </Box>
  );
};

export default CertificatePage;
