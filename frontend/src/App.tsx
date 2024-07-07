import { ChakraProvider } from '@chakra-ui/react'
import InterviewScheduler from './components/InterviewScheduler';
import './App.css'

function App() {

  return (
    <ChakraProvider>
      <InterviewScheduler />
    </ChakraProvider>
  )
}

export default App
