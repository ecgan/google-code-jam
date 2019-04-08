'use strict';

const parseCase = (line, data) => {
  const {
    isProcessing,
    ...result
  } = data;
  result.N = line;
  return result;
};

const parseProblem = (line, problem) => {
  if (!problem.T || problem.T === 0) {
    const result = { ...problem,
      T: parseInt(line),
      isProcessing: true
    };
    return result;
  }

  const cases = [...problem.cases];

  if (cases.length === 0 || !cases[cases.length - 1].isProcessing) {
    cases.push({
      isProcessing: true
    });
  }

  const currentCase = cases[cases.length - 1];
  cases[cases.length - 1] = parseCase(line, currentCase);
  const isProcessing = cases.length < problem.T || cases[cases.length - 1].isProcessing;
  const result = { ...problem,
    cases,
    isProcessing
  };
  return result;
};

const solve = data => {
  const {
    N
  } = data;
  const A = [];
  const B = [];
  N.split('').forEach(c => {
    if (c === '4') {
      A.push('2');
      B.push('2');
    } else {
      A.push(c);

      if (B.length > 0) {
        B.push('0');
      }
    }
  });
  const result = `${A.join('')} ${B.join('')}`;
  return result;
};

const solveCases = cases => {
  for (let index = 0; index < cases.length; index++) {
    const result = solve(cases[index]);
    console.log(`Case #${index + 1}: ${result}`);
  }
};

const main = () => {
  const readline = require('readline');

  let problem = {
    T: 0,
    cases: [],
    isProcessing: true
  };
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('line', line => {
    problem = parseProblem(line, problem);

    if (!problem.isProcessing) {
      rl.close();
    }
  }).on('close', () => {
    solveCases(problem.cases);
    process.exit(0);
  });
};

if (!module.parent) {
  main();
}
