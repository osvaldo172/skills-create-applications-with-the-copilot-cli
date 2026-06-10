const calc = require('../calculator');

describe('Calculator basic operations', () => {
  test('2 + 3 = 5', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test('10 - 4 = 6', () => {
    expect(calc.sub(10, 4)).toBe(6);
  });

  test('45 * 2 = 90', () => {
    expect(calc.mul(45, 2)).toBe(90);
  });

  test('20 / 5 = 4', () => {
    expect(calc.div(20, 5)).toBe(4);
  });

  test('supports numeric strings as input', () => {
    expect(calc.add('7', '8')).toBe(15);
    expect(calc.sub('10', '3')).toBe(7);
  });

  test('division by zero throws', () => {
    expect(() => calc.div(5, 0)).toThrow(/division by zero/i);
  });

  test('handles floating point numbers', () => {
    expect(calc.add(0.1, 0.2)).toBeCloseTo(0.30000000000000004);
  });
});
