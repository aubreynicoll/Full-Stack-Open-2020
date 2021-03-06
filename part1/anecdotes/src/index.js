import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) =>
    <h1>{text}</h1>

const Button = ({onClick, text}) =>
    <button onClick={onClick}>{text}</button>

const DisplayAnecdote = ({text, votes}) => (
    <div>
        <p>{text}</p>
        <p>This anecdote has {votes} votes.</p>
    </div>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const getRandomAnecdote = () => {
        let newSelected = Math.floor(Math.random() * anecdotes.length)
        setSelected(newSelected)
    }

    const vote = () => {
        const newVotes = [...votes]
        newVotes[selected] = votes[selected] + 1
        setVotes(newVotes)
    }

    const getTopVoted = () => 
        anecdotes[votes.indexOf(Math.max(...votes))]
        
    return (
        <div>
            <Header text='Anecdote of the Day' />
            <DisplayAnecdote text={anecdotes[selected]} votes={votes[selected]} />
            <Button text='Get Random Anecdote' onClick={getRandomAnecdote} />
            <Button text='Vote for this Anecdote' onClick={vote} />
            <Header text='Top Voted' />
            <DisplayAnecdote text={getTopVoted()} votes={Math.max(...votes)} />
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
