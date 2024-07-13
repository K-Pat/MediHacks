import { Box, Button, Heading, Text, VStack, HStack, Flex, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box position="relative" width="100vw" height="100vh" overflow="hidden" bg="#E7EFFF">
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
      
      <Flex
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="space-around"
        color="black"
        p={8}
      >
        <VStack spacing={6} align="flex-start" pointerEvents="all" maxW="lg">
          <Heading size="4xl">The New Standard in Nurse Upleveling</Heading>
          <Text fontSize="xl" color="gray.600">
            The premier platform for nursing credentialing. Earn certificates through professional interviews and uplevel your career.
          </Text>
          <Text fontSize="lg">Sign up now to get started!</Text>
          <HStack spacing={4}>
            <Button colorScheme="red" size="lg" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </HStack>
        </VStack>
        
        <Box width="60%" height="100%">
        <Spline scene="https://prod.spline.design/ojM1d1nVcPacEoyY/scene.splinecode" />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
