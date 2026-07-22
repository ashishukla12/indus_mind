import { useEffect, useState } from "react";
import { FileText, Search } from "lucide-react";
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

  const loadDocuments = async () => {

    try {

      setLoading(true);

      const res = await fetchDocuments();

      setDocs(res.documents || []);

    } catch (err) {

      showToast("Failed to load documents", "error");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadDocuments();

  }, []);

  const filtered = docs.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="p-6">
        Loading documents...
      </div>
    );

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

                  <th className="px-4 py-3 text-left">Document</th>

                  <th className="px-4 py-3 text-left">Type</th>

                  <th className="px-4 py-3 text-left">Size</th>

                </tr>

              </thead>

              <tbody>

                {

                  filtered.map((doc)=>(

                    <tr

                      key={doc.id}

                      onClick={()=>setSelectedDoc(doc)}

                      className="border-t border-line hover:bg-panel-2 cursor-pointer"

                    >

                      <td className="px-4 py-3 flex items-center gap-2">

                        <FileText size={15}/>

                        {doc.name}

                      </td>

                      <td className="px-4 py-3">

                        {doc.type}

                      </td>

                      <td className="px-4 py-3">

                        {doc.size_kb} KB

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

        onClose={()=>setSelectedDoc(null)}

      />

    </div>

  );

}