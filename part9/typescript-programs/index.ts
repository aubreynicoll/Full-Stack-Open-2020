import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator, ExerciseArgs} from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: { message: 'ERROR: height and weight must both parse to Number.' } });
  }

  return res.status(200).json({
    height: Number(height),
    weight: Number(weight),
    bmi: bmiCalculator(Number(height), Number(weight))
  });
});

app.post('/exercise', (req, res) => {
  const { exerciseArray, exerciseGoal } = req.body as ExerciseArgs;

  if (!exerciseArray || !exerciseGoal) {
    res.status(400).json({ error: { message: 'parameters missing' } });
  }
  if (!Array.isArray(exerciseArray) || exerciseArray.some(n => isNaN(Number(n))) || isNaN(Number(exerciseGoal))) {
    res.status(400).json({ error: { message: 'malformed parameters' } });
  }  

  const results = exerciseCalculator(exerciseArray, exerciseGoal);

  res.status(200).json(results);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});