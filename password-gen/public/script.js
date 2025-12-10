const passwordInput = document.getElementById("password");
const copyButton = document.getElementById("copy");
const generateButton = document.getElementById("generate");
const lengthInput = document.getElementById("length");
const lengthLabel = document.getElementById("length-label");
const lowerCheckbox = document.getElementById("lower");
const upperCheckbox = document.getElementById("upper");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

function updateLengthLabel() {
  lengthLabel.textContent = lengthInput.value;
}

function buildPool() {
  let pool = "";
  if (lowerCheckbox.checked) pool += lowerChars;
  if (upperCheckbox.checked) pool += upperChars;
  if (numbersCheckbox.checked) pool += numberChars;
  if (symbolsCheckbox.checked) pool += symbolChars;
  if (!pool) pool = lowerChars;
  return pool;
}

function generatePassword() {
  const length = Number(lengthInput.value);
  const pool = buildPool();
  let password = "";
  for (let i = 0; i < length; i += 1) {
    const idx = Math.floor(Math.random() * pool.length);
    password += pool[idx];
  }
  passwordInput.value = password;
}

function copyPassword() {
  if (!passwordInput.value) {
    copyButton.textContent = "Нічого копіювати";
    setTimeout(() => (copyButton.textContent = "Копіювати"), 1200);
    return;
  }
  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => {
      copyButton.textContent = "Скопійовано!";
      setTimeout(() => (copyButton.textContent = "Копіювати"), 1200);
    })
    .catch(() => {
      copyButton.textContent = "Спробуйте ще раз";
      setTimeout(() => (copyButton.textContent = "Копіювати"), 1200);
    });
}

lengthInput.addEventListener("input", () => {
  updateLengthLabel();
});

generateButton.addEventListener("click", () => {
  generatePassword();
});

copyButton.addEventListener("click", () => {
  copyPassword();
});

updateLengthLabel();
generatePassword();
