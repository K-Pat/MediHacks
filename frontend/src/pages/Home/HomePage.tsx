
import { Box, Button, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box position="relative" width="100vw" height="100vh" overflow="hidden">
          <Spline scene="https://prod.spline.design/ojM1d1nVcPacEoyY/scene.splinecode" />
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        color="black"
        pointerEvents="none" // Add this line to ensure the Spline remains interactive
      >
        <VStack spacing={8} pointerEvents="all"> // Add pointerEvents="all" to the VStack to make the elements inside it interactive
          <Heading size="2xl">Welcome to Our Cool Platform</Heading>
          <Text fontSize="xl">Sign up now to get started!</Text>
          <HStack spacing={4}>
            <Button colorScheme="red" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
            <Button colorScheme="red" onClick={() => navigate('/login')}>
              Login
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default HomePage;
