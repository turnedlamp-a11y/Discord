import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReaction {
  emoji: string;
  userId: Types.ObjectId;
  createdAt: Date;
}

export interface IMessage extends Document {
  senderId: Types.ObjectId;
  recipientId: Types.ObjectId;
  content?: string;
  fileUrl?: string;
  fileType: 'text' | 'image' | 'video' | 'audio' | 'file' | 'gif';
  reactions: IReaction[];
  replyTo?: Types.ObjectId;
  edited: boolean;
  editedAt?: Date;
  pinned: boolean;
  pinnedAt?: Date;
  read: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reactionSchema = new Schema<IReaction>(
  {
    emoji: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: String,
    fileUrl: String,
    fileType: {
      type: String,
      enum: ['text', 'image', 'video', 'audio', 'file', 'gif'],
      default: 'text',
    },
    reactions: [reactionSchema],
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
    edited: {
      type: Boolean,
      default: false,
    },
    editedAt: Date,
    pinned: {
      type: Boolean,
      default: false,
    },
    pinnedAt: Date,
    read: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
  },
  { timestamps: true }
);

messageSchema.index({ senderId: 1, recipientId: 1, createdAt: -1 });
messageSchema.index({ pinned: 1 });

export default mongoose.model<IMessage>('Message', messageSchema);
