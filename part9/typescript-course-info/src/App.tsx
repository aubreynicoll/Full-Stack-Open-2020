import React from 'react';
import { CoursePart } from './types';
import CoursePartsList from './components/CoursePartsList';
import Header from './components/Header';
import Total from './components/Total';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Aubrey's Awesome Full Stack Interface",
      exerciseCount: 0,
      description: "Maybe the coolest ever.",
      studentRating: 5
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