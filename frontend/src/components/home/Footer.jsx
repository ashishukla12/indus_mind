import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        background: "#020617",
        padding: "50px",
        color: "#CBD5E1",
        textAlign: "center",
        borderTop: "1px solid #1E293B",
      }}
    >
      <h2
        style={{
          color: "#38BDF8",
        }}
      >
        INDUS MIND
      </h2>

      <p
        style={{
          marginTop: "15px",
          maxWidth: "700px",
          marginInline: "auto",
          lineHeight: "28px",
        }}
      >
        Empowering industrial engineers with AI-powered document intelligence,
        semantic search, and knowledge management.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "25px",
        }}
      >
        <FaGithub size={24} />
        <FaLinkedin size={24} />
        <FaEnvelope size={24} />
      </div>

      <hr
        style={{
          margin: "30px auto",
          borderColor: "#1E293B",
          width: "80%",
        }}
      />

      <p>
        © 2026 INDUS MIND • ET AI Hackathon Project
      </p>
    </footer>
  );
}

export default Footer;