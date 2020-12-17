import React from 'react';
import { CoursePart } from '../types';

const CoursePartsList: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(coursePart => (
        <CoursePartDisplay key={coursePart.name} coursePart={coursePart} />
      ))}
    </div>
  );
};

const CoursePartDisplay: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  return (
    <div>
      {coursePart.name}: {coursePart.exerciseCount}
    </div>
  );
};

export default CoursePartsList;