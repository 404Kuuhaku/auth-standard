"use strict";
// /controllers/auth.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/user/User"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        if (!(req.body.email && req.body.password && req.body.username)) {
            res.status(400).send("All input is required");
        }
        const oldUser = yield User_1.default.findOne({ email: req.body.email });
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
        const user = new User_1.default({
            username,
            email,
            password,
        });
        yield user.save();
        res.json({ message: "Registration successful" });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = yield user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            throw new Error("SECRET_KEY environment variable is not defined");
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, secretKey, {
            expiresIn: "1 hour",
        });
        res.json({ token });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
