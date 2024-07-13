// src/components/ComingSoon.tsx
import React from 'react';
import { Box, Button, Heading, Text, VStack, HStack, Flex, Spacer, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Import images from the assets folder
import pediatrics from '../assets/pediatrics.png';
import geriatrics from '../assets/geriatrics.png';
import mobile from '../assets/mobile.png';
import forum from '../assets/forum.png';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <Box position="relative" width="100vw" minHeight="100vh" overflow="hidden" bg="#F9FAFB">
      <Flex as="nav" width="100%" p={6} bg="white" boxShadow="lg" position="absolute" top="0" zIndex="10" alignItems="center">
        <Box fontWeight="bold" fontSize="2xl" cursor="pointer" onClick={() => navigate('/')} color="teal.600" _hover={{ color: 'teal.800' }}>
          AccredMed
        </Box>
        <Spacer />
        <HStack spacing={10}>
          <Button variant="link" fontSize="xl" color="teal.600" _hover={{ textDecoration: 'underline', color: 'teal.800' }} onClick={() => navigate('/about-us')}>
            About Us
          </Button>
          <Button variant="link" fontSize="xl" color="teal.600" _hover={{ textDecoration: 'underline', color: 'teal.800' }} onClick={() => navigate('/explore-tracks')}>
            Explore Tracks
          </Button>
          <Button variant="link" fontSize="xl" color="teal.600" _hover={{ textDecoration: 'underline', color: 'teal.800' }} onClick={() => navigate('/coming-soon')}>
            Coming Soon
          </Button>
        </HStack>
      </Flex>
      
      <VStack spacing={8} align="stretch" maxWidth="800px" mx="auto" mt="120px">
        <Heading as="h1" size="3xl" textAlign="center" color="teal.600">
          Coming Soon
        </Heading>
        <Text fontSize="xl" textAlign="center" color="gray.600">
          We are constantly expanding our offerings to provide more value to our users. Here are some exciting new tracks and features that will be added to our platform soon!
        </Text>
        
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="2xl" color="teal.600" textAlign="center">
            Tracks
          </Heading>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image borderRadius="md" boxSize="80px" src={pediatrics} alt="Pediatrics Nursing" />
            </Box>
            <Box>
              <Heading as="h3" size="lg" color="teal.600">
                Pediatrics Nursing
              </Heading>
              <Text fontSize="lg" color="gray.600">
                This track will cover the specialized care required for infants, children, and adolescents. Learn best practices, treatment methodologies, and effective communication techniques for young patients.
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image borderRadius="md" boxSize="80px" src={geriatrics} alt="Geriatrics Nursing" />
            </Box>
            <Box>
              <Heading as="h3" size="lg" color="teal.600">
                Geriatrics Nursing
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Focused on the care of elderly patients, this track will provide insights into managing chronic illnesses, promoting healthy aging, and understanding the unique needs of older adults.
              </Text>
            </Box>
          </HStack>

          <Heading as="h2" size="2xl" color="teal.600" textAlign="center">
            Features
          </Heading>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image borderRadius="md" boxSize="80px" src={mobile} alt="Mobile App" />
            </Box>
            <Box>
              <Heading as="h3" size="lg" color="teal.600">
                Mobile App
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Soon, you will be able to access AccredMed on the go with our new mobile app. Stay connected, complete interviews, and continue learning anytime, anywhere.
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image borderRadius="md" boxSize="80px" src={forum} alt="Community Forum" />
            </Box>
            <Box>
              <Heading as="h3" size="lg" color="teal.600">
                Community Forum
              </Heading>
              <Text fontSize="lg" color="gray.600">
                We are introducing a community forum where nurses can share experiences, ask questions, and support each other. Engage with peers and industry experts to enhance your learning journey.
              </Text>
            </Box>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ComingSoon;
