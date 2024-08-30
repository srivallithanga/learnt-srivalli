const isPrime = require('../prime');

test('check if -1 is prime', () => {
    expect(isPrime(-1)).toBe(false);
});

test('check if 0 is prime', () => {
    expect(isPrime(0)).toBe(false);
});

test('check if 1 is prime', () => {
    expect(isPrime(1)).toBe(false);
});

test('check if 2 is prime', () => {
    expect(isPrime(2)).toBe(true);
});

test('check if 3 is prime', () => {
    expect(isPrime(3)).toBe(true);
});

test('check if 4 is prime', () => {
    expect(isPrime(4)).toBe(false);
});

test('check if 5 is prime', () => {
    expect(isPrime(5)).toBe(true);
});

test('check if 49 is prime', () => {
    expect(isPrime(49)).toBe(false);
});

test('check if 97 is prime', () => {
    expect(isPrime(97)).toBe(true);
});