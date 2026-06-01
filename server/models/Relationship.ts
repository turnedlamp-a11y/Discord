import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMemory {
  title: string;
  description: string;
  date: Date;
  imageUrl?: string;
  createdAt: Date;
}

export interface IAnniversary {
  type: 'first_meeting' | 'first_date' | 'anniversary' | 'custom';
  date: Date;
  title: string;
  description?: string;
}

export interface IRelationship extends Document {
  userId1: Types.ObjectId;
  userId2: Types.ObjectId;
  startDate: Date;
  memories: IMemory[];
  anniversaries: IAnniversary[];
  sharedAlbum: string[];
  sharedNotes: string;
  sharedTodos: Array<{
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
  }>;
  customBadges: string[];
  achievements: string[];
  createdAt: Date;
  updatedAt: Date;
}

const memorySchema = new Schema<IMemory>(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    imageUrl: String,
  },
  { timestamps: true }
);

const anniversarySchema = new Schema<IAnniversary>({
  type: { type: String, enum: ['first_meeting', 'first_date', 'anniversary', 'custom'], required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  description: String,
});

const relationshipSchema = new Schema<IRelationship>(
  {
    userId1: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userId2: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    memories: [memorySchema],
    anniversaries: [anniversarySchema],
    sharedAlbum: [String],
    sharedNotes: { type: String, default: '' },
    sharedTodos: [
      {
        id: String,
        text: String,
        completed: Boolean,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    customBadges: [String],
    achievements: [String],
  },
  { timestamps: true }
);

export default mongoose.model<IRelationship>('Relationship', relationshipSchema);
