import React, { useState, useEffect } from "react";
import api from "../../api";
import { Info } from "lucide-react";
import AudioRecorder from "../Recordings/AudioRecorder";

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
    <div className="w-screen h-screen mx-auto flex justify-center items-center p-8 relative overflow-hidden bg-white">
      {/* Glowing Effect */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[60%] h-[60%] rounded-full blur-3xl opacity-50 animate-pulse bg-gradient-to-r from-teal-300 via-blue-400 to-indigo-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl p-6 rounded-lg shadow-xl backdrop-blur-lg bg-white text-gray-900">
        <h1 className="text-5xl font-bold text-center mb-6 drop-shadow-lg">
          🎤 Practice
        </h1>

        <div className="question mt-4 text-xl font-medium drop-shadow-lg">
          <p>{questions[questionIndex]}</p>
        </div>

        <AudioRecorder onAudioSubmit={handleAudioSubmit} />

        {loading && <p className="text-center mt-4 animate-pulse">Processing...</p>}

        {response && (
          <div className="response mt-6 p-4 rounded-lg shadow-lg bg-gray-100 text-gray-900">
            <h2 className="text-lg font-semibold mb-2 drop-shadow-md">Analysis Result:</h2>
            <p>{response.transcription}</p>
            <p className="mt-2 text-green-500">{response.analysis}</p>
          </div>
        )}

        {response && questionIndex < questions.length && (
          <button
            onClick={() => setQuestionIndex((prevIndex) => prevIndex + 1)}
            className="w-full mt-6 py-2 text-lg font-semibold rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl bg-gradient-to-r from-orange-500 to-red-500 text-white"
          >
            Next Question
          </button>
        )}

        {questionIndex >= questions.length && (
          <button
            onClick={handleReset}
            className="w-full mt-6 py-2 text-lg font-semibold rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl bg-gradient-to-r from-yellow-500 to-orange-600 text-white"
          >
            Start Over
          </button>
        )}
      </div>
    </div>
  );
};

export default AI_Interview;