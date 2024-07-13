// src/components/IntervieweeMeeting.tsx
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
} from '@chakra-ui/react';
import '../styles.css';

const IntervieweeMeeting = () => {
  const [calling, setCalling] = useState(true);
  const isConnected = useIsConnected();
  const appId = '31a0fa9377994261a17bc848c5628e4c';
  const channel = 'Meeting';
  const token = '007eJxTYLjs8ulcV37gmnSHQ+92ax27tUl/z86DISu18tYdL2q1+5SuwGBsmGiQlmhpbG5uaWliZGaYaGielGxhYpFsamZkkWqSnPFzYlpDICMDm0UcIyMDBIL47Ay+qaklmXnpDAwAeDIiQQ==';
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
    navigate('/dashboard/form', { state: { role: 'Interviewee', interviewType } });
  };

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
        </Flex>
      ) : (
        <Box textAlign="center">
          <Heading size="lg">Connecting...</Heading>
        </Box>
      )}
    </Box>
  );
};

export default IntervieweeMeeting;
