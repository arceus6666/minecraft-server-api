import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
  name: string;
  filename: string;
  type: string;
}

const FileSchema: Schema<IFile> = new Schema({
  name: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

export default mongoose.model<IFile>('File', FileSchema);
