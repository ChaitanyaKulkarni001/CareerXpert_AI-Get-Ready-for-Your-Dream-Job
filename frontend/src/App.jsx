import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import About from './Components/About'
import AI_Interview from './Components/AI/AI_Interview'
import Index from './Components/Index'
import Login from './Components/Logins/Login'
import SignUp from './Components/Logins/SignUp'
import ProtectedRoute from '../components/ProtectedRoute'
import NotFound from './Components/NotFound'
import Form from './Components/Logins/Form'
import Dashboard from './Components/Dashboard/Dashboard'
import Layout from './Components/Layout/Layout'
import Follow_up_interview from './Components/AI/follow_up_interview';
import Specific_role_interview from './Components/AI/Specific_role_interview';
import OneMinuteQuestion from './Components/AI/Oneminutequestion';
import SituationalQuestions from './Components/AI/SituationalQuestions';
import MockInterview from './Components/AI/MockInterview';
import StartMockInterview from './Components/AI/StartMockInterview';
import MockInterviewFeedback from './Components/AI/MockInterviewFeedback';
import DashboardLayout from './Components/Dashboard/DashboardLayout';
import Quiz from './Components/QuizSection/Quiz';
import VideoCall from './Components/VideoCall/VideoCall';
import Contact from './Components/Pages/Contact';
import ResumeChecker from './Components/Resume/ResumeChecker';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import Trial from './Components/Trial';
import CodeQuiz from './Components/QuizSection/CodeQuiz';
import GroupDisccusion from './Components/GroupDisccusion/GroupDisccusion';
import History from './Components/History/History';
import Debate from './Components/VideoCall/Debate';
import Feature from './Components/Pages/Feature';

function Logout() {

  localStorage.clear()
  return <Navigate to='/' />
}
function RegisterAndLogout() {
  localStorage.clear()
  return <Login />
}

function App() {


  return (

    <Router>
      
      <Routes>
        <Route element={<Layout />}>

          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/trial" element={<Form />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/try" element={<Trial />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/feature" element={<Feature />} />
          

          <Route path="/about" element={
            // <ProtectedRoute>
              <About />
            // </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="practice-interview" element={<AI_Interview />} />
            <Route path="follow-up-interview" element={<Follow_up_interview />} />
            <Route path="specific-role-interview" element={<Specific_role_interview />} />
            <Route path="one-minute-question" element={<OneMinuteQuestion />} />
            <Route path="situation-based-questions" element={<SituationalQuestions />} />
            <Route path="mock-interview" element={<MockInterview />} />
            <Route path="mock-interview/start" element={<StartMockInterview />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="talkmate" element={<VideoCall />} />  {/* Video Call */}
            <Route path="resume-check" element={<ResumeChecker />} />  {/* Resume Check */}
            <Route path="coding-quiz" element={<CodeQuiz />} />  {/* Resume Check */}
            <Route path="group-discussion" element={<GroupDisccusion />} />  {/* Resume Check */}
            {/* History */}
            <Route path="history" element={<History />} />  
            {/* Debate */}
            <Route path="debate" element={<Debate />} />   

          </Route>
        </Route>

      </Routes>
      
    </Router>


  )
}

export default App
