'use strict'

//
// solve
//
function solve(prob) {
  let firstArr = prob.numbers.reduce((acc, val, index, array) => {
    if (index % 2 === 0) {
      acc.push(val)
    }
    return acc
  }, [])
    .sort((a, b) => {
      if (a > b) return 1
      if (a < b) return -1
      return 0
    })

  let secondArr = prob.numbers.reduce((acc, val, index, array) => {
    if (index % 2 === 1) {
      acc.push(val)
    }
    return acc
  }, [])
    .sort((a, b) => {
      if (a > b) return 1
      if (a < b) return -1
      return 0
    })

  let mergedArr = []
  for (let i = 0; i < firstArr.length; i++) {
    mergedArr.push(firstArr[i])

    if (i > 0 && gotProblem(mergedArr)) {
      return mergedArr.length - 2
    }

    if (i < secondArr.length) {
      mergedArr.push(secondArr[i])

      if (gotProblem(mergedArr)) {
        return mergedArr.length - 2
      }
    }
  }

  return 'OK'
}

function gotProblem(array) {
  if (array.length < 2) {
    return false
  }

  const last = array[array.length - 1]
  const secondLast = array[array.length - 2]

  if (secondLast > last) {
    return true
  }

  return false
}

//
// processCases
//
function processCases(probs) {
  for (let index = 0; index < probs.length; index++) {
    const result = solve(probs[index]);
    console.log(`Case #${index + 1}: ${result}`)
  }
}

//
// CaseParser
//
class CaseParser {
  constructor() {
    this.numbers = []
    this.state = 'num'
  }

  readline(line) {
    switch(this.state) {
      case 'num': {
        // the line is useless.
        this.state = 'list'
        break
      }

      case 'list': {
        this.numbers = line.split(' ').map(num => parseInt(num))
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
      numbers: this.numbers
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
    this.caseParser = new CaseParser()
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
          this.caseParser = new CaseParser()
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
 
module.exports = solve 
