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
    </div>
  );
};

export default IntervieweeMeeting;
