import express from "express";
import { sendOTP, signIn, signUp } from "../controllers/authController.js";

const router = express.Router();
router.post("/send-otp", sendOTP);
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
