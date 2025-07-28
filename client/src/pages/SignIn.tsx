import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import ContainerImage from "@/assets/container.png";
import axios from "axios";
import logo from "@/assets/logo.png"
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    keepLoggedIn: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!formData.email) {
      toast({ title: "Error", description: "Enter your email", variant: "destructive" });
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/send-otp`, {
        email: formData.email,
      });
      toast({ title: "OTP Sent", description: "Check your email" });
      setOtpSent(true);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.error || "Failed to send OTP",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.otp) {
      toast({ title: "Error", description: "Enter both email and OTP", variant: "destructive" });
      return;
    }

    const res = await signIn(formData.email, formData.otp);
    if (res.success) {
      toast({ title: "Welcome back", description: "Signed in successfully" });
      navigate("/dashboard");
    } else {
      toast({ title: "Error", description: res.message, variant: "destructive" });
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Form Side */}
      <div className="flex md:absolute justify-center md:justify-start w-full md:w-auto top-4 left-4">
    <img src={logo} alt="App Logo" className="w-20 h-16 mt-4 md:mt-0 md:ml-4" />
  </div>

       <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <p className="text-sm text-hd-gray">Login to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-hd-blue">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-12"
              />
            </div>

            {otpSent && (
              <div className="space-y-2">
                <label className="text-sm text-hd-blue">OTP</label>
                <div className="relative">
                  <Input
                    type={showOtp ? "text" : "password"}
                    value={formData.otp}
                    onChange={(e) => handleInputChange("otp", e.target.value)}
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOtp(!showOtp)}
                    className="absolute right-3 top-3 text-hd-gray"
                  >
                    {showOtp ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {!otpSent ? (
              <Button type="button" onClick={handleSendOtp} className="w-full h-12 bg-hd-blue">
                Get OTP
              </Button>
            ) : (
              <>
                <div className="text-left">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-sm text-hd-blue hover:underline"
                  >
                    Resend OTP
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keepLoggedIn"
                    checked={formData.keepLoggedIn}
                    onCheckedChange={(checked) =>
                      handleInputChange("keepLoggedIn", checked as boolean)
                    }
                  />
                  <label htmlFor="keepLoggedIn" className="text-sm text-foreground">
                    Keep me logged in
                  </label>
                </div>

                <Button type="submit" className="w-full h-12">
                  Sign In
                </Button>
              </>
            )}
          </form>

          <div className="text-center">
            <span className="text-sm text-hd-gray">Need an account? </span>
            <Link to="/signup" className="text-sm text-hd-blue hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </div>

      {/* Image Side */}
      <div className="hidden lg:block lg:flex-1 h-screen">
        <img src={ContainerImage} alt="Background" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SignIn;
