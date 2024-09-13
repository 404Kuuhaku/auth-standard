// /controllers/auth.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/user/User";

const register = async (req: Request, res: Response, next: NextFunction) => {
	const { username, email, password } = req.body;

	try {
		if (!(req.body.email && req.body.password && req.body.username)) {
			res.status(400).send("All input is required");
		}

		const oldUser = await UserModel.findOne({ email: req.body.email });

		if (oldUser) {
			return res.status(409).send("User Already Exist. Please Login");
		}
		// const salt = 10;
		// const hashedPassword = await bcrypt.hash(password, salt);
		// const user = new UserModel({
		// 	username,
		// 	email,
		// 	password: hashedPassword,
		// });
		const user = new UserModel({
			username,
			email,
			password,
		});
		await user.save();
		res.json({ message: "Registration successful" });
	} catch (error) {
		next(error);
	}
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	const { username, password } = req.body;

	try {
		const user = await UserModel.findOne({ username });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const passwordMatch = await user.comparePassword(password);
		if (!passwordMatch) {
			return res.status(401).json({ message: "Incorrect password" });
		}

		const secretKey = process.env.SECRET_KEY;
		if (!secretKey) {
			throw new Error("SECRET_KEY environment variable is not defined");
		}
		const token = jwt.sign({ userId: user._id }, secretKey, {
			expiresIn: "1 hour",
		});
		res.json({ token });
	} catch (error) {
		next(error);
	}
};

export { register, login };
