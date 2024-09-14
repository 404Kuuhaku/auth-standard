"use strict";
// /middlewares/auth.ts
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/user/User"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const token = req.headers.authorization?.split(" ")[1];
    // if (!token) {
    // 	return res.status(401).json({ message: "Authentication required" });
    // }
    const authToken = req.cookies.token;
    if (!authToken) {
        return res.status(401).json({ message: "Authentication required" });
    }
    try {
        // const secretKey = process.env.SECRET_KEY;
        // if (!secretKey) {
        // 	throw new Error("SECRET_KEY environment variable is not defined");
        // }
        // const decodedToken = jwt.verify(token, secretKey) as UserPayload;
        // const user = await UserModel.findById(decodedToken.userId);
        // if (!user) {
        // 	return res.status(404).json({ message: "User not found" });
        // }
        // req.user = user;
        // next();
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            throw new Error("SECRET_KEY environment variable is not defined");
        }
        const decodedToken = jsonwebtoken_1.default.verify(authToken, secretKey);
        const user = yield User_1.default.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
});
exports.default = authenticate;
