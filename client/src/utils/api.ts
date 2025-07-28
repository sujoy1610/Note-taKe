import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Types for clarity
interface SignUpData {
  name: string;
  dob: string;
  email: string;
  otp: string;
}

interface SignInData {
  email: string;
  otp: string;
}

// Send OTP
export const sendOtp = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await axios.post(`${API}/auth/send-otp`, { email });
    return { success: true, message: res.data.message };
  } catch (err: any) {
    const message = err.response?.data?.error || "Failed to send OTP";
    return { success: false, message };
  }
};

// Sign Up
export const signUp = async (data: SignUpData): Promise<{ success: boolean; user?: any; message?: string }> => {
  try {
    const res = await axios.post(`${API}/auth/signup`, data);
    return { success: true, user: res.data.user };
  } catch (err: any) {
    const message = err.response?.data?.error || "Sign up failed";
    return { success: false, message };
  }
};

// Sign In
export const signIn = async (data: SignInData): Promise<{ success: boolean; user?: any; message?: string }> => {
  try {
    const res = await axios.post(`${API}/auth/signin`, data);
    return { success: true, user: res.data.user };
  } catch (err: any) {
    const message = err.response?.data?.error || "Login failed";
    return { success: false, message };
  }
};
