import React from 'react';
import CoursePartsList from './components/CoursePartsList';
import Header from './components/Header';
import Total from './components/Total';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <CoursePartsList courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;