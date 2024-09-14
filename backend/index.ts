// index.ts
import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import session  from "express-session"
import connectDatabase from "./connectDatabase";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

const app: Express = express();
const PORT = 8000;
connectDatabase();



app.get("/", (req: Request, res: Response) => {
	res.send("what's up man");
});

app.use(express.json());

app.use(
	cors({
		credentials: true,
		origin: ["http://localhost:8888"],
	})
);

app.use(cookieParser());

// app.use(
// 	session({
// 		secret: "secret",
// 		resave: false,
// 		saveUninitialized: true,
// 	})
// );

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
