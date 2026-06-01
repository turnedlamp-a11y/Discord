import express, { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { generateToken, authenticate } from '../middleware/auth.js';

const router: Router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail(),
    body('username').isLength({ min: 3, max: 32 }),
    body('password').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, username, password } = req.body;

      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        res.status(400).json({ error: 'Email or username already taken' });
        return;
      }

      const user = new User({
        email,
        username,
        password,
        status: 'online',
      });

      await user.save();

      const token = generateToken(user._id.toString());
      res.status(201).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          status: user.status,
        },
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      user.status = 'online';
      user.lastSeen = new Date();
      await user.save();

      const token = generateToken(user._id.toString());
      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          status: user.status,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

router.get('/me', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      id: user._id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      banner: user.banner,
      status: user.status,
      statusMessage: user.statusMessage,
      bio: user.bio,
      nitroSubscription: user.nitroSubscription,
      preferences: user.preferences,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
