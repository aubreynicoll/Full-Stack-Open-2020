import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Heading = ({text}) =>
    <h1>{text}</h1>

const Button = ({onClick, text}) =>
    <button onClick={onClick}>{text}</button>

const Display = ({name, value}) =>
    <div>{name}: {value}</div>

const Stats = ({good, neutral, bad, displayStats}) => {
    const totalFeedbacks = () =>
        good + neutral + bad

    const averageFeedback = () =>
        (good - bad) / totalFeedbacks()

    const percentOfGood = () =>
        good / totalFeedbacks() * 100 + '%'

    if (displayStats === false)
        return <div>No feedback given</div>
    else
        return(
            <div>
                <Display name='Good' value={good} />
                <Display name='Neutral' value={neutral} />
                <Display name='Bad'  value={bad} />
                <Display name='Total' value={totalFeedbacks()} />
                <Display name='Average' value={averageFeedback()} />
                <Display name='Positive' value={percentOfGood()} />
            </div>
        )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    const incrementState = (state, setter) => {
        setter(state + 1)
        displayStats = true
    }

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
            <Stats
                good={good}
                neutral={neutral}
                bad={bad}
                displayStats={displayStats} />
        </div>
    )
}

let displayStats = false

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
