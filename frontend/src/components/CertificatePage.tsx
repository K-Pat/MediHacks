// src/components/CertificatePage.tsx

import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import html2canvas from 'html2canvas';

const CertificatePage = () => {
  const location = useLocation();
  const role = location.state?.role; // either 'Interviewer' or 'Interviewee'
  const interviewType = location.state?.interviewType;

  const [name, setName] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    setIssueDate(formattedDate);
  }, []);

  const handleDownloadCertificate = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={4}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <VStack spacing={8} width="100%" maxWidth="md">
        <FormControl id="name">
          <FormLabel>Enter your name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </FormControl>
        <Box
          ref={certificateRef}
          bg={useColorModeValue('white', 'gray.700')}
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          border="2px solid"
          borderColor={useColorModeValue('gray.200', 'gray.600')}
          width="100%"
          textAlign="center"
        >
          <Heading size="lg" mb={4}>Certificate of Completion</Heading>
          <Text fontSize="lg" mb={4}>This certifies that</Text>
          <Heading size="md" mb={4}>{name || 'Your Name'}</Heading>
          <Text fontSize="lg" mb={4}>has successfully completed the</Text>
          <Heading size="md" mb={4}>{interviewType}</Heading>
          <Text fontSize="lg" mb={4}>track as an {role}</Text>
          <Text fontSize="sm" mt={4}>Issued on: {issueDate}</Text>
        </Box>
        <Button colorScheme="teal" onClick={handleDownloadCertificate}>
          Download Certificate
        </Button>
      </VStack>
    </Box>
  );
};

export default CertificatePage;
