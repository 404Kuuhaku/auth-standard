// connectDatabase.ts

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_USERNAME || !process.env.MONGO_PASSWORD) {
	throw new Error(
		"Please set environment variables MONGO_USERNAME, MONGO_PASSWORD"
	);
}

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@auth-standard.42wlo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=auth-standard`;

const connectDatabase = async () => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};

export default connectDatabase;
