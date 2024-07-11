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
  const [interviewRole, setInterviewRole] = useState('');
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
      interviewRole,
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
  const mockSendToBackend = async (data: { interviewType: string; interviewRole: string; selectedTime: string; }) => {
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
                <Heading size="md">Select your interview subject</Heading>
                <Button
                  onClick={() => setInterviewType('Advanced Sterilization Techniques')}
                  colorScheme={interviewType === 'Advanced Sterilization Techniques' ? 'teal' : 'gray'}
                >
                  Advanced Sterilization Techniques
                </Button>
                <Button
                  onClick={() => setInterviewType('ARemote Patient Management')}
                  colorScheme={interviewType === 'Remote Patient Management' ? 'teal' : 'gray'}
                >
                  Remote Patient Management
                </Button>
                <Button
                  onClick={() => setInterviewType('Oncology Patient Care Specialization')}
                  colorScheme={interviewType === 'Oncology Patient Care Specialization' ? 'teal' : 'gray'}
                >
                  Oncology Patient Care Specialization
                </Button>
              </VStack>
            )}
            {step === 2 && (
              <VStack spacing={4}>
                <Heading size="md">Choose your interview role</Heading>
                <Button
                  onClick={() => setInterviewRole('Interviewer')}
                  colorScheme={interviewRole === 'Interviewer' ? 'teal' : 'gray'}
                >
                  Interviewer
                </Button>
                <Button
                  onClick={() => setInterviewRole('Interviewee')}
                  colorScheme={interviewRole === 'Interviewee' ? 'teal' : 'gray'}
                >
                  Interviewee
                </Button>
  
              </VStack>
            )}
            {step === 3 && (
              <VStack spacing={4}>
                <Heading size="md">Select a time to interview</Heading>
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
                <Button w="full" onClick={handleNext} isDisabled={!interviewType || (step === 2 && !interviewRole)}>
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
