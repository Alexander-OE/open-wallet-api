import { Request, Response } from "express";
import { UserModel } from "../models/user";
// import { auth } from "../middleware/auth";
import bcrypt from "bcrypt";

export const signUp = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) return res.status(400).send("User is already registered");
    const hashPassword = await bcrypt.hash(password, 10);
    user = new UserModel({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });
    await user.save();
    // res.send(user)
    const token = user.generateAuthToken();
    res.set("x-auth-token", `Bearer ${token}`);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
  res.status(200).send("Sucessfully Registered!!!");
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password");
  try {
    const decodedPassword = await bcrypt.compare(password, user.password);

    if (!decodedPassword) {
      return res.status(400).send("Inalid email or password");
    }

    
    const token = user.generateAuthToken();

    // return res.send("Welcome Friend😁");

    return res.json({message: "Welcome Friend", data: {email, token}})

  } catch (err) {
    console.log(err);
    return res.status(401).send("An error occured");
  }
};
