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

function modulo(a, b) {
  const y = Number(b);
  if (y === 0) {
    throw new Error('Modulo by zero');
  }
  return Number(a) % y;
}

function power(base, exponent) {
  return Math.pow(Number(base), Number(exponent));
}

function squareRoot(n) {
  const x = Number(n);
  if (x < 0) {
    throw new Error('Square root of negative number');
  }
  return Math.sqrt(x);
}

function run() {
  const [, , op, a, b] = process.argv;
  const opLower = op && op.toLowerCase();
  const unaryOps = new Set(["sqrt", "squareroot"]);

  if (!op || (unaryOps.has(opLower) ? a === undefined : (a === undefined || b === undefined))) {
    usage(1);
  }

  if (unaryOps.has(opLower)) {
    if (!isNumeric(a)) {
      console.error("Error: operand must be numeric.");
      usage(2);
    }
  } else {
    if (!isNumeric(a) || !isNumeric(b)) {
      console.error("Error: both operands must be numeric.");
      usage(2);
    }
  }

  let result;
  try {
    switch (opLower) {
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

      case "mod":
      case "modulo":
        result = modulo(a, b);
        break;

      case "pow":
      case "power":
        result = power(a, b);
        break;

      case "sqrt":
      case "squareroot":
        result = squareRoot(a);
        break;

      default:
        console.error(`Error: unknown operation: ${op}`);
        usage(1);
    }
  } catch (err) {
    console.error("Error:", err.message);
    // Arithmetic errors (division/modulo by zero, sqrt negative) return exit code 3
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
  modulo,
  power,
  squareRoot,
};

if (require.main === module) {
  run();
}
