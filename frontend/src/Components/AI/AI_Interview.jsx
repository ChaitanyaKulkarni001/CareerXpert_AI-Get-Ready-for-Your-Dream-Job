import React, { useState, useEffect } from "react";
import AudioRecorder from "../Recordings/AudioRecorder";
import api from "../../api";
import { Info } from "lucide-react"; // Info icon from lucide-react

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
    "Why are you looking to leave your current job?"
  ]);

  useEffect(() => {
    // Reset response and question index if switching AI or resetting the interview
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
      setQuestionIndex(prevIndex => prevIndex + 1); // Move to next question after submission
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
    <div className="max-w-2xl mx-auto mt-2 p-6 border rounded-lg shadow-lg bg-white">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        🎤 AI Interview
      </h1>
      {/* Info Icon with hover info */}
      <div
        className="flex items-center justify-end mb-4 relative"
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        <Info className="w-6 h-6 cursor-pointer" />
        {showInfo && (
          <div className="absolute bg-black text-white text-xs rounded px-2 py-1 bottom-8 left-1/2 transform -translate-x-1/2">
            This is a practice-based interview. Record your answer and get AI feedback.
          </div>
        )}
      </div>

      {/* Display current question */}
      <div className="question mt-4 text-xl text-gray-800 font-medium">
        <p>{questions[questionIndex]}</p>
      </div>

      {/* The AudioRecorder is only responsible for recording */}
      <AudioRecorder onAudioSubmit={handleAudioSubmit} />

      {loading && <p className="text-blue-500 text-center mt-4">Processing...</p>}

      {response && (
        <div className="response mt-6 p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Analysis Result:</h2>
          <p className="text-gray-700">{response.transcription}</p>
          <p className="text-green-500 mt-2">{response.analysis}</p>
        </div>
      )}

      {/* Buttons for navigating the interview */}
      {response && questionIndex < questions.length && (
        <button
          onClick={() => setQuestionIndex(prevIndex => prevIndex + 1)}
          className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md mt-6"
        >
          Next Question
        </button>
      )}

      {questionIndex >= questions.length && (
        <button
          onClick={handleReset}
          className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md mt-6"
        >
          Start Over
        </button>
      )}
    </div>
  );
};

export default AI_Interview;

