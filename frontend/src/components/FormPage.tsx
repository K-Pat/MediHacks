// src/components/FormPage.tsx
import React, { useState, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Stack,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';

interface FormData {
  question1: string;
  question2: string;
  rating: number;
  feedback: string;
  selectedOptions: string[];
}

const FormPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role as 'Interviewer' | 'Interviewee'; // either 'Interviewer' or 'Interviewee'
  const interviewType = location.state?.interviewType as string;

  const [formData, setFormData] = useState<FormData>({
    question1: '',
    question2: '',
    rating: 5,
    feedback: '',
    selectedOptions: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSliderChange = (value: number) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: value,
    }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prevData) => {
      const newSelectedOptions = prevData.selectedOptions.includes(option)
        ? prevData.selectedOptions.filter((item) => item !== option)
        : [...prevData.selectedOptions, option];
      return {
        ...prevData,
        selectedOptions: newSelectedOptions,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
    navigate('/dashboard/certificate', { state: { role, interviewType } });
  };

  const interviewerQuestions = (
    <>
      <FormControl id="question1">
        <FormLabel>What was the most challenging question you asked?</FormLabel>
        <Textarea name="question1" value={formData.question1} onChange={handleChange} />
      </FormControl>
      <FormControl id="question2">
        <FormLabel>How would you rate the interviewee's performance?</FormLabel>
        <Slider
          aria-label="rating"
          defaultValue={5}
          min={0}
          max={10}
          step={1}
          value={formData.rating}
          onChange={handleSliderChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
      <FormControl id="question3">
        <FormLabel>Select all that apply (skills evaluated):</FormLabel>
        <Stack spacing={2}>
          <Checkbox
            isChecked={formData.selectedOptions.includes('communication')}
            onChange={() => handleCheckboxChange('communication')}
          >
            Communication
          </Checkbox>
          <Checkbox
            isChecked={formData.selectedOptions.includes('technicalKnowledge')}
            onChange={() => handleCheckboxChange('technicalKnowledge')}
          >
            Technical Knowledge
          </Checkbox>
          <Checkbox
            isChecked={formData.selectedOptions.includes('problemSolving')}
            onChange={() => handleCheckboxChange('problemSolving')}
          >
            Problem Solving
          </Checkbox>
        </Stack>
      </FormControl>
      <FormControl id="feedback">
        <FormLabel>Any additional feedback?</FormLabel>
        <Textarea name="feedback" value={formData.feedback} onChange={handleChange} />
      </FormControl>
    </>
  );

  const intervieweeQuestions = (
    <>
      <FormControl id="question1">
        <FormLabel>What was the most challenging question you faced?</FormLabel>
        <Textarea name="question1" value={formData.question1} onChange={handleChange} />
      </FormControl>
      <FormControl id="question2">
        <FormLabel>How would you rate your own performance?</FormLabel>
        <Slider
          aria-label="rating"
          defaultValue={5}
          min={0}
          max={10}
          step={1}
          value={formData.rating}
          onChange={handleSliderChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
      <FormControl id="question3">
        <FormLabel>Select all that apply (areas you need to improve):</FormLabel>
        <Stack spacing={2}>
          <Checkbox
            isChecked={formData.selectedOptions.includes('communication')}
            onChange={() => handleCheckboxChange('communication')}
          >
            Communication
          </Checkbox>
          <Checkbox
            isChecked={formData.selectedOptions.includes('technicalKnowledge')}
            onChange={() => handleCheckboxChange('technicalKnowledge')}
          >
            Technical Knowledge
          </Checkbox>
          <Checkbox
            isChecked={formData.selectedOptions.includes('problemSolving')}
            onChange={() => handleCheckboxChange('problemSolving')}
          >
            Problem Solving
          </Checkbox>
        </Stack>
      </FormControl>
      <FormControl id="feedback">
        <FormLabel>Any additional feedback?</FormLabel>
        <Textarea name="feedback" value={formData.feedback} onChange={handleChange} />
      </FormControl>
    </>
  );

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
      p={4}
    >
      <Box
        width="100%"
        maxWidth="md"
        bg={useColorModeValue('white', 'gray.700')}
        p={8}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading mb={6}>{role} Form</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {role === 'Interviewer' ? interviewerQuestions : intervieweeQuestions}
            <Button type="submit" colorScheme="teal" width="full">
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default FormPage;
