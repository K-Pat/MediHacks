import { Box, Button, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      bgGradient="linear(to-r, blue.700, purple.700)"
      color="white"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={4}
    >
      <VStack spacing={8}>
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
  );
};

export default HomePage;
