import express from 'express';
import { bmiCalculator } from './bmiCalculator'
const app = express();

app.get('/hello', (_, res) => {
  res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: { message: 'ERROR: height and weight must both parse to Number.' } })
  }

  return res.status(200).json({
    height: Number(height),
    weight: Number(weight),
    bmi: bmiCalculator(Number(height), Number(weight))
  })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`)
})