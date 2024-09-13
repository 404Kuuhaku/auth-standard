// /models/user/User.ts

import { ToSchema } from "../../libs/types";
import mongoose, { Schema, CallbackError } from "mongoose";
import bcrypt from "bcrypt";
import IUser from "./interface";

const userSchema = new Schema<ToSchema<IUser>>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "dev", "admin"],
			default: "user",
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	const user = this;
	//TODOS Delete this or change it
	// if (user.isModified("password")) return next();
	try {
		const salt = await bcrypt.genSalt();
		//TODOS Delete this or change it
		// const salt = 10;
		user.password = await bcrypt.hash(user.password, salt);
		next();
	} catch (error: unknown) {
		if (error instanceof Error) {
			return next(error as CallbackError);
		} else {
			return next(
				new Error(
					"Unknown error occurred during password hashing"
				) as CallbackError
			);
		}
	}
});

userSchema.methods.comparePassword = async function (password: string) {
	return bcrypt.compare(password, this.password);
};

const UserModel =
	mongoose.models.UserModel || mongoose.model("User", userSchema);
export default UserModel;
