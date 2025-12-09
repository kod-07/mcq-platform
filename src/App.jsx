import React, { useState } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { weekData, classData, getCombinedQuestions } from './data/questions';

function App() {
  const [view, setView] = useState('category'); // category, menu, quiz, results
  const [selectedCategory, setSelectedCategory] = useState(null); // 'week' or 'class'
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  const getDataSource = () => {
    return selectedCategory === 'week' ? weekData : classData;
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // 1. Category Selection
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setView('menu');
  };

  // 2. Test Selection
  const handleSelectTest = (testId) => {
    const dataSource = getDataSource();
    let questions = [];

    if (testId === 'combined') {
      questions = getCombinedQuestions(dataSource, 15);
    } else {
      const selectedTest = dataSource.find(t => t.id === testId);
      if (selectedTest) {
        questions = shuffleArray(selectedTest.questions);
      }
    }
    
    if (questions.length > 0) {
      setActiveQuestions(questions);
      setView('quiz');
      setUserAnswers({});
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setView('category');
  };

  // 3. Quiz Finished
  const handleQuizFinish = (answers) => {
    setUserAnswers(answers);
    setView('results');
  };

  // 4. Retry / Back to Menu
  const handleRetry = () => {
    setView('menu');
    setActiveQuestions([]);
    setUserAnswers({});
  };

  return (
    <div className="app-container">
      {view === 'category' && (
        <div className="category-menu">
          <h1>Select Test Type</h1>
          <div className="category-grid">
            <button className="category-card" onClick={() => handleSelectCategory('week')}>
              <h2>Week Wise Tests</h2>
              <p>Weekly assessment questions</p>
            </button>
            <button className="category-card" onClick={() => handleSelectCategory('class')}>
              <h2>Class Wise Tests</h2>
              <p>Class work based questions</p>
            </button>
          </div>
        </div>
      )}

      {view === 'menu' && (
        <>
           <button className="back-link" onClick={handleBackToCategories}>← Back to Categories</button>
           <MainMenu 
             data={getDataSource()} 
             title={selectedCategory === 'week' ? "Week Wise Tests" : "Class Wise Tests"}
             onSelectTest={handleSelectTest} 
           />
        </>
      )}

      {view === 'quiz' && <Quiz questions={activeQuestions} onFinish={handleQuizFinish} />}
      
      {view === 'results' && (
        <Results 
          questions={activeQuestions} 
          userAnswers={userAnswers} 
          onRetry={handleRetry} 
        />
      )}
    </div>
  );
}

export default App;
