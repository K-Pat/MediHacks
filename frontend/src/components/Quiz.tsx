// src/components/Quiz.tsx
import React, { useState } from 'react';
import { Box, Button, VStack, Radio, RadioGroup, Heading } from '@chakra-ui/react';
import { quizQuestions } from '../data/quiz1';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionChange = (value: string) => {
    setSelectedOption(parseInt(value));
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowScore(false);
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      {showScore ? (
        <VStack spacing={4}>
          <Heading size="lg">Your Score: {score} / {quizQuestions.length}</Heading>
          <Button colorScheme="teal" onClick={restartQuiz}>Restart Quiz</Button>
        </VStack>
      ) : (
        <VStack spacing={4}>
          <Heading size="md">{quizQuestions[currentQuestionIndex].question}</Heading>
          <RadioGroup onChange={handleOptionChange} value={selectedOption?.toString()}>
            {quizQuestions[currentQuestionIndex].options.map((option, index) => (
              <Radio key={index} value={index.toString()}>{option}</Radio>
            ))}
          </RadioGroup>
          <Button
            colorScheme="teal"
            onClick={handleNextQuestion}
            isDisabled={selectedOption === null}
          >
            Next
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Quiz;
