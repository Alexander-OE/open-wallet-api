import { Request, Response } from "express";
import { UserModel } from "../models/user";

export const getAuth = (req: Request, res: Response) => {
  res.send("Get page");
};

export const authRegister = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = new UserModel({ email, password });
  await user.save();
  res.send("Sucessfully Registered!!!");
};
