const {solve, CaseParser} = require('./solution')

test('1', () => {
  const caseParser = new CaseParser(1)
  caseParser.readline('3 2')
  caseParser.readline('1 1')

  const result = solve(caseParser.getCase())

  expect(result).toBe(100)
})

test('2', () => {
  const caseParser = new CaseParser(2)
  caseParser.readline('10 3')
  caseParser.readline('1 3 2')

  const result = solve(caseParser.getCase())

  expect(result).toBe(100)
})

test('3', () => {
  const caseParser = new CaseParser(3)
  caseParser.readline('6 2')
  caseParser.readline('3 1')

  const result = solve(caseParser.getCase())

  expect(result).toBe(101)
})

test('4', () => {
  const caseParser = new CaseParser(4)
  caseParser.readline('9 8')
  caseParser.readline('1 1 1 1 1 1 1 1')

  const result = solve(caseParser.getCase())

  expect(result).toBe(99)
})


test('5', () => {
  const caseParser = new CaseParser(5)
  caseParser.readline('9 4')
  caseParser.readline('1 1 1 1')

  const result = solve(caseParser.getCase())

  expect(result).toBe(100)
})


test('6', () => {
  const caseParser = new CaseParser(6)
  caseParser.readline('2 1')
  caseParser.readline('1')

  const result = solve(caseParser.getCase())

  expect(result).toBe(100)
})


test('7', () => {
  const caseParser = new CaseParser(7)
  caseParser.readline('3 1')
  caseParser.readline('1')

  const result = solve(caseParser.getCase())

  expect(result).toBe(100)
})
