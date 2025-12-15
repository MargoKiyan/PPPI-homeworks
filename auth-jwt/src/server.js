import express from "express";
import dotenv from "dotenv";
import { users } from "./users.js";
import { issueToken, requireAuth, checkRole } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ПР№8 - Виконали: ст. гр. ПД-21 Киян Маргарита / Солдатов Андрій. <br>(Auth API працює. Використовуйте /login, /profile тощо.)");
});


app.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = issueToken(user);

  return res.json({
    access_token: token,
    token_type: "Bearer",
    expires_in: 900 // приблизно 15 хвилин у секундах
  });
});


app.get("/profile", requireAuth, (req, res) => {
  return res.json({
    user_id: req.user.id,
    role: req.user.role
  });
});


app.delete("/users/:id", requireAuth, checkRole(["admin"]), (req, res) => {
  const { id } = req.params;


  return res.json({
    message: `User ${id} deleted (demo)`,
    performed_by: {
      user_id: req.user.id,
      role: req.user.role
    }
  });
});

app.listen(PORT, () => {
  console.log(`Auth API running at http://localhost:${PORT}`);
});
