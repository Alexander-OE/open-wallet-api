import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { auth } from "../middleware/auth";
import bcrypt from "bcrypt";

export const getCurrentUser = (req: Request, auth: any, res: Response) => {};

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  if (user) return res.status(400).send("User is already registered");
  const hashPassword = await bcrypt.hash(password, 10);
  user = new UserModel({ email, password: hashPassword });
  await user.save();

  res.send("Sucessfully Registered!!!");
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await UserModel.findOne({ email });

  if (!user) return res.status(400).send("Inalid email or password");

  try {
    const authUser = await bcrypt.compare(password, user.password);

    if (!authUser) {
      return res.status(400).send("Inalid email or password");
    }
    const token = user.generateAuthToken();
    res.set("x-auth-token", `Bearer ${token}`);

    return res.send("Welcome Friend😁");
  } catch (err) {
    console.log(err);
    return res.send("An erro occured");
  }
};
