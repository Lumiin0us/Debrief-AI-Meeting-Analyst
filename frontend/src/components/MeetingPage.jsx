import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MeetingPage() {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeeting() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/meetings/${meetingId}`,
        );
        const data = await response.json();
        setMeeting(data["meeting"]);
      } catch (err) {
        setError("Could not load meeting.");
      } finally {
        setLoading(false);
      }
    }
    fetchMeeting();
  }, [meetingId]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/history")}
          className="text-gray-400 hover:text-white text-sm mb-6 inline-block transition-colors"
        >
          ← Back to History
        </button>

        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {meeting && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Meeting #{meeting.id}</h1>

            {/* Summary */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-400">
                Summary
              </h2>
              <p className="text-gray-300 leading-relaxed">{meeting.summary}</p>
            </div>

            {/* Action Items */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-400">
                Action Items
              </h2>
              {meeting.action_items.length === 0 ? (
                <p className="text-gray-500">No action items found</p>
              ) : (
                <ul className="space-y-3">
                  {meeting.action_items.map((item, index) => (
                    <li key={index} className="bg-gray-800 rounded-lg p-4">
                      <span className="text-white font-medium">
                        {item.task}
                      </span>
                      <span className="text-gray-400 text-sm mt-1 block">
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
              {meeting.decisions.length === 0 ? (
                <p className="text-gray-500">No decisions recorded</p>
              ) : (
                <ul className="space-y-2">
                  {meeting.decisions.map((decision, index) => (
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
              {meeting.follow_up_questions.length === 0 ? (
                <p className="text-gray-500">No follow up questions</p>
              ) : (
                <ul className="space-y-2">
                  {meeting.follow_up_questions.map((question, index) => (
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

export default MeetingPage;
