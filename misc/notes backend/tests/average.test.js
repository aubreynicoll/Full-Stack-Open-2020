const average = require('../utils/for_testing').average

describe('average of', () => {
  test('one value is itself', () => {
    expect(average([5])).toBe(5)
  })

  test('many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('empty array is 0', () => {
    expect(average([])).toBe(0)
  })
})