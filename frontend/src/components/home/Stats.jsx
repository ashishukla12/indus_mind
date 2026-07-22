function Stats() {
  return (
    <section
      style={{
        padding: "80px 20px",
        background: "#0f172a",
        color: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "40px",
          marginBottom: "40px",
        }}
      >
        Platform Statistics
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {[
          { number: "1500+", label: "Documents" },
          { number: "250+", label: "Assets" },
          { number: "65+", label: "Standards" },
          { number: "99%", label: "Search Accuracy" },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              width: "220px",
              background: "#111827",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                color: "#38BDF8",
                fontSize: "42px",
                marginBottom: "10px",
              }}
            >
              {item.number}
            </h1>

            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;