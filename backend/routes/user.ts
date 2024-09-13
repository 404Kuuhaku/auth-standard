// /routes/user.ts

import express, { Request, Response } from "express";
import authenticate from "../middlewares/auth"; // Adjust the path if needed
import IUser from "../models/user/interface";

const router = express.Router();

// router.get("/profile", authenticate, (req: Request, res: Response) => {
// 	res.json({ message: `Welcome ${req.user?.username}` });
// });

// TODOS Create a Custom Type Definition , and Delete this line below and use line above
router.get(
	"/profile",
	authenticate,
	(req: Request & { user?: IUser }, res: Response) => {
		res.json({ message: `Welcome ${req.user?.username}` });
	}
);

export default router;
