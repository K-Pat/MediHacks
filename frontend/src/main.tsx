// src/main.tsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

// In the video call scenario, set mode to "rtc"
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

root.render(
  <StrictMode>
    <AgoraRTCProvider client={client}>
      <App />
    </AgoraRTCProvider>
  </StrictMode>
);
