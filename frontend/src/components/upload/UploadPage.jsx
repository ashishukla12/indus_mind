import { useState, useCallback } from "react";
import { UploadCloud, CheckCircle2, FileText } from "lucide-react";
import { uploadDocument } from "../../api/client";
import { useToast } from "../common/Toast";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {

  const [queue, setQueue] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const showToast = useToast();
  const navigate = useNavigate();

  const handleFiles = useCallback(async (fileList) => {

    const files = Array.from(fileList);

    const uploadItems = files.map(file => ({
      name: file.name,
      status: "uploading"
    }));

    setQueue(prev => [...uploadItems, ...prev]);

    for (const file of files) {

      try {

        await uploadDocument(file);

        setQueue(prev =>
          prev.map(item =>
            item.name === file.name
              ? { ...item, status: "completed" }
              : item
          )
        );

        showToast(`${file.name} uploaded successfully`, "success");

      } catch (err) {

        console.error(err);

        setQueue(prev =>
          prev.map(item =>
            item.name === file.name
              ? { ...item, status: "failed" }
              : item
          )
        );

        showToast(`${file.name} upload failed`, "error");
      }

    }

  }, [showToast]);

  return (

    <div className="p-6">

      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
          dragActive
            ? "border-signal bg-signal/5"
            : "border-line bg-panel"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {

          e.preventDefault();

          setDragActive(false);

          if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
          }

        }}
      >

        <UploadCloud
          size={42}
          className="mx-auto text-muted mb-4"
        />

        <h2 className="text-lg font-semibold mb-2">
          Upload Industrial Documents
        </h2>

        <p className="text-sm text-muted mb-5">
          Upload PDF manuals, SOPs, inspection reports,
          maintenance logs and technical documents.
        </p>

        <label className="inline-flex items-center px-5 py-3 rounded-md bg-signal text-black font-medium cursor-pointer hover:opacity-90">

          Browse Files

          <input
            hidden
            multiple
            type="file"
            accept=".pdf"
            onChange={(e) =>
              e.target.files &&
              handleFiles(e.target.files)
            }
          />

        </label>

      </div>

      {

        queue.length > 0 && (

          <div className="mt-8 border border-line rounded-lg overflow-hidden">

            {

              queue.map((file, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-3 border-b border-line"
                >

                  <div className="flex items-center gap-2">

                    <FileText size={16} />

                    <span>{file.name}</span>

                  </div>

                  {

                    file.status === "uploading" && (

                      <span className="text-yellow-500 text-sm">
                        Uploading...
                      </span>

                    )

                  }

                  {

                    file.status === "completed" && (

                      <span className="flex items-center gap-2 text-green-500">

                        <CheckCircle2 size={16} />

                        Indexed

                      </span>

                    )

                  }

                  {

                    file.status === "failed" && (

                      <span className="text-red-500">

                        Failed

                      </span>

                    )

                  }

                </div>

              ))

            }

          </div>

        )

      }

      {

        queue.some(f => f.status === "completed") && (

          <div className="mt-6">

            <button

              onClick={() => navigate("/documents")}

              className="px-5 py-3 rounded-md bg-signal text-black font-medium"

            >

              View Uploaded Documents

            </button>

          </div>

        )

      }

    </div>

  );

}