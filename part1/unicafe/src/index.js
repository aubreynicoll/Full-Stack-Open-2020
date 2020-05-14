import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Heading = ({text}) =>
    <h1>{text}</h1>

const Button = ({onClick, text}) =>
    <button onClick={onClick}>{text}</button>

const Stat = ({name, value}) => (
    <tr>
       <td>{name}</td>
       <td>:</td> 
       <td>{value}</td>
    </tr>
)

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
            <table>
                <tbody>
                    <Stat name='Good' value={good} />
                    <Stat name='Neutral' value={neutral} />
                    <Stat name='Bad'  value={bad} />
                    <Stat name='Total' value={totalFeedbacks()} />
                    <Stat name='Average' value={averageFeedback()} />
                    <Stat name='Positive' value={percentOfGood()} />
                </tbody>
            </table>
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
