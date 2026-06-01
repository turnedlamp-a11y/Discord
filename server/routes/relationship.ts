import express, { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.js';
import Relationship from '../models/Relationship.js';

const router: Router = express.Router();

router.get('/', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const relationship = await Relationship.findOne({
      $or: [{ userId1: req.userId }, { userId2: req.userId }],
    }).populate(['userId1', 'userId2']);

    if (!relationship) {
      res.status(404).json({ error: 'Relationship not found' });
      return;
    }

    res.json(relationship);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/memories', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, date, imageUrl } = req.body;
    const relationship = await Relationship.findOne({
      $or: [{ userId1: req.userId }, { userId2: req.userId }],
    });

    if (!relationship) {
      res.status(404).json({ error: 'Relationship not found' });
      return;
    }

    relationship.memories.push({
      title,
      description,
      date,
      imageUrl,
      createdAt: new Date(),
    });

    await relationship.save();
    res.status(201).json(relationship);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/anniversaries', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, date, title, description } = req.body;
    const relationship = await Relationship.findOne({
      $or: [{ userId1: req.userId }, { userId2: req.userId }],
    });

    if (!relationship) {
      res.status(404).json({ error: 'Relationship not found' });
      return;
    }

    relationship.anniversaries.push({ type, date, title, description });
    await relationship.save();
    res.status(201).json(relationship);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/notes', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { notes } = req.body;
    const relationship = await Relationship.findOneAndUpdate(
      { $or: [{ userId1: req.userId }, { userId2: req.userId }] },
      { sharedNotes: notes },
      { new: true }
    );

    res.json(relationship);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
