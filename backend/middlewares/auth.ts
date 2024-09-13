// /middlewares/auth.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user/User";
import IUser from "../models/user/interface";

interface UserPayload {
	userId: string;
}

const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Authentication required" });
	}

	try {
		const secretKey = process.env.SECRET_KEY;
		if (!secretKey) {
			throw new Error("SECRET_KEY environment variable is not defined");
		}
		const decodedToken = jwt.verify(token, secretKey) as UserPayload;
		const user = await UserModel.findById(decodedToken.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// req.user = user;
		// TODOS Create a Custom Type Definition , and Delete this line below and use line above
		(req as Request & { user?: IUser }).user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: "Invalid token" });
	}
};

export default authenticate;
