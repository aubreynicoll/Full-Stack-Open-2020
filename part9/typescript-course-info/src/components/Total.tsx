import React from 'react';
import { CoursePart } from '../types';

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      Total: {courseParts.reduce((sum, value) => sum + value.exerciseCount, 0)}
    </div>
  );
};

export default Total;