// src/components/AboutUs.tsx

import { Box, Heading, Text, VStack, HStack, Image} from '@chakra-ui/react';

const AboutUs = () => {
  return (
    <Box p={8} bg="#f9fafb" minHeight="100vh">
      <VStack spacing={8} align="stretch" maxWidth="800px" mx="auto">
        <Heading as="h1" size="2xl" textAlign="center" color="teal.600">
          About AccredMed
        </Heading>
        <Text fontSize="lg" textAlign="center" color="gray.600">
          AccredMed is a pioneering platform designed to empower nurses by providing an innovative and seamless pathway to earn valuable credentials. We are dedicated to advancing the nursing profession through targeted education and professional development.
        </Text>
        
        <Image src="/path/to/your/image.jpg" alt="Nursing Professionals" borderRadius="md" />

        <VStack spacing={4} align="stretch">
          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image
                borderRadius="full"
                boxSize="80px"
                src="/path/to/your/icon1.png"
                alt="Incentives Icon"
              />
            </Box>
            <Box>
              <Heading as="h2" size="md" color="teal.600">
                Incentivized Credentialing
              </Heading>
              <Text fontSize="md" color="gray.600">
                We motivate nurses to pursue advanced credentials by offering a streamlined and rewarding experience. Gain certifications through structured interviews and targeted learning modules.
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image
                borderRadius="full"
                boxSize="80px"
                src="/path/to/your/icon2.png"
                alt="Seamless Platform Icon"
              />
            </Box>
            <Box>
              <Heading as="h2" size="md" color="teal.600">
                Seamless Platform
              </Heading>
              <Text fontSize="md" color="gray.600">
                Our platform is designed with user experience in mind, ensuring that the process of scheduling, preparing, and completing interviews is intuitive and hassle-free.
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image
                borderRadius="full"
                boxSize="80px"
                src="/path/to/your/icon3.png"
                alt="Niche Topics Icon"
              />
            </Box>
            <Box>
              <Heading as="h2" size="md" color="teal.600">
                Relevant and Niche Topics
              </Heading>
              <Text fontSize="md" color="gray.600">
                We focus on providing education on niche and highly relevant topics that are crucial for modern nursing practices, ensuring that our users stay ahead in their careers.
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image
                borderRadius="full"
                boxSize="80px"
                src="/path/to/your/icon4.png"
                alt="Expert Guidance Icon"
              />
            </Box>
            <Box>
              <Heading as="h2" size="md" color="teal.600">
                Expert Guidance
              </Heading>
              <Text fontSize="md" color="gray.600">
                Learn from industry experts and gain insights from seasoned professionals who bring their extensive knowledge and experience to our educational modules and interviews.
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4}>
            <Box flexShrink={0}>
              <Image
                borderRadius="full"
                boxSize="80px"
                src="/path/to/your/icon5.png"
                alt="Community Support Icon"
              />
            </Box>
            <Box>
              <Heading as="h2" size="md" color="teal.600">
                Community Support
              </Heading>
              <Text fontSize="md" color="gray.600">
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
