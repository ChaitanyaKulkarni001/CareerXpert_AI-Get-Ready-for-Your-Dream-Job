import React, { useState, useEffect,useContext } from "react";
import AudioRecorder from "../Recordings/AudioRecorder";
import api from "../../api";
import TextToSpeech from "../Recordings/Helper/TextToSpeech";
import { ThemeContext } from "../ThemeContext";
const OneMinuteQuestion = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [question, setQuestion] = useState("First Year College Friends");

  const generateRandomQuestion = async () => {
    try {
      const result = await api.post("/api/generate-random-question/");
      setQuestion(result.data.question);
    } catch (err) {
      console.error("Error fetching question:", err);
      alert("Your session has been timed out. Please refresh the page and try again.");
    }
  };

  useEffect(() => {
    generateRandomQuestion();
  }, []);

  const handleAudioSubmit = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("question", question);

    setLoading(true);
    try {
      const result = await api.post("/api/one-minute-question/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(result.data);
    } catch (error) {
      console.error("Error submitting audio:", error);
      alert("An error occurred while processing your response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    setResponse(null);
    setTimeLeft(60);
    generateRandomQuestion();
  };
  const theme = useContext(ThemeContext)

  return (
    <div className="max-w-xl mx-auto p-6 shadow-lg rounded-2xl ">
      <div className="text-4xl font-bold ">One-Minute Interview</div>
      <p className="mb-3 font-medium">Question: {question}</p>
      
      <AudioRecorder onAudioSubmit={handleAudioSubmit} timeLimit={60} />

      {loading && <p className="text-blue-500 text-center mt-4">Processing...</p>}
      
      {response && (
        <>
          <TextToSpeech text={response.analysis} />
          <div className="response mt-6 p-4 border rounded-lg bg-white shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Your Response:</h2>
            <p className="text-gray-700">{response.transcription}</p>
            <h2 className="text-lg font-semibold mb-2 mt-4">AI's Analysis:</h2>
            <p className="text-green-500">{response.analysis}</p>
          </div>
        </>
      )}

      <button 
        onClick={handleNextQuestion} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
      >
        Next Question
      </button>
    </div>
  );
};

export default OneMinuteQuestion;