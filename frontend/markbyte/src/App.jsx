import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home/Home.jsx';
import Login from './Login/Login.jsx';
import SignUp from './SignUp/SignUp.jsx';
import { AuthProvider } from './AuthContext/AuthContext.jsx';

function App() {
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;