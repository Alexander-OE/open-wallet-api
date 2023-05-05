import { Schema, model, Types } from "mongoose";
import jwt from "jsonwebtoken";

interface UserDocument {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  generateAuthToken: () => string;
}

const userSchema = new Schema<UserDocument>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ _id: this._id }, "jwtPrivateKey");
  return token;
};

export const UserModel = model<UserDocument>("User", userSchema);
