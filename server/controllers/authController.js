import User from "../models/User.js";
import OTP from "../models/OTP.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendOTPEmail } from "../utils/sendMail.js";

// Send OTP
export const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const code = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // delete old OTPs for this email
  await OTP.deleteMany({ email });
  await OTP.create({ email, code, expiresAt });

  await sendOTPEmail(email, code);

  res.json({ message: "OTP sent" });
};

// Signup
export const signUp = async (req, res) => {
  const { name, dob, email, otp } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: "User already exists" });

  const otpDoc = await OTP.findOne({ email });
  if (!otpDoc || otpDoc.code !== otp || otpDoc.expiresAt < new Date())
    return res.status(400).json({ error: "Invalid or expired OTP" });

  const newUser = await User.create({ name, dob, email });
  await OTP.deleteOne({ email });
  res.status(201).json({ message: "User created", user: newUser });
};

// Signin
export const signIn = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const otpDoc = await OTP.findOne({ email });
  if (!otpDoc || otpDoc.code !== otp || otpDoc.expiresAt < new Date())
    return res.status(400).json({ error: "Invalid or expired OTP" });

  await OTP.deleteOne({ email });
  res.json({ message: "Login successful", user });
};
