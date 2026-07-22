import { useEffect, useState } from "react";
import { FileText, Search, Eye, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { fetchDocuments } from "../../api/client";
import DocumentDetailModal from "./DocumentDetailModal";
import EmptyState from "../common/EmptyState";
import { useToast } from "../common/Toast";

export default function DocumentsPage() {

  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const showToast = useToast();
  const navigate = useNavigate();

  const loadDocuments = async () => {

    try {

      setLoading(true);

      const res = await fetchDocuments();

      setDocs(Array.isArray(res) ? res : (res.documents || []));

    } catch (err) {

      showToast("Failed to load documents", "error");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadDocuments();

  }, []);

  const filtered = docs.filter((doc) => {

    const name = doc.name || doc.filename || "";

    return name.toLowerCase().includes(search.toLowerCase());

  });

  if (loading) {

    return (

      <div className="p-6">

        Loading documents...

      </div>

    );

  }

  return (

    <div className="p-6">

      <div className="relative max-w-sm mb-5">

        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search documents..."
          className="w-full bg-panel border border-line rounded-md pl-8 pr-3 py-2 text-sm"
        />

      </div>

      {

        filtered.length === 0 ?

        (

          <EmptyState
            type="empty"
            title="No uploaded documents"
            subtitle="Upload a PDF to see it here."
          />

        )

        :

        (

          <div className="border border-line rounded-lg overflow-hidden">

            <table className="w-full text-sm">

              <thead>

                <tr className="bg-panel-2">

                  <th className="px-4 py-3 text-left">
                    Document
                  </th>

                  <th className="px-4 py-3 text-left">
                    Type
                  </th>

                  <th className="px-4 py-3 text-left">
                    Size
                  </th>

                  <th className="px-4 py-3 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  filtered.map((doc) => (

                    <tr
                      key={doc.id}
                      className="border-t border-line hover:bg-panel-2"
                    >

                      <td className="px-4 py-3">

                        <div className="flex items-center gap-2">

                          <FileText size={15} />

                          {doc.name}

                        </div>

                      </td>

                      <td className="px-4 py-3">

                        {doc.type}

                      </td>

                      <td className="px-4 py-3">

                        {doc.size_kb} KB

                      </td>

                      <td className="px-4 py-3">

                        <div className="flex justify-center gap-2">

                          <button

                            onClick={() => setSelectedDoc(doc)}

                            className="px-3 py-1 rounded border border-line bg-panel hover:border-steel transition flex items-center gap-1"

                          >

                            <Eye size={14} />

                            View

                          </button>

                          <button

                            onClick={() =>
                              navigate(
                                `/analysis?file=${encodeURIComponent(doc.name)}`
                              )
                            }

                            className="px-3 py-1 rounded bg-signal text-black hover:opacity-90 transition flex items-center gap-1"

                          >

                            <Brain size={14} />

                            Analyze

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          </div>

        )

      }

      <DocumentDetailModal
        doc={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />

    </div>

  );

}