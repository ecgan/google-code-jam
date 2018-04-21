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
        readState = 'case'
        break
      }
      case 'case': {
        let values = line.split(' ')
        let prob = new Problem()
        prob.damage = parseInt(values[0])
        prob.sequence = Array.from(values[1])
        probs.push(prob)
        currentT += 1
        break
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
  if (isImposible(prob)) {
    return 'IMPOSSIBLE'
  }

  let minSwap = calculateMinSwap(prob)
  return minSwap
}

function calculateMinSwap(prob) {
  let strengths = []
  for (let index = 0; index < prob.sequence.length; index++) {
    const element = prob.sequence[index];

    if (index === 0) {
      if (element === 'S') {
        strengths.push(1)
      }
      else if (element === 'C') {
        strengths.push(2)
      }
    }
    else {
      if (element === 'S') {
        strengths.push(strengths[index - 1])
      }
      else if (element === 'C') {
        strengths.push(strengths[index - 1] * 2)
      }
    }
  }

  let currentTotalDamage = prob.sequence.map((value, index) => {
    if (value === 'S') {
      return strengths[index]
    }
    return 0
  }).reduce((acc, cur) => {
    return acc + cur
  }, 0)

  if (currentTotalDamage <= prob.damage) {
    return 0
  }

  let minSwap = 0

  while (currentTotalDamage > prob.damage) {
    // start swapping process.
    let lastS = prob.sequence.lastIndexOf('S')
    let lastC = prob.sequence.lastIndexOf('C', lastS)

    while (lastC < lastS) {
      prob.sequence[lastC] = 'S'
      prob.sequence[lastC + 1] = 'C'

      strengths[lastC + 1] = strengths[lastC]
      strengths[lastC] = strengths[lastC] / 2
      
      lastC += 1
      minSwap += 1
      currentTotalDamage = calculateTotalDamage(prob, strengths)

      if (currentTotalDamage <= prob.damage) {
        return minSwap
      }
    }
  }

  return minSwap
}

function calculateTotalDamage(prob, strengths) {
  let currentTotalDamage = prob.sequence.map((value, index) => {
    if (value === 'S') {
      return strengths[index]
    }
    return 0
  }).reduce((acc, cur) => {
    return acc + cur
  }, 0)

  return currentTotalDamage
}

function isImposible(prob) {
  let countS = prob.sequence.filter((s) => s === 'S').length
  if (countS > prob.damage) {
    return true
  }
  return false
}

////////////////////////

function Problem() {
  this.damage = 0
  this.sequence = []
}

//////////////

function main() {
  parse()
}

if (!module.parent) { 
  main() 
} 
 
module.exports = solve 
