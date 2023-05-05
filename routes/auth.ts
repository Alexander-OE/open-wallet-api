import { Router } from "express";

import { signIn, signUp } from "../controllers/auth";

export const router = Router();


router.post("/signin", signIn);

router.post("/signup", signUp);




