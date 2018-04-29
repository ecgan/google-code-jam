'use strict'

//
// solve
// should only return 'POSSIBLE' or 'IMPOSSIBLE'
//
function solve(prob) {
  if (prob.numChips === 0) {
    return 'POSSIBLE'
  }

  const chipsPerPiece = prob.numChips / prob.numPieces
  if (!Number.isInteger(chipsPerPiece)) {
    return 'IMPOSSIBLE'
  }

  // start row processing
  const HChipCount = prob.numChips / (prob.H + 1)
  let cumuRowCutChips = 0
  let rowCut = []
  for (let i = 0; i < prob.R; i++) {
    cumuRowCutChips += prob.rowChips[i]

    if (cumuRowCutChips === HChipCount) {
      rowCut.push(i)
      cumuRowCutChips = 0
    }

    if (cumuRowCutChips > HChipCount) {
      return 'IMPOSSIBLE'
    }
  }

  if (rowCut.length !== prob.H + 1) {
    return 'IMPOSSIBLE'
  }

  // get pieceChips set to all 0.
  let pieceChips = rowCut.map(rc => 0)

  // start column and piece processing 
  const VChipCount = prob.numChips / (prob.V + 1)
  let cumuColCutChips = 0
  let colCut = []
  for (let j = 0; j < prob.C; j++) {
    cumuColCutChips += prob.colChips[j]

    let rowCutIndex = 0
    for (let i = 0; i < prob.R; i++) {
      if (prob.rows[i][j] === '@') {
        pieceChips[rowCutIndex] += 1
      }

      if (i === rowCut[rowCutIndex]) {
        rowCutIndex += 1
      }
    }

    if (cumuColCutChips === VChipCount) {      
      if (!pieceChips.every(pieceChip => pieceChip === chipsPerPiece)) {
        return 'IMPOSSIBLE'
      }

      colCut.push(j)
      cumuColCutChips = 0
      pieceChips = rowCut.map(rc => 0)
    }

    if (cumuColCutChips > VChipCount) {
      return 'IMPOSSIBLE'
    }
  }

  if (colCut.length !== prob.V + 1) {
    return 'IMPOSSIBLE'
  }

  return 'POSSIBLE'
}

function canSimpleDivide(numChips, numPieces) {
  if (numChips % numPieces !== 0) {
    return false
  }
  return true
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
    this.R = 0
    this.C = 0
    this.H = 0
    this.V = 0
    this.rows = []

    this.rowChips = []
    this.colChips = []
    this.numChips = 0
    this.numPieces = 0

    this.currentR = 0
    this.state = '1'
  }

  readline(line) {
    switch (this.state) {
      case '1': {
        const firstLine = line.split(' ')
        this.R = parseInt(firstLine[0])
        this.C = parseInt(firstLine[1])
        this.H = parseInt(firstLine[2])
        this.V = parseInt(firstLine[3])

        for (let i = 0; i < this.C; i++) {
          this.colChips.push(0)
        }

        this.numPieces = (this.H + 1) * (this.V + 1)

        this.state = 'rows'
        break
      }

      case 'rows': {
        const chars = line.split('')
        this.rows.push(chars)

        const chipCount = chars.filter(char => char === '@').length
        this.rowChips.push(chipCount)

        for (let i = 0; i < chars.length; i++) {
          if (chars[i] === '@') {
            this.colChips[i] += 1
          }
        }

        this.numChips += chipCount

        this.currentR += 1

        if (this.currentR === this.R) {
          this.state = 'done'
        }
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
      R: this.R,
      C: this.C,
      H: this.H, 
      V: this.V,
      rows: this.rows,
      rowChips: this.rowChips,
      colChips: this.colChips,
      numChips: this.numChips,
      numPieces: this.numPieces
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
