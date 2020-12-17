type StudentRating = 1 | 2 | 3 | 4 | 5;

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface NewInterface extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends NewInterface {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends NewInterface {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface MyCoursePart extends NewInterface {
  name: "Aubrey's Awesome Full Stack Interface"
  studentRating: StudentRating;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyCoursePart;