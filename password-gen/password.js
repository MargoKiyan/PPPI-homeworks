const LOWER_CHARS = "abcdefghijklmnopqrstuvwxyz";
const UPPER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+[]{}|;:,.<>?";

const MIN_LENGTH = 6;
const MAX_LENGTH = 32;
const DEFAULT_LENGTH = 12;

function buildPool({ useLower, useUpper, useNumbers, useSymbols }) {
  let pool = "";
  if (useLower) pool += LOWER_CHARS;
  if (useUpper) pool += UPPER_CHARS;
  if (useNumbers) pool += NUMBER_CHARS;
  if (useSymbols) pool += SYMBOL_CHARS;

  if (!pool) pool = LOWER_CHARS;

  return pool;
}

function clampLength(length) {
  if (!Number.isFinite(length)) return DEFAULT_LENGTH;
  if (length < MIN_LENGTH) return MIN_LENGTH;
  if (length > MAX_LENGTH) return MAX_LENGTH;
  return Math.floor(length);
}

function generatePassword({ length, useLower, useUpper, useNumbers, useSymbols }) {
  const finalLength = clampLength(length);
  const pool = buildPool({ useLower, useUpper, useNumbers, useSymbols });

  let result = "";
  for (let i = 0; i < finalLength; i += 1) {
    const idx = Math.floor(Math.random() * pool.length);
    result += pool[idx];
  }
  return result;
}

module.exports = {
  generatePassword,
  buildPool,
  CHARSETS: {
    lower: LOWER_CHARS,
    upper: UPPER_CHARS,
    numbers: NUMBER_CHARS,
    symbols: SYMBOL_CHARS,
  },
  LIMITS: {
    MIN_LENGTH,
    MAX_LENGTH,
    DEFAULT_LENGTH,
  },
};
