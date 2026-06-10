#!/usr/bin/env node
"use strict";

/**
 * CLI Calculator
 * Supported operations:
 *  - addition (+)        -> commands: add, addition
 *  - subtraction (-)     -> commands: sub, subtraction
 *  - multiplication (×)  -> commands: mul, multiplication
 *  - division (÷)        -> commands: div, division
 *
 * Usage:
 *   node src/calculator.js add 2 3       # outputs 5
 *   node src/calculator.js div 10 2      # outputs 5
 *
 * The script validates numeric input and exits with a non-zero status on error.
 */

function usage(exitCode = 1) {
  console.error("Usage: calculator.js <operation> <num1> <num2>");
  console.error("Operations: add|addition, sub|subtraction, mul|multiplication, div|division");
  process.exit(exitCode);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function toNumber(n) {
  return Number(n);
}

function run() {
  const [, , op, a, b] = process.argv;

  if (!op || a === undefined || b === undefined) {
    usage(1);
  }

  if (!isNumeric(a) || !isNumeric(b)) {
    console.error("Error: both operands must be numeric.");
    usage(2);
  }

  const x = toNumber(a);
  const y = toNumber(b);
  let result;

  switch (op.toLowerCase()) {
    case "add":
    case "addition":
      result = x + y;
      break;

    case "sub":
    case "subtraction":
      result = x - y;
      break;

    case "mul":
    case "multiplication":
      result = x * y;
      break;

    case "div":
    case "division":
      if (y === 0) {
        console.error("Error: Division by zero is not allowed.");
        process.exit(3);
      }
      result = x / y;
      break;

    default:
      console.error(`Error: unknown operation: ${op}`);
      usage(1);
  }

  // Print numeric result to stdout
  if (Number.isFinite(result)) {
    console.log(result);
    process.exit(0);
  } else {
    console.error("Error: result is not a finite number.");
    process.exit(4);
  }
}

if (require.main === module) {
  run();
}
