import { Box, Button, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box position="relative" width="100vw" height="100vh" overflow="hidden" bg="#E7EFFF">
      <Box
        position="absolute"
        top="0"
        left="0"
        width="50%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        textAlign="left"
        color="black"
        pointerEvents="none"
        p={8}
      >
        <VStack spacing={6} align="flex-start" pointerEvents="all" maxW="lg">
          <Heading size="4xl">AccredMed</Heading>
          <Text fontSize="xl" color="gray.600">
            The premier platform for nursing credentialing. Earn certificates through professional interviews and uplevel your career.
          </Text>
          <Text fontSize="lg">Sign up now to get started!</Text>
          <HStack spacing={4}>
            <Button colorScheme="red" size="lg" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
            <Button colorScheme="red" size="lg" onClick={() => navigate('/login')}>
              Login
            </Button>
          </HStack>
        </VStack>
      </Box>
      <Box position="absolute" top="0" right="0" width="70%" height="100%">
        <Spline scene="https://prod.spline.design/ojM1d1nVcPacEoyY/scene.splinecode" style={{ width: '100%', height: '100vh' }} />
      </Box>
    </Box>
  );
};

export default HomePage;
