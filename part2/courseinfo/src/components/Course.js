import React from 'react';

const Course = ({course}) => {
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map((part) => 
                <p id={part.id}>{part.name} {part.exercises}</p>
            )}
        </div>
    )
}

export default Course
