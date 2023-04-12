import { Router } from "express";

import { signIn, signUp, getCurrentUser } from "../controllers/auth";

export const router = Router();

router.get("/me", getCurrentUser);

router.post("/signin", signIn);

router.post("/signup", signUp);


