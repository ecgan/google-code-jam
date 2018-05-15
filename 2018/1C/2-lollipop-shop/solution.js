'use strict'

//
// InteractiveCaseParser
//
class InteractiveCaseParser {
  constructor(caseNumber) {
    this.caseNo = caseNumber
    this.N = 0
    this.currentN = 0
    this.flavors = []
    this.sold = []
    
    this.state = 'N'
  }

  readline(line) {
    if (line === '-1') {
      this.state = 'fail'
      return
    }

    switch (this.state) {
      case 'N': {
        this.N = parseInt(line)
        this.state = 'D'
        break
      }

      case 'D': {
        const chars = line.split(' ')
        const D = parseInt(line[0])
        const flavors = chars
          .filter((val, index) => index !== 0)
          .map(c => parseInt(c))
        this.flavors.push(flavors)

        this.respond(flavors)

        this.currentN += 1

        if (this.currentN === this.N) {
          this.state = 'done'
        }
        break
      }
    }
  }

  respond(flavors) {
    // console.log(flavors)
    
    // logic here
    // write to console.log here
    if (flavors.length === 0) {
      console.log(-1)
      return 
    }

    console.log(2)
  }

  isComplete() {
    return (this.state === 'done')
  }

  isFailed() {
    return (this.state === 'fail')
  }
}

//
// ProblemParser
//
class ProblemParser {
  constructor() {
    this.T = 0
    this.currentT = 0
    this.cases = []
    this.caseParser = new InteractiveCaseParser(1)
    this.state = 'T'
  }

  readline(line) {
    switch (this.state) {
      case 'T': {
        this.T = parseInt(line)
        this.state = 'case'
        break
      }
    
      case 'case': {
        this.caseParser.readline(line)

        if (this.caseParser.isFailed()) {
          this.state = 'fail'
          return
        }

        if (this.caseParser.isComplete()) {
          this.currentT += 1
          this.caseParser = new InteractiveCaseParser(this.currentT + 1)
        }

        break
      }
    }

    if (this.currentT === this.T) {
      this.state = 'done'
    }
  }

  isComplete() {
    return (this.state === 'done')
  }

  isFail() {
    return (this.state === 'fail')
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

    if (problemParser.isComplete() || problemParser.isFail()) {
      rl.close()
    }
  })
  .on('close', () => {
      process.exit(0)
    }
  )
}

if (!module.parent) {
  main()
}

module.exports = {
  InteractiveCaseParser
}

main()