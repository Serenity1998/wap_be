import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  icon_code: string;
}

export const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    icon_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = model<IUser>('User', userSchema);

export default User;
export { IUser };
