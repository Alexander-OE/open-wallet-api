import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({ email, password: hashPassword });
  await user.save();
  res.send("Sucessfully Registered!!!");
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await UserModel.findOne({ email });

  if (!user) return console.log("This user does not exist");

  try {
    const authUser = await bcrypt.compare(password, user.password);

    if (!authUser) {
      return res.send("This user is not authenticated");
    }

      return res.send("This user is authenticated");
    
  } catch (err) {
    console.log(err);

    return res.send("An erro occured");
  }

  res.send("You are free to perform your operations")
};
