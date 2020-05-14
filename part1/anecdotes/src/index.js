import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) =>
    <button onClick={onClick}>{text}</button>

const Display = ({text}) =>
    <div>{text}</div>

const App = (props) => {
    const [selected, setSelected] = useState(0)

    const getRandomAnecdote = () => {
        let newSelected = Math.floor(Math.random() * anecdotes.length)
        setSelected(newSelected)
    }
    return (
        <div>
            <Display text={anecdotes[selected]} />
            <Button text='Get Random Anecdote' onClick={getRandomAnecdote} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. A good programmer writes code that a human can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
