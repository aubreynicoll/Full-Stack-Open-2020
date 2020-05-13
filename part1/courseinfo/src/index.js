import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <>
            <h1>
                {props.course.name}
            </h1>
        </>
    )
}

const Content = (props) => {
    return (
        <>
            <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
            <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
            <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.part} {props.exercises}
            </p>
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>
                Number of exercises: {props.exercises}
            </p>
        </>
    )
}

const App = () => {
    const course = { 
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using Props to Pass Data',
                exercises: 7
            },
            {
                name: 'State of a Component',
                exercises: 14
            }
        ]
    }

    return (
        <>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
