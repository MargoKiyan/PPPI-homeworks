const express = require("express");
const path = require("path");
const { generatePassword } = require("./password");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

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

app.listen(PORT, () => {
  console.log(`Password generator running at http://localhost:${PORT}`);
});
