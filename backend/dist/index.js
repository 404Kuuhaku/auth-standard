"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import session  from "express-session"
const connectDatabase_1 = __importDefault(require("./connectDatabase"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const PORT = 8000;
(0, connectDatabase_1.default)();
app.get("/", (req, res) => {
    res.send("what's up man");
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:8888"],
}));
app.use((0, cookie_parser_1.default)());
// app.use(
// 	session({
// 		secret: "secret",
// 		resave: false,
// 		saveUninitialized: true,
// 	})
// );
app.use("/auth", auth_1.default);
app.use("/user", user_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
