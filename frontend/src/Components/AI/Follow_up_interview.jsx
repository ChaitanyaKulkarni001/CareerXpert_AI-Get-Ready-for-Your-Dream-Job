import React, { useContext, useState } from "react";
import AudioRecorder from "../Recordings/AudioRecorder";  // Assuming this is already implemented
import api from "../../api";
import TextToSpeech from "../Recordings/Helper/TextToSpeech";
import { ThemeContext } from "../ThemeContext";

const Follow_up_interview = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("Tell me about yourself");
  const [showInfo, setShowInfo] = useState(false);

  const handleAudioSubmit = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("question", currentQuestion);

    setLoading(true);
    try {
      const result = await api.post("/api/follow-up-interview/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Extract and clean the next question from the analysis
      const nextQuestion = extractNextQuestion(result.data.analysis);
      const cleanedAnalysis = removeNextQuestionFromAnalysis(result.data.analysis);

      setResponse({ ...result.data, analysis: cleanedAnalysis });
      setCurrentQuestion(nextQuestion);  // Set the next question for the follow-up
    } catch (error) {
      console.error("Error:", error);
      alert("Your session got timeout due to inactivity. Please refresh the page and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Extract the next question from the analysis text (between double curly braces)
  const extractNextQuestion = (analysis) => {
    const match = analysis.match(/\{\{\s*(.*?)\s*\}\}/);
    return match ? match[1] : "Could you please elaborate more?";
  };

  // Remove the next question from the analysis text
  const removeNextQuestionFromAnalysis = (analysis) => {
    return analysis.replace(/\{\{\s*.*?\s*\}\}/, "").trim();
  };
  const {theme} = useContext(ThemeContext);
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6  rounded-xl shadow-lg text-white">
      
      {/* Title */}
      <h1 className={`${theme === 'dim' ? 'text-gray-900' : 'text-white'}`}>
        🎤 Follow-Up Interview
      </h1>

      {/* Info Icon and description toggle */}
      
      <div
        className="flex items-center justify-end mb-4 relative"
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        <span className="w-6 h-6 cursor-pointer">ℹ️</span>
        {showInfo && (
          <div className="absolute bg-gray-900 text-white text-xs rounded px-2 py-1 bottom-8 left-1/2 transform -translate-x-1/2">
            The AI will ask a series of questions, and based on your answers, provide relevant follow-up questions.
          </div>
        )}
      </div>

      {/* Current Question */}
      <p className={`${theme === 'dim' ? 'text-gray-900' : 'text-white'}`}>{currentQuestion}</p>

      {/* Audio Recorder */}
      <AudioRecorder onAudioSubmit={handleAudioSubmit} />

      {loading && <p className="text-blue-400 text-center mt-4">Processing...</p>}

      {response && (
        <>
          {/* Text-to-Speech for AI Analysis */}
          <TextToSpeech text={response.analysis} />

          <div className="response mt-6 p-4  rounded-lg bg-gray-800 shadow-sm">
            {/* User's Response (Transcription) */}
            <h2 className="text-lg font-semibold mb-2 text-gray-300">Your Response:</h2>
            <p className="text-gray-400">{response.transcription}</p>

            {/* AI's Analysis (Cleaned without next question) */}
            <h2 className="text-lg font-semibold mb-2 mt-4 text-green-400">AI's Analysis:</h2>
            <p className="text-green-300">{response.analysis.slice(19, -6)}</p>

            {/* Next Question */}
            <h2 className="text-lg font-semibold mb-2 mt-4 text-blue-400">Next Question:</h2>
            <p className="text-blue-300">{currentQuestion}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Follow_up_interview;
