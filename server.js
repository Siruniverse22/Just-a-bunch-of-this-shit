const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to register user with email and wallet address
app.post('/register', (req, res) => {
  const { email, walletAddress } = req.body;
  if (!email || !walletAddress) {
    return res.status(400).json({ error: 'Email and wallet address are required' });
  }
  try {
    db.addUser(email, walletAddress);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Endpoint to get all users (for admin or monitoring)
app.get('/users', (req, res) => {
  const users = db.getUsers();
  res.json(users);
});

// Endpoint to log a transaction
app.post('/transaction', (req, res) => {
  const tx = req.body;
  if (!tx || !tx.type || !tx.details) {
    return res.status(400).json({ error: 'Transaction type and details are required' });
  }
  db.addTransaction(tx);
  res.status(201).json({ message: 'Transaction logged' });
});

// Endpoint to get all transactions
app.get('/transactions', (req, res) => {
  const transactions = db.getTransactions();
  res.json(transactions);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
