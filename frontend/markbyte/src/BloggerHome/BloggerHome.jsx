import styles from "./BloggerHome.module.css";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useMediaQuery } from "@mui/material";
import { useAuth } from "../AuthContext/AuthContext";
import { useState, useRef, useEffect } from "react";
import blogdata1 from "../data/blogdata1.json";
import { Modal, Box, Typography, Button } from "@mui/material";
import { FaFileUpload, FaPenAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IconButton } from "@mui/material";
import axios from "axios";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columns = [
  {
    accessorKey: "title",
    header: "Blog Name",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue());
      return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
    },
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ getValue }) => (
      <a href={getValue()} target="_blank" rel="noopener noreferrer">
        View
      </a>
    ),
  },
  {
    accessorKey: "version",
    header: "Version",
    cell: ({ row }) => (
      <select
        defaultValue={row.original.latestVersion}
        className="w-full px-2 py-1 border rounded-lg"
      >
        {Array.isArray(row.original.version) ? (
          row.original.version.map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))
        ) : (
          <option value={row.original.version}>{row.original.version}</option>
        )}
      </select>
    ),
  },
  {
    accessorKey: "publishStatus",
    header: "Publish Status",
    // this needs to be configured such that if a version in the dropdown is selected, a publish button is shown
    cell: ({ getValue }) => (getValue() ? "Published" : "Draft"),
  },
];

function BloggerHome() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setData([...blogdata1]);
    }, 50);
  }, []);

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:470px)");
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
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
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        setTimeout(() => {
          document.querySelector(".loadingScreen")?.classList.add("fade-out");
          setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => {
              window.open(
                `http://localhost:8080/static/${fileName.split(".")[0]}.html`,
                "_blank"
              );
            }, 1000); // Add a 2-second delay before opening the URL
          }, 2000);
        }, 2000);
        setIsOpen(false);
      })
      .finally(() => {
        handleRemoveFile();
      });
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.BloggerHome}>
      <header className={styles.header2}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <img
            src="src/assets/markbytealt.png"
            alt="MarkByte Logo"
            className={styles.pageLogo2}
          />
          {!isSmallScreen && (
            <span className={styles.logoText2}>arkByte | Dashboard</span>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <button className={`${styles.loginButton} relative`} onClick={logout}>
            Logout &nbsp;
            <CiLogout />
          </button>
        </div>
      </header>
      <div className="welcome-card bg-white p-6 rounded-lg shadow-lg max-w-sm ml-8 mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Hello, {user.name}.
        </h2>
        <p className="text-lg text-gray-600">Ready to start writing? ✍️</p>
        <button
          className="bg-[#084464] text-white px-6 py-3 rounded-lg mt-4 hover:bg-[#0a5a7c] transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
          onClick={() => setIsOpen(true)}
        >
          <span className="flex items-center space-x-2">
            <FaRegPenToSquare />
            <span>Start Writing</span>
          </span>
        </button>
      </div>
      <h1 className="text-2xl font-semibold text-[#003b5c] ml-8 mt-12">
        My Blogs
      </h1>
      <hr className="mt-2 mx-8 border-t border-gray-300" />
      <div className="mt-8 mx-8">
        <table className="table-auto w-full border-collapse border rounded-lg shadow-lg">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-4 py-2 bg-[#003b5c] text-white font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border border-gray-300 hover:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && (
        <div className={styles.loadingScreen}>
          <FaPenAlt className={styles.loadingIcon} />
          <p className={styles.loadingText}>Uploading...</p>
        </div>
      )}
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

export default BloggerHome;
