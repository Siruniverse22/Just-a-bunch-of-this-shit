const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if JSON file is empty)
db.defaults({ users: [], transactions: [] }).write();

function addUser(email, walletAddress) {
  const existing = db.get('users').find({ email }).value();
  if (existing) {
    throw new Error('User already exists');
  }
  db.get('users').push({ email, walletAddress, registeredAt: new Date().toISOString() }).write();
}

function getUsers() {
  return db.get('users').value();
}

function addTransaction(tx) {
  db.get('transactions').push({ ...tx, timestamp: new Date().toISOString() }).write();
}

function getTransactions() {
  return db.get('transactions').value();
}

module.exports = {
  addUser,
  getUsers,
  addTransaction,
  getTransactions,
};
