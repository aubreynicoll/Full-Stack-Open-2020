type Rating = 1 | 2 | 3;

interface ExerciseData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: Rating,
  note: string,
  goal: number,
  average: number
}

interface ExerciseArgs {
  exerciseArray: Array<number>,
  exerciseGoal: number
}

const parseExerciseArguments = (args: Array<string>): ExerciseArgs => {
  if (args.length < 4) throw new Error('Too few arguments.')

  const userArgs: Array<string> = args.slice(2)

  if (userArgs.some(s => isNaN(Number(s)))) throw new Error('User arguments must all parse to Number')

  const exerciseArray: Array<number> = userArgs.map(s => Number(s))
  const exerciseGoal: number = exerciseArray.pop()

  return {
    exerciseArray,
    exerciseGoal
  }
}

const exerciseCalculator = (exerciseArray: Array<number>, exerciseGoal: number): ExerciseData => {
  const trainingDays: number = exerciseArray.filter(n => n > 0).length
  const totalTime: number = exerciseArray.reduce((sum, n) => sum + n)

  return {
    periodLength: exerciseArray.length,
    trainingDays,
    success:  totalTime > exerciseGoal,
    rating: 1,
    note: 'Could be better...',
    goal: exerciseGoal,
    average: totalTime / exerciseArray.length
  }
}

try {
  const {exerciseArray, exerciseGoal } = parseExerciseArguments(process.argv)
  const result: ExerciseData = exerciseCalculator(exerciseArray, exerciseGoal)
  console.log(result)
} catch (error) {
  console.error('ERROR: ', error.message)
}