import { FaUpload, FaFilePdf, FaBrain, FaProjectDiagram, FaComments } from "react-icons/fa";

const steps = [
  {
    icon: <FaUpload size={35} />,
    title: "Upload"
  },
  {
    icon: <FaFilePdf size={35} />,
    title: "OCR & Parsing"
  },
  {
    icon: <FaBrain size={35} />,
    title: "AI Processing"
  },
  {
    icon: <FaProjectDiagram size={35} />,
    title: "Knowledge Graph"
  },
  {
    icon: <FaComments size={35} />,
    title: "Engineering Answers"
  }
];

function Workflow() {
  return (
    <section
      style={{
        background: "#07121f",
        padding: "100px 50px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "45px",
          marginBottom: "70px",
        }}
      >
        How INDUS MIND Works
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "25px",
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              minWidth: "180px",
              background: "#111827",
              borderRadius: "20px",
              padding: "35px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                color: "#38BDF8",
                marginBottom: "15px",
              }}
            >
              {step.icon}
            </div>

            <h3>{step.title}</h3>

            {index !== steps.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  right: "-22px",
                  top: "45%",
                  color: "#38BDF8",
                  fontSize: "28px",
                }}
              >
                ➜
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workflow;