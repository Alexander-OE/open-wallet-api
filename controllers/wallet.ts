import { Request, Response } from "express";
import { WalletModel } from "../models/wallet";
import { UserModel } from "../models/user";


interface tokenRequest extends Request {
  userData: { _id: string };
}


export const getCurrency = async (req: Request, res: Response) => {
  const newWallet = await WalletModel.find().populate("userId");
  res.send(newWallet)
}


export const postCurrency = async (req: Request, res: Response) => {
  const { currency, amount } = req.body;

  const {_id: userId} = (req as tokenRequest).userData;

  console.log(userId)

  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new wallet document and set its user ID field
    const newWallet = new WalletModel({ currency, amount, userId: user._id });

    // Save the new wallet document
    const savedWallet = await newWallet.save();

    // Return the saved wallet document as the response
    res.status(201).json(savedWallet);
  } catch (error) {
    res.status(400).json(error);
  };

  
};
