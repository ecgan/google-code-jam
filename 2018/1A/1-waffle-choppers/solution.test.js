const {solve, CaseParser} = require('./solution')

test('1', () => {
  const caseParser = new CaseParser(1)
  caseParser.readline('3 6 1 1')
  caseParser.readline('.@@..@')
  caseParser.readline('.....@')
  caseParser.readline('@.@.@@')

  const result = solve(caseParser.getCase())

  expect(result).toBe('POSSIBLE')
})

test('2', () => {
  const caseParser = new CaseParser(2)
  caseParser.readline('4 3 1 1')
  caseParser.readline('@@@')
  caseParser.readline('@.@')
  caseParser.readline('@.@')
  caseParser.readline('@@@')

  const result = solve(caseParser.getCase())

  expect(result).toBe('IMPOSSIBLE')
})

test('3', () => {
  const caseParser = new CaseParser(3)
  caseParser.readline('4 5 1 1')
  caseParser.readline('.....')
  caseParser.readline('.....')
  caseParser.readline('.....')
  caseParser.readline('.....')

  const result = solve(caseParser.getCase())

  expect(result).toBe('POSSIBLE')
})

test('4', () => {
  const caseParser = new CaseParser(4)
  caseParser.readline('4 4 1 1')
  caseParser.readline('..@@')
  caseParser.readline('..@@')
  caseParser.readline('@@..')
  caseParser.readline('@@..')

  const result = solve(caseParser.getCase())

  expect(result).toBe('IMPOSSIBLE')
})

test('5', () => {
  const caseParser = new CaseParser(5)
  caseParser.readline('3 4 2 2')
  caseParser.readline('@.@@')
  caseParser.readline('@@.@')
  caseParser.readline('@.@@')

  const result = solve(caseParser.getCase())

  expect(result).toBe('POSSIBLE')
})

test('6', () => {
  const caseParser = new CaseParser(6)
  caseParser.readline('3 4 1 2')
  caseParser.readline('.@.@')
  caseParser.readline('@.@.')
  caseParser.readline('.@.@')

  const result = solve(caseParser.getCase())

  expect(result).toBe('IMPOSSIBLE')
})