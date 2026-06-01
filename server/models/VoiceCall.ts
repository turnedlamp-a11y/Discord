import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IVoiceCall extends Document {
  callerId: Types.ObjectId;
  recipientId: Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  status: 'initiated' | 'ringing' | 'active' | 'ended' | 'declined' | 'missed';
  recordingUrl?: string;
  createdAt: Date;
}

const voiceCallSchema = new Schema<IVoiceCall>(
  {
    callerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: Date,
    duration: Number,
    status: {
      type: String,
      enum: ['initiated', 'ringing', 'active', 'ended', 'declined', 'missed'],
      default: 'initiated',
    },
    recordingUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model<IVoiceCall>('VoiceCall', voiceCallSchema);
