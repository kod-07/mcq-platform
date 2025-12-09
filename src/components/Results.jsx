import React from 'react';

const Results = ({ questions, userAnswers, onRetry }) => {
  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;

  const resultsData = questions.map((q) => {
    const userAnswer = userAnswers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;
    
    if (isCorrect) {
      score += 1; // Assuming 1 point per question
      correctCount++;
    } else {
      wrongCount++;
    }

    return {
      ...q,
      userAnswer,
      isCorrect
    };
  });

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="results-container">
      <h1>Test Results</h1>
      
      <div className="score-card">
        <div className="score-circle">
          <span>{percentage}%</span>
        </div>
        <h2>Score: {score} / {questions.length}</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-box correct">
          <h3>Correct</h3>
          <p>{correctCount}</p>
        </div>
        <div className="stat-box wrong">
          <h3>Wrong</h3>
          <p>{wrongCount}</p>
        </div>
        <div className="stat-box skipped">
          <h3>Skipped</h3>
          <p>{questions.length - (correctCount + wrongCount)}</p>
        </div>
      </div>

      <div className="detailed-review">
        <h3>Detailed Review</h3>
        {resultsData.map((item, index) => (
          <div key={item.id} className={`review-item ${item.isCorrect ? 'correct' : 'wrong'}`}>
            <h4>{index + 1}. {item.question}</h4>
            <div className="review-options">
               <p>Your Answer: <span className={item.isCorrect ? 'text-correct' : 'text-wrong'}>{item.userAnswer || 'Skipped'}</span></p>
               {!item.isCorrect && <p>Correct Answer: <span className="text-correct">{item.correctAnswer}</span></p>}
            </div>
          </div>
        ))}
      </div>

      <button className="retry-btn" onClick={onRetry}>Back to Menu</button>
    </div>
  );
};

export default Results;
