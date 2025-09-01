import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ContainerImage from "@/assets/container.png";
import { sendOtp, signUp } from "@/utils/api";
import logo from "@/assets/logo.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    email: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    const res = await sendOtp(formData.email);
    if (res.success) {
      toast({ title: "OTP Sent", description: "Check your email inbox" });
      setOtpSent(true);
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.dateOfBirth ||
      !formData.otp
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields and enter OTP",
        variant: "destructive",
      });
      return;
    }

    const res = await signUp({
      name: formData.name,
      dob: formData.dateOfBirth,
      email: formData.email,
      otp: formData.otp,
    });

    if (res.success) {
      toast({ title: "Success", description: "Account created successfully!" });
      navigate("/signin");
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex justify-center md:justify-start mb-6">
        <img
          src={logo}
          alt="App Logo"
          className="w-16 h-16 md:ml-4  shadow-lg hover:scale-110 transition-transform duration-300 object-contain"
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Sign up</h1>
            <p className="text-sm text-hd-gray">
              Sign up to enjoy the features of HD
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-hd-gray">Your Name</label>
              <Input
                placeholder="Jonas Khanwald"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-hd-gray">Date of Birth</label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-hd-blue">Email</label>
              <Input
                type="email"
                placeholder="jonas_khanwald@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-12 border-hd-blue focus:border-hd-blue"
              />
            </div>

            {otpSent && (
              <div className="space-y-2">
                <label className="text-sm text-hd-blue">OTP</label>
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={(e) => handleInputChange("otp", e.target.value)}
                  className="h-12"
                />
              </div>
            )}

            {!otpSent ? (
              <Button
                type="button"
                className="w-full h-12 bg-hd-blue hover:bg-hd-blue/90 text-white font-medium"
                onClick={handleSendOtp}
              >
                Get OTP
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-12 bg-hd-blue hover:bg-hd-blue/90 text-white font-medium"
              >
                Sign Up
              </Button>
            )}
          </form>

          <div className="text-center">
            <span className="text-sm text-hd-gray">
              Already have an account?{" "}
            </span>
            <Link to="/signin" className="text-sm text-hd-blue hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:flex-1 h-screen">
        <img
          src={ContainerImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignUp;
