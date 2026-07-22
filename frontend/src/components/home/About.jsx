import { motion } from "framer-motion";
import { FaBrain, FaSearch, FaProjectDiagram } from "react-icons/fa";

function About() {
  return (
    <section
      id="about"
      style={{
        padding: "100px 80px",
        background: "#020617",
        color: "white",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        style={{
          textAlign: "center",
          fontSize: "48px",
          marginBottom: "50px",
        }}
      >
        About INDUS MIND
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: .2 }}
        style={{
          maxWidth: "950px",
          margin: "auto",
          textAlign: "center",
          fontSize: "20px",
          lineHeight: "36px",
          color: "#CBD5E1",
        }}
      >
        <strong style={{ color: "#38BDF8" }}>
          INDUS MIND
        </strong>{" "}
        is an AI-powered Industrial Operating Intelligence Platform
        developed to transform refinery and petrochemical documents
        into actionable engineering knowledge.
        The platform combines OCR, Retrieval-Augmented Generation (RAG),
        Knowledge Graphs, Semantic Search, and Large Language Models
        to help engineers search documents, troubleshoot equipment,
        improve maintenance decisions, and accelerate operational excellence.
      </motion.p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "35px",
          marginTop: "70px",
        }}
      >
        {[
          {
            icon: <FaBrain size={45} />,
            title: "AI Intelligence",
            text: "LLM + RAG powered engineering assistant."
          },
          {
            icon: <FaSearch size={45} />,
            title: "Semantic Search",
            text: "Find engineering knowledge instantly."
          },
          {
            icon: <FaProjectDiagram size={45} />,
            title: "Knowledge Graph",
            text: "Connect equipment, standards and documents."
          },
        ].map((item, index) => (
          <motion.div
            whileHover={{ y: -10 }}
            key={index}
            style={{
              width: "300px",
              background: "#111827",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#38BDF8",
                marginBottom: "18px",
              }}
            >
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p
              style={{
                color: "#CBD5E1",
                marginTop: "12px",
              }}
            >
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default About;