"use strict";
// /routes/user.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.get("/profile", auth_1.default, (req, res) => {
    var _a, _b, _c;
    res.json({
        message: `Welcome ${(_a = req.user) === null || _a === void 0 ? void 0 : _a.username}`,
        username: (_b = req.user) === null || _b === void 0 ? void 0 : _b.username,
        email: (_c = req.user) === null || _c === void 0 ? void 0 : _c.email,
    });
});
exports.default = router;
