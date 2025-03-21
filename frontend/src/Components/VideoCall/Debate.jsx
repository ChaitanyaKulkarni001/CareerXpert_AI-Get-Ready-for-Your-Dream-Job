import React, { useState } from "react";
import api from "../../api";
import DebateConventos from "../../DebateConventos";
import { useNavigate } from 'react-router-dom';
const Debate = () => {
  const [side, setSide] = useState("");
  const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
  const getDebateTopic = () => {
    return "The Social Media Effects";
  };

  const saveData = async () => {
    const topic = getDebateTopic();
    const formData = new FormData();
    formData.append("topic", topic);
    formData.append("userSide", side);

    try {
      const result = await api.post("api/debateData/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Data saved successfully:", result.data);
      // Set submitted to true after successful submission
      setSubmitted(true);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // If data has been submitted, show the DebateConventos component with topic and side
  if (submitted) {
   navigate("/dashboard/debate/start")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Debate Topic: {getDebateTopic()}
        </h2>
        <p className="text-gray-600 mb-4">Choose your side:</p>
        <div className="flex space-x-6 mb-6">
          {/* Positive Button */}
          <div
            onClick={() => setSide("positive")}
            className="relative inline-flex items-center justify-center gap-4 group cursor-pointer"
          >
            <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
            <a
              role="button"
              className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
              title="Positive"
              href="#"
            >
              Positive
              <svg
                aria-hidden="true"
                viewBox="0 0 10 10"
                height="10"
                width="10"
                fill="none"
                className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2 transition-opacity duration-200 group-hover:opacity-100"
              >
                <path
                  d="M0 5h7"
                  className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                ></path>
                <path
                  d="M1 1l4 4-4 4"
                  className="transition-transform duration-200 group-hover:translate-x-[3px]"
                ></path>
              </svg>
            </a>
          </div>

          {/* Negative Button */}
          <div
            onClick={() => setSide("negative")}
            className="relative inline-flex items-center justify-center gap-4 group cursor-pointer"
          >
            <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
            <a
              role="button"
              className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
              title="Negative"
              href="#"
            >
              Negative
              <svg
                aria-hidden="true"
                viewBox="0 0 10 10"
                height="10"
                width="10"
                fill="none"
                className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2 transition-opacity duration-200 group-hover:opacity-100"
              >
                <path
                  d="M0 5h7"
                  className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                ></path>
                <path
                  d="M1 1l4 4-4 4"
                  className="transition-transform duration-200 group-hover:translate-x-[3px]"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <button
          onClick={saveData}
          disabled={!side}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            side
              ? "bg-blue-600 hover:bg-blue-700 transition duration-200"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit Debate Entry
        </button>
      </div>
    </div>
  );
};

export default Debate;
