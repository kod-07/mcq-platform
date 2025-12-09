// Week Wise Imports
import week1 from '../../json/week wise/week1.json';
import week2 from '../../json/week wise/week2.json';
import week3 from '../../json/week wise/week3.json';
import week4 from '../../json/week wise/week4.json';
import week5 from '../../json/week wise/week5.json';
import week6 from '../../json/week wise/week6.json';
import week7 from '../../json/week wise/week7.json';
import week8 from '../../json/week wise/week8.json';

// Class Work Imports
import class1 from '../../json/Class work/W1.json';
import class2 from '../../json/Class work/W2.json';
import class3 from '../../json/Class work/W3.json';
import class4 from '../../json/Class work/W4.json';
import class5 from '../../json/Class work/W5.json';
import class6 from '../../json/Class work/W6.json';
import class7 from '../../json/Class work/W7.json';
import class8 from '../../json/Class work/W8.json';

// Helper to normalize data
const processFiles = (files, prefix) => {
  return files.map((file, index) => ({
    id: index + 1,
    name: `${prefix} ${index + 1}`,
    questions: file.map((q, qIndex) => ({
      id: `${prefix.toLowerCase().replace(/\s/g, '')}${index + 1}_q${q.id || qIndex}`,
      testId: index + 1,
      question: q.question,
      options: q.options,
      correctAnswer: q.answer
    }))
  }));
};

const weekRaw = [week1, week2, week3, week4, week5, week6, week7, week8];
const classRaw = [class1, class2, class3, class4, class5, class6, class7, class8];

export const weekData = processFiles(weekRaw, 'Week');
export const classData = processFiles(classRaw, 'Class Work');

// Helper to get combined random questions
export const getCombinedQuestions = (dataSet, count = 20) => {
  const allQuestions = dataSet.flatMap(t => t.questions);
  // Fisher-Yates Shuffle
  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
  }
  return allQuestions.slice(0, count);
};
