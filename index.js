const express = require("express");
const app = express();

app.use(express.json());

// Temporary in-memory wallet storage
const users = {};

// Home route
app.get("/", (req, res) => {
  res.send("NairaCash API is running 🚀");
});

// Paystack webhook (updates wallet after payment)
app.post("/paystack/webhook", (req, res) => {
  const event = req.body;

  if (event.event === "charge.success") {
    const email = event.data.customer.email;
    const amount = event.data.amount / 100;

    if (!users[email]) {
      users[email] = { balance: 0 };
    }

    users[email].balance += amount;

    console.log("💰 Wallet updated for:", email);
    console.log("New balance:", users[email].balance);
  }

  res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
