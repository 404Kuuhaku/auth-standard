"use strict";
// /routes/user.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth")); // Adjust the path if needed
const router = express_1.default.Router();
// router.get("/profile", authenticate, (req: Request, res: Response) => {
// 	res.json({ message: `Welcome ${req.user?.username}` });
// });
// TODOS Create a Custom Type Definition , and Delete this line below and use line above
router.get("/profile", auth_1.default, (req, res) => {
    var _a;
    res.json({ message: `Welcome ${(_a = req.user) === null || _a === void 0 ? void 0 : _a.username}` });
});
exports.default = router;
