import { useState } from "react";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleUpload() {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/meetings/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      setResult(data["Uploaded File"]);
    } catch (err) {
      setError("Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Upload Meeting</h1>
        <p className="text-gray-400 mb-8">
          Upload an audio recording and Debrief will extract the summary, action
          items, and decisions.
        </p>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-700 rounded-xl p-10 text-center mb-6 hover:border-gray-500 transition-colors">
          <p className="text-gray-400 mb-4">Select an audio or video file</p>
          <input
            type="file"
            accept="audio/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-gray-300"
          />
          {file && (
            <p className="text-green-400 mt-3 text-sm">Selected: {file.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? "Analyzing..." : "Analyze Meeting"}
        </button>

        {/* Error */}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {/* Results */}
        {result && (
          <div className="mt-10 space-y-6">
            {/* Summary */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-400">
                Summary
              </h2>
              <p className="text-gray-300 leading-relaxed">{result.summary}</p>
            </div>

            {/* Action Items */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-400">
                Action Items
              </h2>
              {result.action_items.length === 0 ? (
                <p className="text-gray-500">No action items found</p>
              ) : (
                <ul className="space-y-3">
                  {result.action_items.map((item, index) => (
                    <li
                      key={index}
                      className="flex flex-col bg-gray-800 rounded-lg p-4"
                    >
                      <span className="text-white font-medium">
                        {item.task}
                      </span>
                      <span className="text-gray-400 text-sm mt-1">
                        Owner: {item.owner || "Unassigned"} · Deadline:{" "}
                        {item.deadline || "Not specified"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Decisions */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-400">
                Decisions
              </h2>
              {result.decisions.length === 0 ? (
                <p className="text-gray-500">No decisions recorded</p>
              ) : (
                <ul className="space-y-2">
                  {result.decisions.map((decision, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-300"
                    >
                      <span className="text-blue-400 mt-1">→</span>
                      {decision}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Follow Up Questions */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-400">
                Follow Up Questions
              </h2>
              {result.follow_up_questions.length === 0 ? (
                <p className="text-gray-500">No follow up questions</p>
              ) : (
                <ul className="space-y-2">
                  {result.follow_up_questions.map((question, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-300"
                    >
                      <span className="text-yellow-400 mt-1">?</span>
                      {question}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
