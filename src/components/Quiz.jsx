import React, { useState, useEffect } from 'react';

const Quiz = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOption }
  const [timeLeft, setTimeLeft] = useState(questions.length * 30); // 30 seconds per question

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish(answers);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onFinish, answers]);

  const handleOptionSelect = (option) => {
    setAnswers({
      ...answers,
      [questions[currentIndex].id]: option
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish(answers);
    }
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="timer">Time Left: {formatTime(timeLeft)}</div>
        <div className="progress-bar">
           <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="question-count">Question {currentIndex + 1} / {questions.length}</div>
      </div>

      <div className="question-card">
        <h2>{currentQuestion.question}</h2>
        <div className="options-list">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${answers[currentQuestion.id] === option ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-footer">
        <button 
          className="next-btn" 
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
        >
          {currentIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
