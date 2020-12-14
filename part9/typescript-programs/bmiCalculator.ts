type Bmi = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese';

interface BmiArgs {
  cm: number,
  kg: number
 }

const parseArguments = (args: Array<string>): BmiArgs => {
  if (args.length > 4) throw new Error('Too many arguments.');
  if (args.length < 4) throw new Error('Too few arguments.');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      cm: Number(args[2]),
      kg: Number(args[3])      
    }
  } else {
    throw new Error('Arguments must have type Number.');
  }
}

const bmiCalculator = (cm: number, kg: number): Bmi => {
  const bmi: number = kg / Math.pow(cm / 100, 2);

  if (bmi <= 18.5) return 'Underweight'
  else if (bmi <= 25) return 'Normal weight'
  else if (bmi <= 30) return 'Overweight'
  else return 'Obese'
}

try {
  const { cm, kg } = parseArguments(process.argv);
  const result: Bmi = bmiCalculator(cm, kg);
  console.log(result);
} catch (error) {
  console.error('ERROR: ', error.message);
}