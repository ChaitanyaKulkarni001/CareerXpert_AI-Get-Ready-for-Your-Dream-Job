import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/get-quiz-data/");
        console.log("Fetched Questions:", response.data); // Debugging
        setQuestions(response.data);
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
};


  const handleQuestionSelection = (questionId) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(questionId)
        ? prevSelected.filter((id) => id !== questionId)
        : [...prevSelected, questionId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !language || selectedQuestions.length === 0) {
      alert("Please fill all fields and select at least one question.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/quiz/", {
        title,
        language,
        question_ids: selectedQuestions,
      });
      alert("Quiz created successfully!");
      setTitle("");
      setLanguage("");
      setSelectedQuestions([]);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Quiz Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
          Language:
          <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} required />
        </label>
        <br />
        <h3>Select Questions</h3>
        <ul>
    {questions.length > 0 ? (
        questions.map((q) => (
            <li key={q.id}>
                <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q.id)}
                    onChange={() => handleQuestionSelection(q.id)}
                />
                {q.text}
            </li>
        ))
    ) : (
        <p>No questions available</p>
    )}
</ul>

        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default CreateQuiz;
