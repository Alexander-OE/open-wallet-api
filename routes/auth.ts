import { Router } from "express";

import { authRegister, getAuth } from "../controllers/auth";

export const router = Router();

router.get("/auth/users", getAuth);

router.post("/auth/users", authRegister);

// module.exports = router;
