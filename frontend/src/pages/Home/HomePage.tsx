// src/components/HomePage.tsx
import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    HStack,
    Flex,
    Spacer,
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  import Spline from "@splinetool/react-spline";
  
  const HomePage = () => {
    const navigate = useNavigate();
  
    return (
      <Box
        position="relative"
        width="100vw"
        height="100vh"
        overflow="hidden"
        bg="#F9FAFB"
      >
        <Flex
          as="nav"
          width="100%"
          p={4}
          bg="white"
          boxShadow="sm"
          position="absolute"
          top="0"
          zIndex="10"
        >
          <Box
            fontWeight="bold"
            fontSize="xl"
            cursor="pointer"
            onClick={() => navigate("/")}
          >
            AccredMed
          </Box>
          <Spacer />
          <HStack spacing={8}>
            <Button
              variant="link"
              fontSize="lg"
              color="teal.600"
              onClick={() => navigate("/about-us")}
            >
              About Us
            </Button>
            <Button
              variant="link"
              fontSize="lg"
              color="teal.600"
              onClick={() => navigate("/explore-tracks")}
            >
              Explore Tracks
            </Button>
            <Button
              variant="link"
              fontSize="lg"
              color="teal.600"
              onClick={() => navigate("/coming-soon")}
            >
              Coming Soon
            </Button>
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
            <Heading size="4xl" color="teal.600">
              Elevate Your Nursing Career
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Join AccredMed, the leading platform for nursing credentials. Validate your skills through professional interviews and advance your career with recognized certifications.
            </Text>
            <Text fontSize="lg" color="gray.600">
              Get started today and unlock new opportunities!
            </Text>
            <HStack spacing={4}>
              <Button
                colorScheme="teal"
                size="lg"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </HStack>
          </VStack>
  
          <Box width="62%" height="100%">
            <Spline scene="https://prod.spline.design/vx40YtuORyAhy6I3/scene.splinecode" />
          </Box>
        </Flex>
      </Box>
    );
  };
  
  export default HomePage;
  