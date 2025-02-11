import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import { AuthProvider } from "./AuthContext/AuthContext.jsx";
import "./App.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; Group 11. Rishab Pangal, Anish Laddha, Shrijan Swaminathan</p>
    </footer>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
