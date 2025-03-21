import React, { useState } from "react";

const Dashboard = () => {
  const [history] = useState([
    {
      title: "Mock Interview - Software Engineer",
      date: "2025-02-15",
      duration: "30 minutes",
      score: 85,
      status: "Completed",
      feedback: "Good performance, needs improvement in system design."
    },
    {
      title: "JavaScript Quiz",
      date: "2025-02-14",
      duration: "15 minutes",
      score: 90,
      status: "Completed"
    },
    {
      title: "DSA Practice Interview",
      date: "2025-02-13",
      duration: "45 minutes",
      status: "Completed",
      feedback: "Improve time complexity analysis."
    },
    {
      title: "Backend Developer Interview",
      date: "2025-02-12",
      duration: "40 minutes",
      score: 78,
      status: "Completed",
      feedback: "Strong database knowledge but needs better API optimization."
    }
  ]);

  return (
    <div className="flex h-screen bg-gray-100 p-6">
      <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">📜 Activity History</h2>

        {history.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {history.map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md transition-all hover:scale-[1.02]"
              >
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  📅 {item.date} | ⏳ {item.duration}
                </p>
                <p
                  className={`mt-2 font-medium ${item.status === "Completed" ? "text-green-600" : "text-red-600"
                    }`}
                >
                  ✅ Status: {item.status}
                </p>
                {item.score !== undefined && (
                  <p className="mt-1 text-gray-800">
                    🎯 Score: <span className="font-semibold">{item.score}</span>
                  </p>
                )}
                {item.feedback && (
                  <p className="italic text-gray-700 mt-2">💬 Feedback: {item.feedback}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg text-center mt-10">No history available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
