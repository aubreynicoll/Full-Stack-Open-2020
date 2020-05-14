import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Heading = ({text}) =>
    <h1>{text}</h1>

const Button = ({onClick, text}) =>
    <button onClick={onClick}>{text}</button>

const Display = ({name, value}) =>
    <div>{name}: {value}</div>

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const incrementState = (state, setter) =>
        setter(state + 1)

    const totalFeedbacks = () =>
        good + neutral + bad

    const averageFeedback = () =>
        good - bad / totalFeedbacks()

    const percentOfGood = () =>
        good / totalFeedbacks()

    return(
        <div>
            <Heading text='Give Feedback' />
            <Button 
                onClick={() => incrementState(good, setGood)}
                text='Good' />
            <Button
                onClick={() => incrementState(neutral, setNeutral)}
                text='Neutral' />
            <Button
                onClick={() => incrementState(bad, setBad)}
                text='Bad' />
            <Heading text='Statistics' />
            <Display name='Good' value={good} />
            <Display name='Neutral' value={neutral} />
            <Display name='Bad' value={bad} />
            <Display name='All' value={totalFeedbacks()} />
            <Display name='Average' value={averageFeedback()} />
            <Display name='Positive' value={percentOfGood()} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
