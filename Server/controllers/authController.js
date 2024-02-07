import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { create, findOne } from '../models/User';

// Register a new user
export async function registerUser(req, res) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    const newUser = await create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: 'Error registering new user', message: error.message });
  }
}

// Login an existing user
export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed', message: 'Invalid email or password' });
    }
    const match = await compare(password, user.password);
    if (match) {
      const jwtToken = sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Authentication successful', token: jwtToken });
    } else {
      res.status(401).json({ error: 'Authentication failed', message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in', message: error.message });
  }
}
