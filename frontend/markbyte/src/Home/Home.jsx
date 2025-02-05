import "./Home.css";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useEffect, useState, useRef } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { FaFileUpload } from "react-icons/fa";
import { IconButton } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #084464",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  width: "48%",
  height: "50%",
};
function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const handleIconButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
      setFileName(file.name);
    }
  };

  const handleRemoveFile = () => {
    setFileName(""); // Clear file name state
    fileInputRef.current.value = ""; // Clear file input
  };

  const handleUploadFile = () => {
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    // fetch JWT token from local storage
    const token = localStorage.getItem("token");
    formData.append("file", file);
    axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });
    setIsOpen(false);
    handleRemoveFile();
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const userName = user?.name || "";

  return (
    <div className="App">
      <header className="header">
        <div className="logo-container">
          <img
            src="src/assets/MarkByte Logo.jpg" // Make sure path is correct
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
            <button className="login-button" onClick={logout}>
              Logout &nbsp;
              <CiLogout />
            </button>
          )}
        </div>
        {!isAuthenticated && (
          <button className="signup-button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        )}
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
              {isAuthenticated && (
                <>
                  <h2>Hello, {userName}.</h2>
                  <p>Ready to start writing? ✍️</p>
                </>
              )}
            </div>

            <div>
              {!isAuthenticated && (
                <h2>Create an account or log in to get started</h2>
              )}
            </div>
            <div>
              {isAuthenticated && (
                <button className="post-button" onClick={() => setIsOpen(true)}>
                  Upload a Post
                </button>
              )}
            </div>
          </div>
        </section>
        <section className="discover">
          <div className="discover-container">
            <h1>Discover🔎</h1>
            <hr className="discover-hr"></hr>
          </div>
        </section>
      </div>

      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setFileName("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontFamily: "DM Sans",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "2.5rem",
              mb: 2,
            }} // Center title, add margin
          >
            Upload a Markdown File
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <IconButton
              aria-label="upload"
              sx={{ fontSize: "9rem", color: "#084464" }}
              onClick={handleIconButtonClick}
            >
              <FaFileUpload />
            </IconButton>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {!fileName && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, fontSize: "1rem", fontFamily: "DM Sans" }}
              >
                Select a file to upload
              </Typography>
            )}
            {fileName && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, fontSize: "1rem", fontFamily: "DM Sans" }}
              >
                {fileName}
              </Typography>
            )}
            {fileName && (
              <Button
                onClick={handleUploadFile}
                sx={{
                  mt: 1,
                  fontSize: "0.8rem",
                  fontFamily: "DM Sans",
                  bgcolor: "#084464",
                  color: "white",
                  borderRadius: "5px",
                  p: 1,
                }}
              >
                <Typography variant="body2">Upload File</Typography>
              </Button>
            )}
            {fileName && (
              <Button
                onClick={handleRemoveFile}
                sx={{
                  mt: 1,
                  fontSize: "0.8rem",
                  fontFamily: "DM Sans",
                  bgcolor: "red",
                  color: "white",
                  borderRadius: "5px",
                  p: 1,
                }}
              >
                <Typography variant="body2">Remove File</Typography>
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
export default Home;
