import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../utils/helpers';

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
  switch (coursePart.name) {
    case 'Fundamentals':
      return (
        <div>
          {coursePart.name}: <em>{coursePart.description}</em> - {coursePart.exerciseCount}
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          {coursePart.name}: {coursePart.exerciseCount}, {coursePart.groupProjectCount}
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          {coursePart.name}: <em>{coursePart.description}</em> - {coursePart.exerciseCount} <a href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a>
        </div>
      );
    case 'Aubrey\'s Awesome Full Stack Interface':
      return (
        <div>
          {coursePart.name}: <em>{coursePart.description}</em> - {coursePart.exerciseCount}. REVIEWS: {coursePart.studentRating} out of 5.
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default CoursePartsList;