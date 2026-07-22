import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const members = [
  {
    name: "Aryan",
    role: "Frontend Developer",
    desc: "Designed the user interface and integrated AI-powered features into the platform."
  },
  {
    name: "Ashish",
    role: "Backend Developer",
    desc: "Developed APIs, managed databases, and implemented document processing workflows."
  },
  {
    name: "Aditya",
    role: "AI Engineer",
    desc: "Built RAG pipelines, semantic search, and knowledge graph capabilities."
  }
];

function Team() {
  return (
    <section
      id="team"
      style={{
        padding: "100px 70px",
        background: "#07121f",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "48px",
          color: "white",
          marginBottom: "70px",
        }}
      >
        Meet Our Team
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "35px",
        }}
      >
        {members.map((member, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
            }}
            style={{
              width: "320px",
              background: "#111827",
              borderRadius: "22px",
              padding: "35px",
              color: "white",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                margin: "auto",
                background: "#2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              {member.name.charAt(0)}
            </div>

            <h2 style={{ marginTop: "20px" }}>
              {member.name}
            </h2>

            <h4
              style={{
                color: "#38BDF8",
              }}
            >
              {member.role}
            </h4>

            <p
              style={{
                color: "#CBD5E1",
                marginTop: "20px",
                lineHeight: "28px",
              }}
            >
              {member.desc}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "25px",
              }}
            >
              <FaGithub size={24} />
              <FaLinkedin size={24} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Team;