import { motion } from "framer-motion";
import {
  FaSearch,
  FaFileAlt,
  FaProjectDiagram,
  FaRobot,
  FaTools,
  FaChartLine,
  FaDatabase,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaSearch size={38} />,
    title: "AI Semantic Search",
    desc: "Find engineering knowledge instantly using natural language."
  },
  {
    icon: <FaFileAlt size={38} />,
    title: "OCR Document Intelligence",
    desc: "Extract text and metadata from engineering drawings and manuals."
  },
  {
    icon: <FaProjectDiagram size={38} />,
    title: "Knowledge Graph",
    desc: "Connect assets, documents, vendors, and standards."
  },
  {
    icon: <FaRobot size={38} />,
    title: "Engineering Copilot",
    desc: "Ask AI questions about your refinery documentation."
  },
  {
    icon: <FaTools size={38} />,
    title: "Predictive Maintenance",
    desc: "Use historical maintenance records to predict failures."
  },
  {
    icon: <FaChartLine size={38} />,
    title: "Analytics",
    desc: "Visualize equipment health and document usage."
  },
  {
    icon: <FaDatabase size={38} />,
    title: "Document Repository",
    desc: "Centralized storage for engineering knowledge."
  },
  {
    icon: <FaShieldAlt size={38} />,
    title: "Compliance Tracking",
    desc: "Monitor API, ISO, OSHA and OISD compliance."
  }
];

function Features() {
  return (
    <section
      id="features"
      style={{
        padding: "100px 70px",
        background: "#07121f",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "45px",
          marginBottom: "60px",
        }}
      >
        Platform Features
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "30px",
        }}
      >
        {features.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              y: -10,
            }}
            style={{
              background:"rgba(17,24,39,.6)",
              backdropFilter:"blur(18px)",
              border:"1px solid rgba(255,255,255,.08)",
              boxShadow:"0 0 25px rgba(37,99,235,.2)",
              borderRadius: "18px",
              padding: "30px",
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <div style={{ color: "#38BDF8" }}>{item.icon}</div>

            <h3
              style={{
                marginTop: "25px",
                fontSize: "24px",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#CBD5E1",
                marginTop: "15px",
                lineHeight: "28px",
              }}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;