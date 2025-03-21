// import React, { useState, useEffect } from "react";
// import AudioRecorder from "../Recordings/AudioRecorder";
// import api from "../../api";
// import { Info } from "lucide-react"; // Info icon from lucide-react

// const AI_Interview = () => {
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showInfo, setShowInfo] = useState(false);
//   const [aiType, setAiType] = useState("ai-interview");
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [questions, setQuestions] = useState([
//     "Tell me about yourself.",
//     "Why should I hire you?",
//     "What are your strengths?",
//     "What are your weaknesses?",
//     "Where do you see yourself in 5 years?",
//     "Why do you want to work here?",
//     "How do you handle stress and pressure?",
//     "Describe a time when you faced a challenge and how you handled it.",
//     "What is your greatest achievement?",
//     "Why are you looking to leave your current job?"
//   ]);

//   useEffect(() => {
//     // Reset response and question index if switching AI or resetting the interview
//     setResponse(null);
//     setQuestionIndex(0);
//   }, [aiType]);

//   const handleAudioSubmit = async (audioBlob) => {
//     const audioFile = new File([audioBlob], "recorded_audio.wav", { type: "audio/wav" });
//     const formData = new FormData();
//     formData.append("audio", audioFile);
//     formData.append("question", questions[questionIndex]);

//     setLoading(true);
//     try {
//       const result = await api.post(`/api/${aiType}/`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setResponse(result.data);
//       setQuestionIndex(prevIndex => prevIndex + 1); // Move to next question after submission
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Your session got timeout due to inactivity. Please refresh the page and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setResponse(null);
//     setQuestionIndex(0);
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-2 p-6 border rounded-lg shadow-lg bg-white">
//       {/* Title */}
//       <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
//         🎤 AI Interview
//       </h1>
//       {/* Info Icon with hover info */}
//       <div
//         className="flex items-center justify-end mb-4 relative"
//         onMouseEnter={() => setShowInfo(true)}
//         onMouseLeave={() => setShowInfo(false)}
//       >
//         <Info className="w-6 h-6 cursor-pointer" />
//         {showInfo && (
//           <div className="absolute bg-black text-white text-xs rounded px-2 py-1 bottom-8 left-1/2 transform -translate-x-1/2">
//             This is a practice-based interview. Record your answer and get AI feedback.
//           </div>
//         )}
//       </div>

//       {/* Display current question */}
//       <div className="question mt-4 text-xl text-gray-800 font-medium">
//         <p>{questions[questionIndex]}</p>
//       </div>

//       {/* The AudioRecorder is only responsible for recording */}
//       <AudioRecorder onAudioSubmit={handleAudioSubmit} />

//       {loading && <p className="text-blue-500 text-center mt-4">Processing...</p>}

//       {response && (
//         <div className="response mt-6 p-4 border rounded-lg bg-white shadow-sm">
//           <h2 className="text-lg font-semibold mb-2">Analysis Result:</h2>
//           <p className="text-gray-700">{response.transcription}</p>
//           <p className="text-green-500 mt-2">{response.analysis}</p>
//         </div>
//       )}

//       {/* Buttons for navigating the interview */}
//       {response && questionIndex < questions.length && (
//         <button
//           onClick={() => setQuestionIndex(prevIndex => prevIndex + 1)}
//           className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md mt-6"
//         >
//           Next Question
//         </button>
//       )}

//       {questionIndex >= questions.length && (
//         <button
//           onClick={handleReset}
//           className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md mt-6"
//         >
//           Start Over
//         </button>
//       )}
//     </div>
//   );
// };

// export default AI_Interview;


import React, { useState, useEffect } from "react";
import AudioRecorder from "../Recordings/AudioRecorder";
import api from "../../api";
import { Info } from "lucide-react";

const AI_Interview = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [aiType, setAiType] = useState("ai-interview");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([
    "Tell me about yourself.",
    "Why should I hire you?",
    "What are your strengths?",
    "What are your weaknesses?",
    "Where do you see yourself in 5 years?",
    "Why do you want to work here?",
    "How do you handle stress and pressure?",
    "Describe a time when you faced a challenge and how you handled it.",
    "What is your greatest achievement?",
    "Why are you looking to leave your current job?",
  ]);

  useEffect(() => {
    setResponse(null);
    setQuestionIndex(0);
  }, [aiType]);

  const handleAudioSubmit = async (audioBlob) => {
    const audioFile = new File([audioBlob], "recorded_audio.wav", { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("question", questions[questionIndex]);

    setLoading(true);
    try {
      const result = await api.post(`/api/${aiType}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(result.data);
      console.log("RESPONSE ", result.data);
      
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error("Error:", error);
      alert("Your session got timeout due to inactivity. Please refresh the page and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResponse(null);
    setQuestionIndex(0);
  };

  return (
    <div className="w-screen h-screen mx-auto flex justify-center items-center p-8 bg-black  relative overflow-hidden">
      {/* Glowing Effect */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[60%] h-[60%] rounded-full bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-500 blur-3xl opacity-50 animate-pulse"></div>
      </div>

      <div className="relative z-10 text-white  w-full max-w-2xl p-6 rounded-lg shadow-xl bg-gray-900 bg-opacity-90 backdrop-blur-lg">
        <h1 className="text-5xl font-bold text-center mb-6 drop-shadow-lg text-white">
          🎤 Practice 
        </h1>

        <div
          className="flex items-center justify-center mb-4 relative"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <Info className="w-6 h-6 text-gray-900 cursor-pointer hover:scale-110 transition transform hover:text-blue-500" />
          {showInfo && (
            <div className="absolute bg-gray-900 text-white text-xs rounded px-2 py-1 bottom-8 left-1/2 transform -translate-x-1/2">
              This is a practice-based interview. Record your answer and get AI feedback.
            </div>
          )}
        </div>

        <div className="question mt-4 text-xl font-medium drop-shadow-lg">
          <p>{questions[questionIndex]}</p>
        </div>

        <AudioRecorder onAudioSubmit={handleAudioSubmit} />

        {loading && <p className="text-gray-900 text-center mt-4 animate-pulse">Processing...</p>}

        {response && (
          <div className="response mt-6 p-4 bg-gray-100 bg-opacity-70 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-blue-500 mb-2 drop-shadow-md">Analysis Result:</h2>
            <p>{response.transcription}</p>
            <p className="text-green-600 mt-2">{response.analysis}</p>
            <h4>Rating  </h4>
            <p>{response.rating}</p>
          </div>
        )}

        {response && questionIndex < questions.length && (
          <button
            onClick={() => setQuestionIndex((prevIndex) => prevIndex + 1)}
            className="w-full mt-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-orange-900 to-red-500 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl"
          >
            Next Question
          </button>
        )}

        {questionIndex >= questions.length && (
          <button
            onClick={handleReset}
            className="w-full mt-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-yellow-700 to-orange-800 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl"
          >
            Start Over
          </button>
        )}
      </div>
    </div>
  );
};

export default AI_Interview;