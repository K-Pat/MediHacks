import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import Quiz from "./components/Quiz";
import Dashboard from "./components/Dashboard";
import JoinMeeting from './components/JoinMeeting';
import Meeting from "./components/Meeting"; // The newly created meeting component

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
            <Route path="/dashboard" element={<Dashboard onFinish={() => console.log('Finished')} />} />
            <Route path="/join-meeting" element={<JoinMeeting />} />
          <Route path="/meeting/interviewer" element={<Meeting />} />
          <Route path="/meeting/interviewee" element={<Meeting />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
