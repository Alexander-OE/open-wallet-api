import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/auth";
import {walletRouter } from "./routes/wallet"

const app = express();
app.use(express.json());
app.use(router);

mongoose
  .connect("mongodb://127.0.0.1:27017/walletDB")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/auth/users",router);
app.use("/wallet/", walletRouter);


app.listen(4000, () => {
  console.log("Server started at 4000");
});
