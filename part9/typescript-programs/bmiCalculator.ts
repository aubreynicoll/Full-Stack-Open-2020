type Bmi = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese';

interface Args {
  kg: number,
  m: number
 };

const parseArguments = (args: Array<string>): Args => {
  if (process.argv.length > 4) throw new Error('Too many arguments.');
  if (process.argv.length < 4) throw new Error('Too few arguments.');

  if (!isNaN(Number(process.argv[2])) && !isNaN(Number(process.argv[3]))) {
    return {
      kg: Number(process.argv[2]),
      m: Number(process.argv[3])
    }
  } else {
    throw new Error('Arguments must have type Number.');
  }
}

const bmiCalculator = (kg: number, m: number): Bmi => {
  const bmi: number = kg / Math.pow(m, 2);

  if (bmi <= 18.5) return 'Underweight'
  else if (bmi <= 25) return 'Normal weight'
  else if (bmi <= 30) return 'Overweight'
  else return 'Obese'
};

try {
  const { kg, m } = parseArguments(process.argv)
  const result: Bmi = bmiCalculator(kg, m)
  console.log(result)
} catch (error) {
  console.error('ERROR: ', error.message)
}