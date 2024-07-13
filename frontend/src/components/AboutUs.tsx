// src/components/AboutUs.tsx
import React from 'react';
import { Box, Button, Heading, Text, VStack, HStack, Flex, Spacer, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Import images from the assets folder
import incentive from '../assets/incentive.png';
import seamless from '../assets/seamless.png';
import niche from '../assets/niche.png';
import expert from '../assets/expert.png';
import community from '../assets/community.png';

const AboutUs = () => {
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
          About AccredMed
        </Heading>
        <Text fontSize="xl" textAlign="center" color="gray.600">
          AccredMed is a pioneering platform designed to empower nurses by providing an innovative and seamless pathway to earn valuable credentials. We are dedicated to advancing the nursing profession through targeted education and professional development.
        </Text>

        <VStack spacing={6} align="stretch">
          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image boxSize="80px" src={incentive} alt="Incentives Icon" />
            </Box>
            <Box>
              <Heading as="h2" size="lg" color="teal.600">
                Incentivized Credentialing
              </Heading>
              <Text fontSize="lg" color="gray.600">
                We motivate nurses to pursue advanced credentials by offering a streamlined and rewarding experience. Gain certifications through structured interviews and targeted learning modules.
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image boxSize="80px" src={seamless} alt="Seamless Platform Icon" />
            </Box>
            <Box>
              <Heading as="h2" size="lg" color="teal.600">
                Seamless Platform
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Our platform is designed with user experience in mind, ensuring that the process of scheduling, preparing, and completing interviews is intuitive and hassle-free.
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image boxSize="80px" src={niche} alt="Niche Topics Icon" />
            </Box>
            <Box>
              <Heading as="h2" size="lg" color="teal.600">
                Relevant and Niche Topics
              </Heading>
              <Text fontSize="lg" color="gray.600">
                We focus on providing education on niche and highly relevant topics that are crucial for modern nursing practices, ensuring that our users stay ahead in their careers.
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image boxSize="80px" src={expert} alt="Expert Guidance Icon" />
            </Box>
            <Box>
              <Heading as="h2" size="lg" color="teal.600">
                Expert Guidance
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Learn from industry experts and gain insights from seasoned professionals who bring their extensive knowledge and experience to our educational modules and interviews.
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image boxSize="80px" src={community} alt="Community Support Icon" />
            </Box>
            <Box>
              <Heading as="h2" size="lg" color="teal.600">
                Community Support
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Join a thriving community of nurses who are committed to lifelong learning and professional growth. Share experiences, support each other, and celebrate achievements together.
              </Text>
            </Box>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default AboutUs;
