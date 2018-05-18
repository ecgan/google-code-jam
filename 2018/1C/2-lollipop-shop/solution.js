'use strict'

// 
// Polyfill for Array.prototype.includes. 
// Needed for nodejs 4.8.2 on Google Code Jam site.
// 
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      var len = o.length >>> 0;

      if (len === 0) {
        return false;
      }

      var n = fromIndex | 0;

      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      return false;
    }
  });
}

//
// InteractiveCaseSolver
//
class InteractiveCaseSolver {
  constructor() {
    this.N = 0

    // stores all customer-requested flavors. 
    // [customer: [flavors]]
    this.flavors = [] 
    
    // stores the flavor id and requested count. 
    // index is flavor id, and value is count. 
    this.history = []

    // stores the flavors that has been sold, hence not available.
    this.sold = []

    this.state = 'N'
  }

  readline(line) {
    switch (this.state) {
      case 'N': {
        this.N = parseInt(line)
        this.history = Array(this.N).fill(0)
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

        flavors.forEach((f) => { 
          this.history[f] += 1 
        }) 
      }
    }
  }

  solve() {
    let flavors = this.flavors[this.flavors.length - 1]

    // customer likes nothing.  
    // no flavor to sell. 
    if (flavors.length === 0) {
      return -1
    }

    const unsoldFlavors = flavors.filter(f => !this.sold.includes(f)) 
 
    // all sold out, returns -1. 
    if (unsoldFlavors.length === 0) { 
      return -1 
    }

    // only one choice to sell. 
    if (unsoldFlavors.length === 1) { 
      let result = unsoldFlavors[0] 
      this.sold.push(result)
      return result
    }

    // multiple unsold flavors.
    // choose the one that is least requested in history.
    // if there is a tie in request count, 
    // choose the last flavor. 
    let chosen = unsoldFlavors.map((f) => {
      return {
        flavor: f,
        count: this.history[f]
      }
    })
    .reduce((acc, cur) => {
      if (cur.count <= acc.count) {
        return cur
      }

      return acc
    }, { 
      flavor: -1,
      count: 1000
    })
  
    let result = chosen.flavor
    this.sold.push(result)
    return result
  }
}

//
// InteractiveCaseParser
//
class InteractiveCaseParser {
  constructor(caseNumber) {
    this.caseNo = caseNumber
    this.N = 0
    this.currentN = 0

    this.solver = new InteractiveCaseSolver()
    
    this.state = 'N'
  }

  readline(line) {
    // judge says something is wrong.
    // set case to fail and return.
    if (line === '-1') {
      this.state = 'fail'
      return
    }

    switch (this.state) {
      case 'N': {
        this.N = parseInt(line)

        this.solver.readline(line)

        this.state = 'D'
        break
      }

      case 'D': {
        this.solver.readline(line)

        const result = this.solver.solve()
        
        console.log(result)

        this.currentN += 1

        if (this.currentN === this.N) {
          this.state = 'done'
        }
        break
      }
    }
  }
}

//
// ProblemParser
//
class ProblemParser {
  constructor() {
    this.T = 0
    this.currentT = 0
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

        if (this.caseParser.state === 'fail') {
          this.state = 'fail'
          return
        }

        if (this.caseParser.state === 'done') {
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

    if (problemParser.state === 'done' || problemParser.state === 'fail') {
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
  InteractiveCaseParser,
  InteractiveCaseSolver
}
