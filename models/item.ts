import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  position: number;
  created_at: Date;
}

const ItemSchema: Schema<IItem> = new Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true,
    unique: true
  },
  created_at: {
    type: Date,
    required: true
  }
});

export default mongoose.model<IItem>('Item', ItemSchema);
