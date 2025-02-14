import { Modal, Box, Typography, Button } from "@mui/material";
import { FaFileUpload } from "react-icons/fa";
import { IconButton } from "@mui/material";
function UploadModal(
  isOpen,
  setIsOpen,
  setFileName,
  fileInputRef,
  handleIconButtonClick,
  handleFileChange,
  handleRemoveFile,
  handleUploadFile
) {
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
  return (
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
  );
}
export default UploadModal;
