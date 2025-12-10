const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/password", (req, res) => {
  const length = Number(req.query.length) || 12;
  const useNumbers = req.query.numbers !== "false";
  const useSymbols = req.query.symbols !== "false";
  const useLower = req.query.lower !== "false";
  const useUpper = req.query.upper !== "false";

  const password = generatePassword({
    length,
    useNumbers,
    useSymbols,
    useLower,
    useUpper,
  });
  res.json({ password });
});

function generatePassword({
  length,
  useNumbers,
  useSymbols,
  useLower,
  useUpper,
}) {
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let pool = "";
  if (useLower) pool += lowerChars;
  if (useUpper) pool += upperChars;
  if (useNumbers) pool += numberChars;
  if (useSymbols) pool += symbolChars;

  if (!pool) pool = lowerChars;

  let result = "";
  for (let i = 0; i < length; i += 1) {
    const idx = Math.floor(Math.random() * pool.length);
    result += pool[idx];
  }
  return result;
}

app.listen(PORT, () => {
  console.log(`Password generator running at http://localhost:${PORT}`);
});
