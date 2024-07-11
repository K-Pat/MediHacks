// src/components/CertificatePage.tsx

import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, HStack, Heading, Text, useColorModeValue, Image} from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import badgeImage from '../assets/badge.png'; // Ensure you have this image in the specified path
import PrachiSignature from '../assets/PrachiSignature.png'; // Ensure you have this image in the specified path
import KavyanSignature from '../assets/KavyanSignature.png'; // Ensure you have this image in the specified path

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
      <VStack spacing={8} width="100%" maxWidth="4xl">
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
          maxWidth="800px"
          textAlign="center"
          fontFamily="'Cinzel', serif"
        >
          <Heading size="lg" mb={4} fontFamily="'Cinzel', serif">Certificate of Completion</Heading>
          <Text fontSize="lg" mb={4} fontFamily="'Cinzel', serif">This certifies that</Text>
          <Heading size="md" mb={4} fontFamily="'Cinzel', serif">{name || 'Your Name'}</Heading>
          <Text fontSize="lg" mb={4} fontFamily="'Cinzel', serif">has successfully completed the</Text>
          <Heading size="md" mb={4} fontFamily="'Cinzel', serif">{interviewType}</Heading>
          <Text fontSize="lg" mb={4} fontFamily="'Cinzel', serif">track as an {role}</Text>
          <Image src={badgeImage} alt="Badge" boxSize="100px" mt={4} mb={4} mx="auto" />
          <Text fontSize="sm" mt={4} fontFamily="'Cinzel', serif">Issued on: {issueDate}</Text>
          <HStack justifyContent="space-around" mt={8}>
            <VStack spacing={0}>
              <Image src={PrachiSignature} alt="Signature 1" width="200px" height="120px" objectFit="contain" />
              <Text fontFamily="'Cinzel', serif" mt={2}>Prachi Heda</Text>
              <Text fontFamily="'Cinzel', serif">CO-FOUNDER</Text>
            </VStack>
            <VStack spacing={0}>
              <Image src={KavyanSignature} alt="Signature 2" width="200px" height="120px" objectFit="contain" />
              <Text fontFamily="'Cinzel', serif" mt={2}>Kavyan Patel</Text>
              <Text fontFamily="'Cinzel', serif">CO-FOUNDER</Text>
            </VStack>
          </HStack>
        </Box>
        <Button colorScheme="teal" onClick={handleDownloadCertificate}>
          Download Certificate
        </Button>
      </VStack>
    </Box>
  );
};

export default CertificatePage;
