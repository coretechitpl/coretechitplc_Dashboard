import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please verify that you are not a robot.");
      return;
    }

    // Proceed with form submission (send data to backend)
    console.log("Form submitted with reCAPTCHA token:", captchaToken);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050303] via-[#27061c] to-[#050303] flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#84285b] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[#f4c951] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo + Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-4"
          >
            <a href="https://coretechitplc.com/">
              <img
                src="/Logo.svg"
                alt="CoreTech IT Logo"
                className="w-50 h-24 mx-auto object-contain"
              />
            </a>
          </motion.div>
        </div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#efedf5]/50" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#efedf5] placeholder-[#efedf5]/50 focus:outline-none focus:ring-2 focus:ring-[#84285b] transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#efedf5]/50" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#efedf5] placeholder-[#efedf5]/50 focus:outline-none focus:ring-2 focus:ring-[#84285b] transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#efedf5]/50" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-[#efedf5] placeholder-[#efedf5]/50 focus:outline-none focus:ring-2 focus:ring-[#84285b] transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#efedf5]/50 hover:text-[#efedf5]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#efedf5]/50" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-[#efedf5] placeholder-[#efedf5]/50 focus:outline-none focus:ring-2 focus:ring-[#84285b] transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#efedf5]/50 hover:text-[#efedf5]"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey="6Lc2pNYrAAAAAK0JMMoqNdgjgVasowi8aQlHl3Ql"
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-[#84285b] to-[#f4c951] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-['Inter']"
            >
              Sign Up
            </motion.button>

            {/* Switch to Login */}
            <div className="text-center">
              <p className="text-[#efedf5]/70 text-sm font-['Inter']">
                Already have an account?{" "}
                <button className="text-[#f4c951] hover:text-[#f4c951]/80 font-semibold transition-colors">
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
