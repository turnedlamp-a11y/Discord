import express, { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';

const router: Router = express.Router();

router.get('/:userId', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      id: user._id,
      username: user.username,
      avatar: user.avatar,
      banner: user.banner,
      status: user.status,
      statusMessage: user.statusMessage,
      bio: user.bio,
      nitroSubscription: user.nitroSubscription,
      lastSeen: user.lastSeen,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:userId', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, avatar, banner, status, statusMessage, bio, preferences } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (username) user.username = username;
    if (avatar) user.avatar = avatar;
    if (banner) user.banner = banner;
    if (status) user.status = status;
    if (statusMessage) user.statusMessage = statusMessage;
    if (bio) user.bio = bio;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();

    res.json({
      id: user._id,
      username: user.username,
      avatar: user.avatar,
      banner: user.banner,
      status: user.status,
      statusMessage: user.statusMessage,
      bio: user.bio,
      preferences: user.preferences,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:userId/status', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { status, lastSeen: new Date() },
      { new: true }
    );

    res.json({ status: user?.status });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
