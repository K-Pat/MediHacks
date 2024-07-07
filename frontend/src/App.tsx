import React, { useState } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import InterviewScheduler from './components/InterviewScheduler';
import Quiz from './components/Quiz';

const App = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleSchedulerFinish = () => {
    setShowQuiz(true);
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        {!showQuiz ? (
          <InterviewScheduler onFinish={handleSchedulerFinish} />
        ) : (
          <Quiz />
        )}
      </Box>
    </ChakraProvider>
  );
};

export default App
