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
import '../styles.css';
import { Box, VStack, Text, Heading } from '@chakra-ui/react';

const InterviewerMeeting = () => {
  const [calling, setCalling] = useState(true);
  const isConnected = useIsConnected();
  const appId = '31a0fa9377994261a17bc848c5628e4c';
  const channel = 'Meeting';
  const token = '007eJxTYGCRuX4jKesDu5Glu/n7r2bLv0vZ5/DsDlh9RC7+qsDEHhcFBmPDRIO0REtjc3NLSxMjM8NEQ/OkZAsTi2RTMyOLVJPkmUkT0hoCGRlKbPiYGBkgEMRnZ/BNTS3JzEtnYAAAB1sd5g==';
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
          "Can you explain your experience with advanced sterilization techniques?",
          "What are the most common challenges in sterilization processes?",
          "How do you ensure compliance with sterilization protocols?",
          "Describe a time when you improved a sterilization process.",
          "What are the latest advancements in sterilization technology?"
        ];
      case 'Remote Patient Management':
        return [
          "How do you manage patient care remotely?",
          "What tools and technologies do you use for remote patient monitoring?",
          "Describe a challenging case you managed remotely.",
          "How do you ensure patient engagement and compliance remotely?",
          "What are the key benefits and drawbacks of remote patient management?"
        ];
      case 'Oncology Patient Care Specialization':
        return [
          "Describe your approach to oncology patient care.",
          "How do you manage side effects of cancer treatment?",
          "What is your experience with multidisciplinary cancer care?",
          "How do you support patients emotionally and psychologically?",
          "What are the latest developments in oncology care?"
        ];
      default:
        return [];
    }
  };

  const questions = getQuestions();

  return (
    <div className="room">
      {isConnected ? (
        <div className="user-list">
          <div className="user">
            <LocalUser
              audioTrack={localMicrophoneTrack}
              cameraOn={cameraOn}
              micOn={micOn}
              videoTrack={localCameraTrack}
              cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
            >
              <samp className="user-name">You</samp>
            </LocalUser>
          </div>
          {remoteUsers.map((user) => (
            <div className="user" key={user.uid}>
              <RemoteUser cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg" user={user}>
                <samp className="user-name">{user.uid}</samp>
              </RemoteUser>
            </div>
          ))}
        </div>
      ) : (
        <div className="join-room">
          <p>Connecting...</p>
        </div>
      )}
      {isConnected && (
        <div className="control">
          <div className="left-control">
            <button className="btn" onClick={() => setMic((a) => !a)}>
              <i className={`i-microphone ${!micOn ? 'off' : ''}`} />
            </button>
            <button className="btn" onClick={() => setCamera((a) => !a)}>
              <i className={`i-camera ${!cameraOn ? 'off' : ''}`} />
            </button>
          </div>
          <button className={`btn btn-phone ${calling ? 'btn-phone-active' : ''}`} onClick={handleEndCall}>
            <i className="i-phone-hangup" />
          </button>
        </div>
      )}
      <Box p={4} mt={4} borderWidth="1px" borderRadius="md">
        <Heading size="md">Questions for the Interview</Heading>
        <VStack spacing={4} mt={4}>
          {questions.map((question, index) => (
            <Text key={index}>{index + 1}. {question}</Text>
          ))}
        </VStack>
      </Box>
    </div>
  );
};

export default InterviewerMeeting;
