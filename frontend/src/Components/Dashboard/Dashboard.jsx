// import React, { useState } from "react";

// const Dashboard = () => {
//   const [history] = useState([
//     {
//       title: "Mock Interview - Software Engineer",
//       date: "2025-02-15",
//       duration: "30 minutes",
//       score: 85,
//       status: "Completed",
//       feedback: "Good performance, needs improvement in system design."
//     },
//     {
//       title: "JavaScript Quiz",
//       date: "2025-02-14",
//       duration: "15 minutes",
//       score: 90,
//       status: "Completed"
//     },
//     {
//       title: "DSA Practice Interview",
//       date: "2025-02-13",
//       duration: "45 minutes",
//       status: "Completed",
//       feedback: "Improve time complexity analysis."
//     },
//     {
//       title: "Backend Developer Interview",
//       date: "2025-02-12",
//       duration: "40 minutes",
//       score: 78,
//       status: "Completed",
//       feedback: "Strong database knowledge but needs better API optimization."
//     }
//   ]);

//   return (
//     <div className="flex h-screen bg-gray-100 p-6">
//       <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">📜 Activity History</h2>

//         {history.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {history.map((item, index) => (
//               <div
//                 key={index}
//                 className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md transition-all hover:scale-[1.02]"
//               >
//                 <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
//                 <p className="text-sm text-gray-600 mt-1">
//                   📅 {item.date} | ⏳ {item.duration}
//                 </p>
//                 <p
//                   className={`mt-2 font-medium ${item.status === "Completed" ? "text-green-600" : "text-red-600"
//                     }`}
//                 >
//                   ✅ Status: {item.status}
//                 </p>
//                 {item.score !== undefined && (
//                   <p className="mt-1 text-gray-800">
//                     🎯 Score: <span className="font-semibold">{item.score}</span>
//                   </p>
//                 )}
//                 {item.feedback && (
//                   <p className="italic text-gray-700 mt-2">💬 Feedback: {item.feedback}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600 text-lg text-center mt-10">No history available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from "react";
import { Link } from "react-router-dom";
import { Repeat, Briefcase, Clock, Lightbulb, Users, Brain } from "lucide-react";
// import PractiseInterview from "../../assets/PracriseInterview.jpg"; // Ensure correct file name and extension
// import FollowUpInterview from "../../assets/FollowInterview.jpg";
// import RoleBasedInterview from "../../assets/RoleBased.jpg";
// import RapidFire from "../../assets/RapidFire.jpg";
// import RapidFire from "../../assets/RapidFire.jpg";
// import RapidFire from "../../assets/RapidFire.jpg";
// Mark a feature with "isImage" so you know to style it as a full-cover image
const sections = [
  {
    title: "Interview Section",
    features: [
      {
        path: "/dashboard/practice-interview",
        title: "Practice Interview",
        icon: "",
        isImage: true,
      },
      { 
        path: "/dashboard/follow-up-interview", 
        title: "Follow-Up Interview", 
        icon: "", 
        isImage: true 
      },
      { 
        path: "/dashboard/role-based-interview", 
        title: "Role Based Interview", 
        icon:  "", 
        isImage: true
      },
    ],
  },
  {
    title: "Quiz Section",
    features: [
      { 
        path: "/dashboard/rapid-fire", 
        title: "Rapid Fire", 
        icon: "", 
        isImage: true
      },
      { 
        path: "/dashboard/quick-think", 
        title: "Quick Think", 
        icon: <Lightbulb size={40} />, 
        isImage: false 
      },
    ],
  },
  {
    title: "Resume Section",
    features: [
      { 
        path: "/dashboard/analyze-resume", 
        title: "Analyze Resume", 
        icon: <Brain size={40} />, 
        isImage: false 
      },
    ],
  },
  {
    title: "Mock Interview",
    features: [
      { 
        path: "/dashboard/mock-interview", 
        title: "Mock Interview", 
        icon: <Users size={40} />, 
        isImage: false 
      },
    ],
  },
];

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      {/* Dashboard Title */}
      <h1 className="text-5xl font-extrabold text-orange-500 mb-8 text-left">
        Dashboard
      </h1>

      {sections.map((section, index) => (
        <div key={index} className="mb-12">
          {/* Section Heading */}
          <h2 className="text-3xl font-bold text-blue-400 mb-6 text-left">
            {section.title}
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {section.features.map((feature) => (
              <Link
                key={feature.path}
                to={feature.path}
                className="bg-gray-800 border border-orange-500 rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {feature.isImage ? (
                  // The image container that covers the full upper part of the card
                  <div className="w-full h-48 overflow-hidden hover:animate-pulse">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>
                ) : (
                  // For non-image icons, center them inside a fixed-height container
                  <div className="w-full h-48 flex items-center justify-center">
                    {feature.icon}
                  </div>
                )}
                {/* Heading centered below the image */}
                <p className="text-xl font-semibold text-center py-4">
                  {feature.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;