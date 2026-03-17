import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/meetings`,
        );
        const data = await response.json();
        setMeetings(data["All Meetings"]);
      } catch (err) {
        setError("Could not load meetings. Is the backend running?");
      } finally {
        setLoading(false);
      }
    }
    fetchMeetings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">Meeting History</h1>
        <p className="text-gray-400 mb-8">
          All your past meetings in one place.
        </p>

        {/* Loading */}
        {loading && <p className="text-gray-400">Loading meetings...</p>}

        {/* Error */}
        {error && <p className="text-red-400">{error}</p>}

        {/* Empty state */}
        {!loading && !error && meetings.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No meetings yet</p>
            <p className="text-sm mt-2">
              Upload your first meeting to get started
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Upload Meeting
            </button>
          </div>
        )}

        {/* Meetings List */}
        {!loading && !error && meetings.length > 0 && (
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                onClick={() => navigate(`/meetings/${meeting.id}`)}
                className="bg-gray-900 rounded-xl p-6 cursor-pointer hover:bg-gray-800 transition-colors border border-gray-800 hover:border-gray-600"
              >
                {/* Meeting ID + badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500 font-mono">
                    Meeting #{meeting.id}
                  </span>
                  <div className="flex gap-2">
                    <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full">
                      {meeting.action_items.length} action items
                    </span>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">
                      {meeting.decisions.length} decisions
                    </span>
                  </div>
                </div>

                {/* Summary preview */}
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                  {meeting.summary}
                </p>

                {/* Arrow */}
                <p className="text-gray-600 text-sm mt-3">
                  Click to view full details →
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
