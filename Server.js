const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Naira Wallet Backend is Running 🚀");
});

// FAKE REGISTER (we will upgrade later)
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  res.json({
    message: "User registered successfully (demo mode)",
    user: { email }
  });
});

// FAKE LOGIN
app.post("/login", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  res.json({
    message: "Login successful (demo mode)",
    token: "demo-token-123"
  });
});

// WALLET BALANCE (FAKE)
app.get("/balance", (req, res) => {
  res.json({
    balance: 1000
  });
});

// PORT (VERY IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
