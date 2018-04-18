const solve = require('./solution')

test('1 CS: 1', () => {
  const prob = {damage: 1, sequence: Array.from('CS')}
  const result = solve(prob)
  expect(result).toBe(1)
})

test('2 CS: 0', () => {
  const prob = {damage: 2, sequence: Array.from('CS')}
  const result = solve(prob)
  expect(result).toBe(0)
})

test('1 SS: IMPOSSIBLE', () => {
  const prob = {damage: 1, sequence: Array.from('SS')}
  const result = solve(prob)
  expect(result).toBe('IMPOSSIBLE')
})

test('6 SCCSSC: 2', () => {
  const prob = {damage: 6, sequence: Array.from('SCCSSC')}
  const result = solve(prob)
  expect(result).toBe(2)
})

test('2 CC: 0', () => {
  const prob = {damage: 2, sequence: Array.from('CC')}
  const result = solve(prob)
  expect(result).toBe(0)
})

test('3 CSCSS: 5', () => {
  const prob = {damage: 3, sequence: Array.from('CSCSS')}
  const result = solve(prob)
  expect(result).toBe(5)
})
