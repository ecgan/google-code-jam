'use strict'

//////////////

// call parse() to read the inputs and return list of problems / test cases. 
function parse() {
  const readline = require('readline');
  let t = 0;
  let readState = 't'
  let a = 0 // a is 20 for visible set and 200 for hidden set. 

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (line) => {
    switch (readState) {
      case 't': {
        t = parseInt(line)
        readState = 'a'
        break
      }
      case 'a': {
        a = parseInt(line)
        readState = 'exchange'
        rl.close()
        break
      }
    }
  })
    .on('close', () => {
      if (a === 200) {
        processLarge(t)
      }
      else {
        processSmall(t)
      }
    })
}

//////// Exchange /////////
// a is 20
function getSmallArray() {
  return [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]
}

function processSmall(t) {
  let numExchange = 0
  let currentT = 0
  let array = getSmallArray()
  let currentTarget = { i: 2, j: 2 }

  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (line) => {
    const response = line.split(' ').map(val => parseInt(val))
    const posI = response[0]
    const posJ = response[1]

    if (posI === -1 && posJ === -1) {
      // solution is wrong, or exchange is more than 1000.
      rl.close()
    }
    else if (posI === 0 && posJ === 0) {
      // solution correct!

      // do we have more test case ?
      if (currentT === t) {
        rl.close()
      }

      currentT += 1 // next test case.
      array = getSmallArray()
      currentTarget = { i: 2, j: 2 }
      numExchange = 1
      console.log(`${currentTarget.i} ${currentTarget.j}`)
    }
    else if (posI >= 1 && posI <= 4 && posJ >= 1 && posJ <= 5) {
      array[posI - 1][posJ - 1] = 1

      // do next try. 
      numExchange += 1
      currentTarget = getNextTargetSmall(currentTarget, array)
      console.log(`${currentTarget.i} ${currentTarget.j}`)
    }
    else {

    }
  })
    .on('close', () => {
      process.exit(0)
    })

  // start conversation.
  currentT += 1
  array = getSmallArray()
  currentTarget = { i: 2, j: 2 }
  numExchange = 1
  console.log(`${currentTarget.i} ${currentTarget.j}`)
}

function getNextTargetSmall(currentTarget, array) {
  if (currentTarget.i === 2 && currentTarget.j === 2) {
    if (array[0][0] === 1 && array[0][1] === 1
      && array[1][0] === 1 && array[1][1] === 1) {
      return { i: 3, j: 2 }
    }
  }

  if (currentTarget.i === 3 && currentTarget.j === 2) {
    if (array[2][0] === 1 && array[2][1] === 1
      && array[3][0] === 1 && array[3][1] === 1) {
      return { i: 2, j: 4 }
    }
  }

  if (currentTarget.i === 2 && currentTarget.j === 4) {
    if (array[0][2] === 1 && array[0][3] === 1 && array[0][4] === 1
      && array[1][2] === 1 && array[1][3] === 1 && array[0][4] === 1) {
      return { i: 3, j: 4 }
    }
  }

  return currentTarget
}

////// a is 200 ////////////////
function getLargeArray() {
  return [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]
}

function processLarge(t) {
  let numExchange = 0
  let currentT = 0
  let array = []
  let currentTarget = { i: 2, j: 2 }

  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (line) => {
    const response = line.split(' ').map(val => parseInt(val))
    const posI = response[0]
    const posJ = response[1]

    if (posI === -1 && posJ === -1) {
      // solution is wrong, or exchange is more than 1000.
      rl.close()
    }
    else if (posI === 0 && posJ === 0) {
      // solution correct!

      // do we have more test case ?
      if (currentT === t) {
        rl.close()
      }

      currentT += 1 // next test case.
      array = getLargeArray()
      currentTarget = { i: 2, j: 2 }
      numExchange = 1
      console.log(`${currentTarget.i} ${currentTarget.j}`)
    }
    else if (posI >= 1 && posI <= 40 && posJ >= 1 && posJ <= 5) {
      array[posI - 1][posJ - 1] = 1

      // do next try. 
      numExchange += 1
      currentTarget = getNextTargetLarge(currentTarget, array)
      console.log(`${currentTarget.i} ${currentTarget.j}`)
    }
    else {

    }
  })
    .on('close', () => {
      process.exit(0)
    })

  // start conversation.
  currentT += 1
  array = getLargeArray()
  currentTarget = { i: 2, j: 2 }
  numExchange = 1
  console.log(`${currentTarget.i} ${currentTarget.j}`)

}

function getNextTargetLarge(currentTarget, array) {
  if (currentTarget.j === 2) {
    if (currentTarget.i === 39) {
      if (array[37][0] === 1 && array[37][1] === 1
        && array[38][0] === 1 && array[38][1] === 1
        && array[39][0] === 1 && array[39][1] === 1) {
        return { i: 2, j: 4 }   // jump to column 4.
      }
      else {
        return currentTarget
      }
    }

    if (currentTarget.i === 38) {
      if (array[36][0] === 1 && array[36][1] === 1) {
        return { i: 39, j: 2 }  // jump 1 line to row 39.
      }
      else {
        return currentTarget
      }
    }

    if (currentTarget.i < 38) {
      if (array[currentTarget.i - 2][0] === 1 && array[currentTarget.i - 2][1] === 1
        && array[currentTarget.i - 1][0] === 1 && array[currentTarget.i - 1][1] === 1) {
        return { i: currentTarget.i + 2, j: 2 } // frog jump 2 lines along column 2.
      }
    }

    return currentTarget
  }

  if (currentTarget.j === 4) {
    if (currentTarget.i === 38) {
      if (array[36][2] === 1 && array[36][3] === 1 && array[36][4] === 1) {
        return { i: 39, j: 4 }
      }
    }

    if (currentTarget.i < 38) {
      if (array[currentTarget.i - 2][2] === 1 && array[currentTarget.i - 2][3] === 1 && array[currentTarget.i - 2][4] === 1
        && array[currentTarget.i - 1][2] === 1 && array[currentTarget.i - 1][3] === 1 && array[currentTarget.i - 1][4] === 1) {
        return { i: currentTarget.i + 2, j: 4 }
      }
    }
  }

  return currentTarget
}

//////////////

function main() {
  parse()
}

main()
