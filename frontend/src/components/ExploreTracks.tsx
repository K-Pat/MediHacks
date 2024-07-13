// src/components/ExploreTracks.tsx
import React from 'react';
import { Box, Button, Heading, Text, VStack, HStack, Flex, Spacer, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ExploreTracks = () => {
  const navigate = useNavigate();

  return (
    <Box position="relative" width="100vw" minHeight="100vh" overflow="hidden" bg="#f9fafb">
      <Flex as="nav" width="100%" p={4} bg="white" boxShadow="sm" position="absolute" top="0" zIndex="10">
        <Box fontWeight="bold" fontSize="xl" cursor="pointer" onClick={() => navigate('/')}>
          AccredMed
        </Box>
        <Spacer />
        <HStack spacing={8}>
          <Button variant="link" onClick={() => navigate('/about-us')}>About Us</Button>
          <Button variant="link" onClick={() => navigate('/explore-tracks')}>Explore Tracks</Button>
          <Button variant="link" onClick={() => navigate('/coming-soon')}>Coming Soon</Button>
        </HStack>
      </Flex>
      
      <VStack spacing={8} align="stretch" maxWidth="800px" mx="auto" mt="100px">
        <Heading as="h1" size="2xl" textAlign="center" color="teal.600">
          Explore Tracks
        </Heading>
        <Text fontSize="lg" textAlign="center" color="gray.600">
          At AccredMed, we offer specialized tracks to help nurses gain credentials and demonstrate their expertise in key areas of modern nursing practices. Each track focuses on best practices, techniques, theories, and methodologies, ensuring a comprehensive understanding of the subject matter.
        </Text>
        
        <VStack spacing={4} align="stretch">
          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image
                borderRadius="md"
                boxSize="80px"
                src="/path/to/your/sterilization.jpg"
                alt="Advanced Sterilization Techniques"
              />
            </Box>
            <Box>
              <Heading as="h2" size="md" color="teal.600">
                Advanced Sterilization Techniques
              </Heading>
              <Text fontSize="md" color="gray.600">
                This track covers the latest sterilization methods and best practices. Interviewees will answer questions demonstrating their understanding of sterilization techniques, ensuring patient safety and maintaining high standards of cleanliness.
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image
                borderRadius="md"
                boxSize="80px"
                src="/path/to/your/patient_management.jpg"
                alt="Remote Patient Management"
              />
            </Box>
            <Box>
              <Heading as="h2" size="md" color="teal.600">
                Remote Patient Management
              </Heading>
              <Text fontSize="md" color="gray.600">
                Focused on managing patient care remotely, this track ensures nurses are proficient with telehealth technologies, patient monitoring, and remote care strategies. Interviewees will showcase their knowledge in providing effective remote care.
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image
                borderRadius="md"
                boxSize="80px"
                src="/path/to/your/oncology_care.jpg"
                alt="Oncology Patient Care Specialization"
              />
            </Box>
            <Box>
              <Heading as="h2" size="md" color="teal.600">
                Oncology Patient Care Specialization
              </Heading>
              <Text fontSize="md" color="gray.600">
                This track focuses on the best practices and methodologies in oncology care. Nurses will demonstrate their understanding of oncology treatments, patient support, and the latest advancements in cancer care.
              </Text>
            </Box>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ExploreTracks;
