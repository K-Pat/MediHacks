// src/components/InterviewScheduler.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Text,
  Heading,
} from '@chakra-ui/react';
import { format, addDays } from 'date-fns';

interface DashboardProps {
  onFinish: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onFinish }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const [interviewType, setInterviewType] = useState('');
  const [interviewLevel, setInterviewLevel] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const days = Array.from({ length: 7 }, (_, i) => format(addDays(new Date(), i), 'EEEE MMMM d'));

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleFinish = () => {
    const formData = {
      interviewType,
      interviewLevel,
      selectedTime,
    };

    console.log('Form Data:', formData);
    // Simulate sending data to a backend
    //CHANGE THIS LINE
    mockSendToBackend(formData);

    onClose();
    onFinish();
  };

  // Mock function to simulate sending data to a backend
  const mockSendToBackend = async (data: { interviewType: string; interviewLevel: string; selectedTime: string; }) => {
    try {
      // Simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Data sent to backend:', data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Open Interview Scheduler</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            {step === 1 && (
              <VStack spacing={4}>
                <Heading size="md">Select your interview type</Heading>
                <Button
                  onClick={() => setInterviewType('Technical')}
                  colorScheme={interviewType === 'Technical' ? 'teal' : 'gray'}
                >
                  Technical
                </Button>
                <Button
                  onClick={() => setInterviewType('Behavioral')}
                  colorScheme={interviewType === 'Behavioral' ? 'teal' : 'gray'}
                >
                  Behavioral
                </Button>
              </VStack>
            )}
            {step === 2 && (
              <VStack spacing={4}>
                <Heading size="md">Choose your interview level</Heading>
                <Button
                  onClick={() => setInterviewLevel('Junior')}
                  colorScheme={interviewLevel === 'Junior' ? 'teal' : 'gray'}
                >
                  Junior
                </Button>
                <Button
                  onClick={() => setInterviewLevel('Mid')}
                  colorScheme={interviewLevel === 'Mid' ? 'teal' : 'gray'}
                >
                  Mid
                </Button>
                <Button
                  onClick={() => setInterviewLevel('Senior')}
                  colorScheme={interviewLevel === 'Senior' ? 'teal' : 'gray'}
                >
                  Senior
                </Button>
              </VStack>
            )}
            {step === 3 && (
              <VStack spacing={4}>
                <Heading size="md">Select a time to practice</Heading>
                {days.map((day, index) => (
                  <Box key={index} mb={4}>
                    <Text>{day}</Text>
                    <HStack spacing={4} mt={2}>
                      <Button
                        onClick={() => setSelectedTime(`${day} 10 AM`)}
                        colorScheme={selectedTime === `${day} 10 AM` ? 'teal' : 'gray'}
                      >
                        10 AM
                      </Button>
                      <Button
                        onClick={() => setSelectedTime(`${day} 2 PM`)}
                        colorScheme={selectedTime === `${day} 2 PM` ? 'teal' : 'gray'}
                      >
                        2 PM
                      </Button>
                      <Button
                        onClick={() => setSelectedTime(`${day} 6 PM`)}
                        colorScheme={selectedTime === `${day} 6 PM` ? 'teal' : 'gray'}
                      >
                        6 PM
                      </Button>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4} w="full">
              {step > 1 && <Button w="full" onClick={handlePrev}>Previous</Button>}
              {step < 3 && (
                <Button w="full" onClick={handleNext} isDisabled={!interviewType || (step === 2 && !interviewLevel)}>
                  Next
                </Button>
              )}
              {step === 3 && (
                <Button w="full" onClick={handleFinish} isDisabled={!selectedTime}>
                  Finish
                </Button>
              )}
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
   );
};

export default Dashboard;
