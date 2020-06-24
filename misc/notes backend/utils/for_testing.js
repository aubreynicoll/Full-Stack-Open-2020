const palindrome = (string) => {
  return string.split('').reverse().join('')
}

const average = (array) => {
  return array.length === 0
    ? 0
    : array.reduce((sum, n) => sum + n, 0) / array.length
}

module.exports = {
  palindrome,
  average
}