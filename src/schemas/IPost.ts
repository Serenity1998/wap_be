import { Schema, model, Document } from 'mongoose';
import { IUser, userSchema } from './IUser';

interface IPost extends Document {
  title: string;
  content: string;
  tags: string[];
  user: IUser;
  imageUrl: string;
  up: number;
  down: number;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: false,
    },
    user: {
      type: userSchema,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    up: {
      type: Number,
      required: true,
    },
    down: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Post = model<IPost>('Post', postSchema);

export default Post;
export { IPost };
