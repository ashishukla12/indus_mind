import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 80px",
        position: "fixed",
        width: "100%",
        background: "rgba(2,6,23,.75)",
        backdropFilter: "blur(12px)",
        zIndex: 100,
      }}
    >
      <h2
        style={{
          color: "#38BDF8",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        INDUS MIND
      </h2>

      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <a
        href="#about"
        style={linkStyle}
        onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about").scrollIntoView({
            behavior: "smooth",
            });
        }}
        >
          About
        </a>

        <a href="#features" style={linkStyle}>
          Features
        </a>

        <a href="#team" style={linkStyle}>
          Team
        </a>

        <Link to="/login">
          <button style={buttonStyle}>Sign In</button>
        </Link>
      </div>
    </motion.nav>
  );
}

const linkStyle = {
  color: "#E2E8F0",
  textDecoration: "none",
  fontSize: "16px",
};

const buttonStyle = {
  background: "#2563EB",
  color: "white",
  padding: "12px 22px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

export default Navbar;