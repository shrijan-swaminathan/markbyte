import "./Home.css";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useState, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import { PiScribbleThin } from "react-icons/pi";
import { FaPenAlt } from "react-icons/fa";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    const token = localStorage.getItem("token");
    formData.append("file", file);

    axios
      .post("http://localhost:8080/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);

        // Handle fade-out animation after a successful upload
        setTimeout(() => {
          document.querySelector(".loading-screen")?.classList.add("fade-out");
          setTimeout(() => {
            setIsLoading(false);
            // Open the link to the hosted site after the upload completes
            window.open(
              `http://localhost:8080/static/${fileName.split(".")[0]}.html`,
              "_blank",
              "noopener,noreferrer"
            );
          }, 500);
        }, 4000);

        // Close modal after upload
        setIsOpen(false);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        // Cleanup
        handleRemoveFile();
      });
  };

  const handleHomeUpload = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const isSmallScreen = useMediaQuery("(max-width:470px)");
  const isSmallScreen2 = useMediaQuery("(min-width:611px)");

  return (
    <div className="App relative bg-[#011A29] text-white overflow-hidden">
      <div className="absolute left-1/4 top-1/4 h-[500px] w-[400px] -rotate-100 rounded-[150px] bg-blue-500 opacity-25 blur-[150px] z-0"></div>
      <div className="absolute left-[-15%] top-1/6 h-[450px] w-[350px] -rotate-15 rounded-[120px] bg-blue-500 opacity-20 blur-[130px] z-0"></div>
      <div className="absolute right-[-10%] bottom-1/4 h-[550px] w-[450px] rotate-40 rounded-[130px] bg-blue-500 opacity-15 blur-[140px] z-0"></div>
      <div className="absolute left-1/3 top-0 h-[200px] w-[300px] rotate-20 rounded-[100px] bg-blue-500 opacity-10 blur-[120px] z-0"></div>
      <header className="header">
        <div className="logo-container" onClick={() => navigate("/")}>
          <img
            src="src/assets/markbytealt.png"
            alt="MarkByte Logo"
            className="page-logo-2"
          />
          {!isSmallScreen && <span className="logo-text">arkByte</span>}
        </div>
        <div className="header-links space-x-12 ml-14">
          <a
            href="/"
            className="relative text-white after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full text-lg"
          >
            Home
          </a>
          <a
            href="#"
            className="relative text-white after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full text-lg"
          >
            About
          </a>
        </div>
        <div style={{ display: "flex" }}>
          {!isAuthenticated ? (
            <>
              <button
                className="login-button relative"
                onClick={() => navigate("/login")}
              >
                Login &nbsp;
                <CiLogin />
              </button>
              <button
                className="signup-button relative"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <button className="login-button relative" onClick={logout}>
              Logout &nbsp;
              <CiLogout />
            </button>
          )}
        </div>
      </header>
      {isLoading && (
        <div className="loading-screen">
          <FaPenAlt className="loading-icon" />
          <p className="loading-text">Uploading...</p>
        </div>
      )}
      <section className="text-white py-32 mt-32 z-20">
        <div className="container mx-auto px-4 z-20">
          <div className="max-w-3xl mx-auto text-center z-10">
            <div className="relative">
              <h1 className="text-5xl font-bold mb-4 leading-tight z-10">
                Welcome to MarkByte.
              </h1>
              {isSmallScreen2 && <img
                src="src/assets/pen.png"
                alt="Pen"
                className="absolute -top-[200%] left-[46%] transform -translate-x-1/2 z-20 w-40 h-40"
              />}
            </div>
            <p className="tagline text-xl mb-8 text-gray-200">
              Where your thoughts find their digital home
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="animate-lift">
                <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-[10px] w-fit h-[43px] mx-auto shadow-xl">
                  <a
                    href="#"
                    onClick={() => handleHomeUpload()}
                    className="bg-white text-[#084464] font-semibold py-3 px-8 rounded-[10px] hover:bg-gray-100 transition duration-300 shadow-xl translate-y-0.5"
                  >
                    Upload Your First Blog&rarr;
                  </a>
                </div>
              </div>
              <div className="animate-lift">
                <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-[10px] w-fit h-[43px] mx-auto shadow-xl">
                  <a
                    href="#"
                    className="bg-white text-[#084464] font-semibold py-3 px-8 rounded-[10px] hover:bg-gray-100 transition duration-300 shadow-xl translate-y-0.5"
                  >
                    Start Reading &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div></div>
    </div>
  );
}
export default Home;
