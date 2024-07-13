import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { format, addDays, set } from 'date-fns';
import { formatISO } from 'date-fns';
import axios from 'axios';
import { auth } from '../firebase'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';

const Dashboard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const [interviewType, setInterviewType] = useState('');
  const [interviewRole, setInterviewRole] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimeString, setSelectedTimeString] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const days = Array.from({ length: 7 }, (_, i) => format(addDays(new Date(), i), 'EEEE MMMM d'));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || '');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleFinish = async () => {
    const utcTime = formatISO(new Date(selectedTime));
    const formData = {
      email,
      interviewType,
      interviewRole,
      selectedTime: utcTime,
    };

    console.log('Form Data:', formData);

    // Send data to the backend
    await sendToBackend(formData);

    onClose();
    navigate('/join-meeting', { state: { interviewType, interviewRole, email } });
  };

  const sendToBackend = async (data: { interviewType: string; interviewRole: string; selectedTime: string; email: string }) => {
    try {
      const response = await axios.post('http://localhost:5555/interviews', data);
      console.log('Data sent to backend:', response.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const handleTimeSelection = (day: string, time: string) => {
    const currentDate = new Date();
    const selectedDateIndex = days.findIndex(d => d === day);
    const selectedDate = addDays(currentDate, selectedDateIndex);
    const [hours, period] = time.split(' ');
    let hoursInt = parseInt(hours);

    if (period === 'PM' && hoursInt !== 12) {
      hoursInt += 12;
    } else if (period === 'AM' && hoursInt === 12) {
      hoursInt = 0;
    }

    const dateWithTime = set(selectedDate, { hours: hoursInt, minutes: 0, seconds: 0 });
    const isoDate = dateWithTime.toISOString();
    const timeString = `${day} ${time}`;
    console.log('Selected time:', isoDate, timeString);
    setSelectedTime(isoDate);
    setSelectedTimeString(timeString);
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
                  onClick={() => setInterviewType('Remote Patient Management')}
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
                {days.map((day, index) => {
                  return (
                    <Box key={index} mb={4}>
                      <Text>{day}</Text>
                      <HStack spacing={4} mt={2}>
                        <Button
                          onClick={() => handleTimeSelection(day, '10 AM')}
                          colorScheme={selectedTimeString === `${day} 10 AM` ? 'teal' : 'gray'}
                        >
                          10 AM
                        </Button>
                        <Button
                          onClick={() => handleTimeSelection(day, '2 PM')}
                          colorScheme={selectedTimeString === `${day} 2 PM` ? 'teal' : 'gray'}
                        >
                          2 PM
                        </Button>
                        <Button
                          onClick={() => handleTimeSelection(day, '6 PM')}
                          colorScheme={selectedTimeString === `${day} 6 PM` ? 'teal' : 'gray'}
                        >
                          6 PM
                        </Button>
                      </HStack>
                    </Box>
                  );
                })}
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
