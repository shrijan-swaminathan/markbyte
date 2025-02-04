import "./Home.css";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useEffect, useState } from "react";
function Home() {
  // Replace this with username fetched from /login endpoint
  const navigate = useNavigate();
  const {isAuthenticated, user, logout} = useAuth()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const userName = user?.name || "";
  return (
    <div className="App">
      <header className="header">
        <div className="logo-container">
          <img
            src="src/assets/MarkByte Logo.jpg"
            alt="MarkByte Logo"
            className="page-logo-2"
          />
          {windowWidth > 470 && <span className="logo-text">arkByte</span>}
        </div>
        <div>
          {!isAuthenticated && (
            <button className="login-button" onClick={() => navigate("/login")}>
              Login &nbsp;
              <CiLogin />
            </button>
          )}
        </div>
        <div>
          {isAuthenticated && (
            <button
              className="login-button"
              onClick={logout}
            >
              Logout &nbsp;
              <CiLogout />
            </button>
          )}
        </div>
        <button className="signup-button" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to MarkByte</h1>
          <p className="tagline">Where your thoughts find their digital home</p>
        </div>
      </section>
      <div className="home-container">
        <section className="user-welcome">
          <div className="welcome-card">
            <div>
              {isAuthenticated && <h2>Hello, {userName}.</h2>}
              {isAuthenticated && <p>Ready to start writing? ✍️</p>}
            </div>
            <div>
                {!isAuthenticated && <h2>Create an account or log in to get started</h2>}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
