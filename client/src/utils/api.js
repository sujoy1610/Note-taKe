import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Send OTP
export const sendOtp = async (email) => {
  try {
    const res = await axios.post(`${API}/auth/send-otp`, { email });
    return { success: true, message: res.data.message };
  } catch (err) {
    const message = err.response?.data?.error || "Failed to send OTP";
    return { success: false, message };
  }
};

// Sign Up
export const signUp = async ({ name, dob, email, otp }) => {
  try {
    const res = await axios.post(`${API}/auth/signup`, {
      name,
      dob,
      email,
      otp,
    });
    return { success: true, user: res.data.user };
  } catch (err) {
    const message = err.response?.data?.error || "Sign up failed";
    return { success: false, message };
  }
};

// Sign In
export const signIn = async ({ email, otp }) => {
  try {
    const res = await axios.post(`${API}/auth/signin`, { email, otp });
    return { success: true, user: res.data.user };
  } catch (err) {
    const message = err.response?.data?.error || "Login failed";
    return { success: false, message };
  }
};
