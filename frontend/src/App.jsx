import './App.css'
import Index from './Components/Index'
import AI_Interview from './Components/AI/AI_Interview'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NotFound from './Components/NotFound';
import ProtectedRoute from '../components/ProtectedRoute'
import Login from './Components/Logins/Login';
import SignUp from './Components/Logins/SignUp';

function App() {


  return (

    <Router>    
    <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/practice" element={
          // <ProtectedRoute>
          //   <AI_Interview />
          // </ProtectedRoute>
          <AI_Interview />
        } />
        <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
  )
}

export default App
