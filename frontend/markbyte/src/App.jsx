import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import BloggerHome from "./BloggerHome/BloggerHome";
import { useAuth } from "./AuthContext/AuthContext";
import "./App.css";

// function Footer() {
//   return (
//     <footer className="footer">
//       <p>&copy; Group 11. Rishab Pangal, Anish Laddha, Shrijan Swaminathan</p>
//     </footer>
//   );
// }
function App() {
  const { isAuthenticated } = useAuth();
  return (
      <Router>
        <div className="app-container">
          <div className="content">
            <Routes>
              <Route path="/" element={isAuthenticated ? <BloggerHome /> : <Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
