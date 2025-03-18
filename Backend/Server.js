const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const JWT_SECRET = "my_testing_secret_key_123"; // Use environment variables in production

app.use(express.json()); // Parse JSON requests
const corsOptions = {
  origin: "http://localhost:5173", // Adjust if your frontend runs on a different port
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

// Dummy user database
const users = [{ username: "test", password: "123456" }];

// Login Route
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt received");
  // Check if username & password match
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT Token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
