import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "100px 80px",
        background:
          "linear-gradient(135deg,#020617 0%,#0F172A 45%,#1E3A8A 100%)",
        overflow: "hidden",
        gap: "50px",
        flexWrap: "wrap",
      }}
    >
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          flex: 1,
          minWidth: "320px",
          maxWidth: "650px",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontSize: "68px",
            fontWeight: "800",
            lineHeight: "1.1",
            color: "#FFFFFF",
            marginBottom: "20px",
          }}
        >
          INDUS MIND
        </motion.h1>

        <div
          style={{
            color: "#38BDF8",
            fontSize: "30px",
            fontWeight: "600",
            minHeight: "45px",
            marginBottom: "25px",
          }}
        >
          <Typewriter
            words={[
              "AI Operating Intelligence Platform",
              "AI Engineering Copilot",
              "Semantic Search for Refineries",
              "Knowledge Graph Intelligence",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
          />
        </div>

        <p
          style={{
            color: "#CBD5E1",
            fontSize: "19px",
            lineHeight: "34px",
            marginBottom: "40px",
          }}
        >
          Transform refinery documents into actionable engineering
          intelligence using OCR, Semantic Search, Knowledge Graphs,
          Retrieval-Augmented Generation (RAG), and AI-powered
          Engineering Copilot.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/login">
            <button style={primaryBtn}>
              Get Started
            </button>
          </Link>

          <button style={secondaryBtn}>
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, -12, 0],
        }}
        transition={{
          opacity: { duration: 0.8 },
          x: { duration: 0.8 },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          minWidth: "320px",
        }}
      >
        <img
          src="/images/refinery.png"
          alt="INDUS MIND"
          style={{
            width: "100%",
            maxWidth: "620px",
            filter:
              "drop-shadow(0px 0px 40px rgba(56,189,248,0.45))",
          }}
        />
      </motion.div>
    </section>
  );
}

const primaryBtn = {
  padding: "16px 36px",
  background: "linear-gradient(135deg,#2563EB,#38BDF8)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "600",
  boxShadow: "0 0 25px rgba(37,99,235,.45)",
  transition: "all .3s ease",
};

const secondaryBtn = {
  padding: "16px 36px",
  background: "transparent",
  color: "#38BDF8",
  border: "2px solid #38BDF8",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "600",
  transition: "all .3s ease",
};

export default Hero;