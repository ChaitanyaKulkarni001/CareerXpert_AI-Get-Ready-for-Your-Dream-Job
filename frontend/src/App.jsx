import './App.css'
import Index from './Components/Index'
import AI_Interview from './Components/AI/AI_Interview'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NotFound from './Components/NotFound';
import ProtectedRoute from '../components/ProtectedRoute'
import Login from './Components/Logins/Login';
import SignUp from './Components/Logins/SignUp';
import Layout from './Components/Layout/Layout';

function App() {


  return (

    <Router>
    <Routes>
    <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
        <Route path="/practice" element={
          // <ProtectedRoute>
          //   <AI_Interview />
          // </ProtectedRoute>
          <AI_Interview />
        } />
        <Route path="/dashboard" element={
          // <ProtectedRoute>
          // </ProtectedRoute>
          <AI_Interview />
        } />
        <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
  </Router>
  )
}

export default App
