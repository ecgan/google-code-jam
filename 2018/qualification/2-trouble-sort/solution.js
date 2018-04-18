'use strict'

//////////////

// call parse() to read the inputs and return list of problems / test cases. 
function parse() {
  const readline = require('readline');
  let t = 0;
  let currentT = 0;
  let readState = 't'
  let probs = []

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (line) => {
    switch (readState) {
      case 't': {
        t = parseInt(line)
        readState = 'num'
        break
      }
      case 'num': {
        readState = 'list'
        break
      }
      case 'list': {
        let prob = new Problem()
        prob.numbers = line.split(' ').map(num => parseInt(num))
        probs.push(prob)
        currentT += 1
        readState = 'num'
        break;
      }
    }

    if (currentT === t) {
      rl.close()
    }
  })
    .on('close', () => {
      proc(probs)
    })
}

function proc(probs) {
  for (let index = 0; index < probs.length; index++) {
    const result = solve(probs[index]);
    console.log(`Case #${index + 1}: ${result}`)
  }
}

//////// Solve /////////
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

////////////////////////

function Problem() {
  this.numbers = []
}

//////////////

function main() {
  parse()
}

main()
