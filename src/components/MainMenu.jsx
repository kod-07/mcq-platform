import React from 'react';

const MainMenu = ({ data, title, onSelectTest }) => {
  return (
    <div className="main-menu">
      <h1>{title}</h1>
      <p>Select a test to begin:</p>
      <div className="test-grid">
        {data.map((test) => (
          <button key={test.id} className="test-card" onClick={() => onSelectTest(test.id)}>
            <h3>{test.name}</h3>
            <p>{test.questions.length} Questions</p>
          </button>
        ))}
        <button className="test-card combined" onClick={() => onSelectTest('combined')}>
          <h3>Combined Test</h3>
          <p>Random Selection</p>
        </button>
      </div>
    </div>
  );
};

export default MainMenu;