// Install necessary packages: npm install express bcrypt body-parser cors jsonwebtoken

const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMTIxMjUzNiwiaWF0IjoxNzAxMjEyNTM2fQ.y1Bdg4O2m9_9EdvLeG4h3xKefUsDvEv_tVmy7fzDpuk'; 

app.use(cors());
app.use(bodyParser.json());

const users = [];

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

// User Registration
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store user data
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
});

// User Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(user => user.username === username);

  // Check if the user exists
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Compare the entered password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    // Generate a JWT without expiration
    const token = jwt.sign({ username }, SECRET_KEY);

    return res.status(200).json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});


app.get('/api/secure', verifyToken, (req, res) => {
  // The user is verified if the middleware didn't throw an error
  res.status(200).json({ message: 'Secured page - Only accessible after login' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
