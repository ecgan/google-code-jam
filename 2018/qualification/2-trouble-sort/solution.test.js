const solve = require('./solution')

test('5 6 8 4 3: OK', () => {
  const prob = { numbers: [5, 6, 8, 4, 3] }
  const result = solve(prob)
  expect(result).toBe('OK')
})

test('8 9 7: 1', () => {  
  const prob = { numbers: [8, 9, 7] }
  const result = solve(prob)
  expect(result).toBe(1)
})
