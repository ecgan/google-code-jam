'use strict'

//
// solve
//
function solve(prob) {

  if (Number.isInteger(100 / prob.N)) {
    return 100
  }

  if (prob.voteValue - Math.floor(prob.voteValue) >= 0.5) {
    let sumPercent = prob.unvotedCount * Math.ceil(prob.voteValue)
    sumPercent += prob.langPercentRounded.reduce((acc, cur) => acc + cur, 0)
    return sumPercent
  }

  const candidates = prob.langPercentRaw.map((raw, index) => {
    return {
      index: index, 
      fraction: raw - Math.floor(raw)
    }
  })
  .filter(val => {
    return (val.fraction > 0 && val.fraction < 0.5)
  })
  .sort((a, b) => {
    return b.fraction - a.fraction
  })

  let n = prob.N
  let unvotedCount = prob.unvotedCount
  let voteValue = prob.voteValue
  let langCount = prob.langCount
  let langPercentRaw = prob.langPercentRaw
  let langPercentRounded = prob.langPercentRounded

  for (let i = 0; i < candidates.length; i++) {
    while (unvotedCount > 0 && !isEqualMoreThan05(langPercentRaw[candidates[i].index]) ) {
      langCount[candidates[i].index] += 1
      langPercentRaw[candidates[i].index] = getPercentRaw(langCount[candidates[i].index], n)
      unvotedCount -= 1
    }

    langPercentRounded[candidates[i].index] = Math.round(langPercentRaw[candidates[i].index])
  }

  while (unvotedCount > 0) {
    langCount.push(1)
    langPercentRaw.push(voteValue)
    unvotedCount -= 1

    while (unvotedCount > 0 && !isEqualMoreThan05(langPercentRaw[langPercentRaw.length - 1]) ) {
      langCount[langCount.length - 1] += 1
      langPercentRaw[langPercentRaw.length - 1] = getPercentRaw(langCount[langCount.length - 1], n)
      unvotedCount -= 1
    }

    langPercentRounded.push(Math.round(langPercentRaw[langPercentRaw.length - 1]))
  }

  return langPercentRounded.reduce((acc, cur) => acc + cur, 0)
}

function isEqualMoreThan05(value) {
  return (value - Math.floor(value)) >= 0.5
}

function getPercentRaw(count, n) {
  return count / n * 100
}

//
// processCases
//
function processCases(probs) {
  for (let index = 0; index < probs.length; index++) {
    const result = solve(probs[index])
    console.log(`Case #${index + 1}: ${result}`)
  }
}

//
// CaseParser
//
class CaseParser {
  constructor(caseNumber) {
    this.caseNo = caseNumber

    this.N = 0
    this.L = 0
    this.langCount = []
    this.langPercentRaw = []
    this.langPercentRounded = []
    this.votedCount = 0

    this.state = '1'
  }

  readline(line) {
    switch (this.state) {
      case '1': {
        const firstLine = line.split(' ')
        this.N = parseInt(firstLine[0])
        this.L = parseInt(firstLine[1])

        this.state = 'rows'
        break
      }

      case 'rows': {
        const chars = line.split(' ')
        this.langCount = chars.map(char => parseInt(char))
        this.langPercentRaw = this.langCount.map((count) => {
          return count / this.N * 100
        })

        this.langPercentRounded = this.langPercentRaw.map(raw => Math.round(raw))

        this.votedCount = this.langCount.reduce((acc, cur) => {
          return acc + cur
        }, 0)

        this.state = 'done'
        break
      }
    }
  }

  isComplete() {
    return (this.state === 'done')
  }

  getCase() {
    return {
      caseNo: this.caseNo,
      N: this.N,
      L: this.L,
      langCount: this.langCount,
      langPercentRaw: this.langPercentRaw,
      langPercentRounded: this.langPercentRounded,
      votedCount: this.votedCount,
      unvotedCount: this.N - this.votedCount,
      voteValue: 100 / this.N
    }
  }
}

//
// ProblemParser
//
class ProblemParser {
  constructor() {
    this.t = 0
    this.currentT = 0
    this.cases = []
    this.caseParser = new CaseParser(1)
    this.state = 't'
  }

  readline(line) {
    switch (this.state) {
      case 't': {
        this.t = parseInt(line)
        this.state = 'case'
        break
      }
    
      case 'case': {
        this.caseParser.readline(line)

        if (this.caseParser.isComplete()) {
          this.cases.push(this.caseParser.getCase())
          this.currentT += 1
          this.caseParser = new CaseParser(this.currentT + 1)
        }

        break
      }
    }

    if (this.currentT === this.t) {
      this.state = 'done'
    }
  }

  isComplete() {
    return (this.state === 'done')
  }

  getCases() {
    return this.cases
  }
}

//
// Main
//
function main() {
  const readline = require('readline')
  const problemParser = new ProblemParser()

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.on('line', (line) => {
    problemParser.readline(line)

    if (problemParser.isComplete()) {
      rl.close()
    }
  }).on('close', () => {
      processCases(problemParser.getCases())
    }
  )
}

if (!module.parent) {
  main()
}

module.exports = {
  solve,
  CaseParser
}
