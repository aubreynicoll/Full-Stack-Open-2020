export const assertNever = (n: never): never => {
  throw new Error(`Unhandled union member: ${JSON.stringify(n)}`);
};