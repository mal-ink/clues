const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const USERS_FILE = './users.json';

app.use(cors());
app.use(bodyParser.json());

function loadUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
} 

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;
  const users = loadUsers();

  const exists = users.find(user => user.username === username || user.email === email);
  if (exists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ username, password, email });
  saveUsers(users);
  res.json({ message: 'Signup successful' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', username: user.username });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
