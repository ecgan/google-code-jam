import { parseProblem } from './parseProblem'
import { solve } from './solve'

const solveCases = (cases) => {
  for (let index = 0; index < cases.length; index++) {
    const result = solve(cases[index])
    console.log(`Case #${index + 1}: ${result}`)
  }
}

const main = () => {
  const readline = require('readline')
  let problem = {
    T: 0,
    cases: [],
    isProcessing: true
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.on('line', (line) => {
    problem = parseProblem(line, problem)

    if (!problem.isProcessing) {
      rl.close()
    }
  }).on('close', () => {
    solveCases(problem.cases)
    process.exit(0)
  })
}

if (!module.parent) {
  main()
}
