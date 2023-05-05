import { Router } from "express";
import { checkToken } from "../middleware/checkToken";
import { postCurrency, getCurrency } from "../controllers/wallet";
export const walletRouter = Router();

walletRouter.get("/currencies", getCurrency);
walletRouter.post("/currency", checkToken,  postCurrency);
