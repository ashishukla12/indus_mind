import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAnalysis } from "../api/client";

export default function AnalysisPage() {

  const [searchParams] = useSearchParams();
  const filename = searchParams.get("file");

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!filename) return;

    fetchAnalysis(filename)
      .then(setAnalysis)
      .finally(() => setLoading(false));

  }, [filename]);

  if (loading)
    return <div className="p-6">Loading...</div>;

  if (!analysis)
    return <div className="p-6">Analysis not found.</div>;

  return (

    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        {filename}
      </h1>

      <section className="border rounded-lg p-5">
        <h2 className="font-semibold mb-3">
          Summary
        </h2>

        <div className="whitespace-pre-wrap">
          {analysis.summary}
        </div>
      </section>

      <section className="border rounded-lg p-5">

        <h2 className="font-semibold mb-3">
          Metadata
        </h2>

        <pre>
          {JSON.stringify(analysis.metadata, null, 2)}
        </pre>

      </section>

      <section className="border rounded-lg p-5">

        <h2 className="font-semibold mb-3">
          Suggested Questions
        </h2>

        <ul className="list-disc pl-5">

          {analysis.suggested_questions.map((q, i) => (

            <li key={i}>{q}</li>

          ))}

        </ul>

      </section>

      <section className="border rounded-lg p-5">

        <h2 className="font-semibold mb-3">
          Knowledge Graph
        </h2>

        <p>
          Nodes :
          {" "}
          {analysis.knowledge_graph.nodes.length}
        </p>

        <p>
          Relationships :
          {" "}
          {analysis.knowledge_graph.relationships.length}
        </p>

      </section>

    </div>

  );

}