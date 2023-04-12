import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

interface UserDocument {
  email: string;
  password: string;
  generateAuthToken: () => string;
}

const userSchema = new Schema<UserDocument>({
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

export const UserModel = model("User", userSchema);
