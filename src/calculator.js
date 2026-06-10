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

// Arithmetic functions exported for testing and reuse
function add(a, b) {
  return Number(a) + Number(b);
}

function sub(a, b) {
  return Number(a) - Number(b);
}

function mul(a, b) {
  return Number(a) * Number(b);
}

function div(a, b) {
  const y = Number(b);
  if (y === 0) {
    // Division by zero should be handled by callers; throw for tests
    throw new Error('Division by zero');
  }
  return Number(a) / y;
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

  let result;
  try {
    switch (op.toLowerCase()) {
      case "add":
      case "addition":
        result = add(a, b);
        break;

      case "sub":
      case "subtraction":
        result = sub(a, b);
        break;

      case "mul":
      case "multiplication":
        result = mul(a, b);
        break;

      case "div":
      case "division":
        result = div(a, b);
        break;

      default:
        console.error(`Error: unknown operation: ${op}`);
        usage(1);
    }
  } catch (err) {
    console.error("Error:", err.message);
    // Division by zero returns exit code 3 to preserve previous behavior
    process.exit(3);
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

// Export functions for testing
module.exports = {
  isNumeric,
  toNumber,
  add,
  sub,
  mul,
  div,
};

if (require.main === module) {
  run();
}
