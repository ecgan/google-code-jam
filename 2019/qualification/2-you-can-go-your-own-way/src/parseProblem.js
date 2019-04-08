import { parseCase } from './parseCase'

export const parseProblem = (line, problem) => {
  if (!problem.T || problem.T === 0) {
    const result = {
      ...problem,
      T: parseInt(line),
      isProcessing: true
    }

    return result
  }

  const cases = [...problem.cases]

  if (cases.length === 0 || !cases[cases.length - 1].isProcessing) {
    cases.push({
      isProcessing: true
    })
  }

  const currentCase = cases[cases.length - 1]
  cases[cases.length - 1] = parseCase(line, currentCase)

  const isProcessing = (cases.length < problem.T || cases[cases.length - 1].isProcessing)

  const result = {
    ...problem,
    cases,
    isProcessing
  }

  return result
}
