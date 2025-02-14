import styles from "./BloggerHome.module.css";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useMediaQuery } from "@mui/material";
import { useAuth } from "../AuthContext/AuthContext";
function BloggerHome() {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:470px)");
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <div className={styles.BloggerHome}>
      <header className={styles.header2}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <img
            src="src/assets/markbytealt.png"
            alt="MarkByte Logo"
            className={styles.pageLogo2}
          />
          {!isSmallScreen && <span className={styles.logoText2}>arkByte</span>}
        </div>
        <div style={{ display: "flex" }}>
          <button className={`${styles.loginButton} relative`} onClick={logout}>
            Logout &nbsp;
            <CiLogout />
          </button>
        </div>
      </header>
    </div>
  );
}

export default BloggerHome;
