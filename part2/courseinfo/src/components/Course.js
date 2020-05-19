import React from 'react';

const Course = ({course}) => {

    const sum = course.parts.reduce((a, c) => (
        a + c.exercises
    ), 0)

    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map((part) => 
                <p key={part.id}>{part.name} {part.exercises}</p>
            )}
            <p>Total of {sum} exercises</p>
        </div>
    )
}

export default Course
