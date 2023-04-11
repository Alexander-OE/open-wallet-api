import { Router } from "express";

import { signIn, signUp } from "../controllers/auth";

export const router = Router();

router.post("/auth/users/signin", signIn);

router.post("/auth/users/signup", signUp);


