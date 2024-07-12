import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import Quiz from "./components/Quiz";
import InterviewerMeeting from './components/InterviewerMeeting';
import IntervieweeMeeting from './components/IntervieweeMeeting';
import Dashboard from "./components/Dashboard";
import JoinMeeting from './components/JoinMeeting';
import FormPage from './components/FormPage';
import CertificatePage from './components/CertificatePage';


const App = () => {
  // const [showQuiz, setShowQuiz] = useState(false);

  // const handleSchedulerFinish = () => {
  //   setShowQuiz(true);
  // };

  return (
    <ChakraProvider>
      <Router>
        <Box p={5}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/join-meeting" element={<JoinMeeting />} />
            <Route path="/meeting/interviewer" element={<InterviewerMeeting />} />
            <Route path="/meeting/interviewee" element={<IntervieweeMeeting />} />
            <Route path="/dashboard/form" element={<FormPage />} />
          <Route path="/dashboard/certificate" element={<CertificatePage />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
