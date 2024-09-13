// /routes/user.ts

import express, { Request, Response } from "express";
import authenticate from "../middlewares/auth";

const router = express.Router();

router.get("/profile", authenticate, (req: Request, res: Response) => {
	res.json({ message: `Welcome ${req.user?.username}` });
});

export default router;
