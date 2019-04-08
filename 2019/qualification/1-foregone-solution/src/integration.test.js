import { parseCase } from './parseCase'
import { solve } from './solve'

test('Google sample 1 with my own answer', () => {
  let data = {}
  data = parseCase('4', data)

  const result = solve(data)

  expect(result).toBe('2 2')
})

test('Google sample 2 with my own answer', () => {
  let data = {}
  data = parseCase('940', data)

  const result = solve(data)

  expect(result).toBe('920 20')
})

test('Google sample 3 with my own answer', () => {
  let data = {}
  data = parseCase('4444', data)

  const result = solve(data)

  expect(result).toBe('2222 2222')
})

test('', () => {
  let data = {}
  data = parseCase('124124', data)

  const result = solve(data)

  expect(result).toBe('122122 2002')
})

test('', () => {
  let data = {}
  data = parseCase('404', data)

  const result = solve(data)

  expect(result).toBe('202 202')
})

test('', () => {
  let data = {}
  data = parseCase('1004104', data)

  const result = solve(data)

  expect(result).toBe('1002102 2002')
})
