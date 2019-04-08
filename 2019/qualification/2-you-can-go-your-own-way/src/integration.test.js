import { parseCase } from './parseCase'
import { solve } from './solve'

test('Google sample 1', () => {
  let data = {}
  data = parseCase('2', data)
  data = parseCase('SE', data)

  const result = solve(data)

  expect(result).toBe('ES')
})

test('Google sample 2 with my own answer', () => {
  let data = {}
  data = parseCase('5', data)
  data = parseCase('EESSSESE', data)

  const result = solve(data)

  expect(result).toBe('SSEEESES')
})
