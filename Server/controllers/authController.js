const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: 'Error registering new user', message: error.message });
  }
};

// Login an existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed', message: 'Invalid email or password' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const jwtToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Authentication successful', token: jwtToken });
    } else {
      res.status(401).json({ error: 'Authentication failed', message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in', message: error.message });
  }
};
