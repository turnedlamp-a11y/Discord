import express, { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.js';
import Message from '../models/Message.js';

const router: Router = express.Router();

router.get('/:recipientId', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 50, skip = 0 } = req.query;

    const messages = await Message.find({
      $or: [
        { senderId: req.userId, recipientId: req.params.recipientId },
        { senderId: req.params.recipientId, recipientId: req.userId },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip))
      .populate('senderId', 'username avatar')
      .populate('replyTo');

    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { recipientId, content, fileUrl, fileType = 'text' } = req.body;

    const message = new Message({
      senderId: req.userId,
      recipientId,
      content,
      fileUrl,
      fileType,
      read: false,
    });

    await message.save();
    await message.populate('senderId', 'username avatar');

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:messageId', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { content } = req.body;
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }

    if (message.senderId.toString() !== req.userId) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    message.content = content;
    message.edited = true;
    message.editedAt = new Date();
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:messageId', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }

    if (message.senderId.toString() !== req.userId) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    await Message.deleteOne({ _id: req.params.messageId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:messageId/reactions', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const { emoji } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      {
        $push: {
          reactions: { emoji, userId: req.userId },
        },
      },
      { new: true }
    );

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:messageId/read', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      { read: true, readAt: new Date() },
      { new: true }
    );

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
