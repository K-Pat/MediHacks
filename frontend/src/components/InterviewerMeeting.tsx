// src/components/InterviewerMeeting.tsx
import { useState, useEffect } from 'react';
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from 'agora-rtc-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import '../styles.css';

const InterviewerMeeting = () => {
  const [calling, setCalling] = useState(true);
  const isConnected = useIsConnected();
  const appId = '31a0fa9377994261a17bc848c5628e4c';
  const channel = 'Meeting';
  const token = '007eJxTYNCJ6mSK6J/eaMrKrn7mZuwkxu09O5YLr+x0LHTku//Rb7cCg7FhokFaoqWxubmlpYmRmWGioXlSsoWJRbKpmZFFqknyft8paQ2BjAwq3VoMjFAI4rMz+KamlmTmpTMwAADRpR2h';
  const navigate = useNavigate();
  const location = useLocation();
  const interviewType = location.state?.interviewType;

  useJoin({ appid: appId, channel: channel, token: token }, calling);

  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();

  useEffect(() => {
    setCalling(true);
  }, []);

  const handleEndCall = () => {
    setCalling(false);
    navigate('/dashboard/form', { state: { role: 'Interviewer', interviewType } });
  };

  const getQuestions = () => {
    switch (interviewType) {
      case 'Advanced Sterilization Techniques':
        return [
          "What are the key principles of advanced sterilization techniques?",
          "How do different sterilization methods compare in terms of efficacy?",
          "What are the latest advancements in sterilization technology?",
          "How do you ensure the sterility of reusable medical instruments?",
          "What are the common challenges in implementing sterilization protocols?"
        ];
      case 'Remote Patient Management':
        return [
          "What are the essential components of an effective remote patient management system?",
          "How do telehealth technologies facilitate remote patient care?",
          "What are the best practices for monitoring patients remotely?",
          "How can patient engagement be maintained in remote care settings?",
          "What are the challenges and solutions in remote patient management?"
        ];
      case 'Oncology Patient Care Specialization':
        return [
          "What are the key considerations in oncology patient care?",
          "How do you manage the side effects of cancer treatments?",
          "What role does multidisciplinary care play in oncology?",
          "What are the latest advancements in oncology treatment?",
          "How do you provide psychological support to oncology patients?"
        ];
      default:
        return [];
    }
  };

  const getAnswers = () => {
    switch (interviewType) {
      case 'Advanced Sterilization Techniques':
        return [
          "Key principles include ensuring all surfaces are exposed to the sterilant, maintaining appropriate contact time, and using the correct concentration of sterilant.",
          "Different methods such as steam, ethylene oxide, and hydrogen peroxide vapor have varying efficacies depending on the type of material and microbial load.",
          "Latest advancements include low-temperature hydrogen peroxide plasma sterilizers and ozone-based sterilization systems.",
          "Ensuring sterility involves proper cleaning, using validated sterilization processes, and routine monitoring using biological indicators.",
          "Common challenges include ensuring compliance with protocols, dealing with complex instrument designs, and maintaining sterilization in large-scale operations."
        ];
      case 'Remote Patient Management':
        return [
          "Essential components include reliable telecommunication infrastructure, user-friendly software, and integration with electronic health records.",
          "Telehealth technologies enable real-time monitoring, virtual consultations, and remote diagnostics, enhancing patient access to care.",
          "Best practices include regular check-ins, use of wearable devices for continuous monitoring, and personalized care plans.",
          "Maintaining engagement involves clear communication, setting expectations, and using interactive tools to keep patients involved in their care.",
          "Challenges include ensuring data security, managing technical issues, and maintaining the quality of care. Solutions involve robust IT support and continuous training for healthcare providers."
        ];
      case 'Oncology Patient Care Specialization':
        return [
          "Key considerations include understanding the type of cancer, stage of disease, treatment options, and patient preferences.",
          "Managing side effects involves using medications, lifestyle modifications, and supportive therapies to alleviate symptoms.",
          "Multidisciplinary care involves collaboration among oncologists, surgeons, radiologists, and other specialists to provide comprehensive care.",
          "Latest advancements include targeted therapies, immunotherapies, and personalized medicine based on genetic profiling of tumors.",
          "Psychological support involves counseling, support groups, and stress management techniques to help patients cope with the emotional impact of cancer."
        ];
      default:
        return [];
    }
  };

  const questions = getQuestions();
  const answers = getAnswers();

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bg="#F9FAFB">
      {isConnected ? (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" width="80%">
          <Flex flexDirection="row" alignItems="center" justifyContent="space-around" width="100%" mb={4}>
            <Box className="user" width="45%" height="50vh" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              >
                <Text className="user-name" textAlign="center">You</Text>
              </LocalUser>
            </Box>
            {remoteUsers.map((user) => (
              <Box className="user" key={user.uid} width="45%" height="50vh" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <RemoteUser cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg" user={user}>
                  <Text className="user-name" textAlign="center">{user.uid}</Text>
                </RemoteUser>
              </Box>
            ))}
          </Flex>
          <Flex justifyContent="center" mb={4}>
            <Button onClick={() => setMic((a) => !a)} m={2}>
              <i className={`i-microphone ${!micOn ? 'off' : ''}`} />
            </Button>
            <Button onClick={() => setCamera((a) => !a)} m={2}>
              <i className={`i-camera ${!cameraOn ? 'off' : ''}`} />
            </Button>
            <Button onClick={handleEndCall} m={2}>
              <i className="i-phone-hangup" />
            </Button>
          </Flex>
          <Box p={4} mt={4} borderWidth="1px" borderRadius="md" width="100%">
            <Heading size="md" textAlign="center">Questions for the Interview</Heading>
            <Accordion allowToggle>
              {questions.map((question, index) => (
                <AccordionItem key={index}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {index + 1}. {question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Text fontWeight="bold">Answer: {answers[index]}</Text>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </Flex>
      ) : (
        <Box textAlign="center">
          <Heading size="lg">Connecting...</Heading>
        </Box>
      )}
    </Box>
  );
};

export default InterviewerMeeting;
