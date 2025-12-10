const { generatePassword, CHARSETS, LIMITS } = require("../password");

describe("generatePassword", () => {
  test("повертає рядок заданої довжини в межах діапазону", () => {
    const options = {
      length: 16,
      useLower: true,
      useUpper: true,
      useNumbers: true,
      useSymbols: false,
    };
    const result = generatePassword(options);

    expect(typeof result).toBe("string");
    expect(result).toHaveLength(16);
  });

  test("якщо всі прапорці false — використовуються малі літери за замовчуванням", () => {
    const options = {
      length: 10,
      useLower: false,
      useUpper: false,
      useNumbers: false,
      useSymbols: false,
    };
    const result = generatePassword(options);

    const allowed = CHARSETS.lower;
    for (const ch of result) {
      expect(allowed.includes(ch)).toBe(true);
    }
  });

  test("довжина обмежується мінімумом і максимумом", () => {
    const tooShort = {
      length: 1,
      useLower: true,
      useUpper: false,
      useNumbers: false,
      useSymbols: false,
    };
    const tooLong = {
      length: 999,
      useLower: true,
      useUpper: true,
      useNumbers: true,
      useSymbols: true,
    };

    const shortPassword = generatePassword(tooShort);
    const longPassword = generatePassword(tooLong);

    expect(shortPassword).toHaveLength(LIMITS.MIN_LENGTH);
    expect(longPassword).toHaveLength(LIMITS.MAX_LENGTH);
  });
});
