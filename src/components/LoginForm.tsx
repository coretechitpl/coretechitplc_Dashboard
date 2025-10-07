import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User, Shield } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

interface LoginFormProps {
  isSignup: boolean;
  onToggle: () => void;
  onLogin: () => void;
}

const RECAPTCHA_SITE_KEY = '6Lc2pNYrAAAAAK0JMMoqNdgjgVasowi8aQlHl3Ql';
const DEMO_EMAIL = 'demo@coretechitplc.com';
const DEMO_PASSWORD = 'Demo@12345';

const LoginForm: React.FC<LoginFormProps> = ({ isSignup, onToggle, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    company: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (submitMessage) setSubmitMessage('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (isSignup) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.company) newErrors.company = 'Company name is required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!recaptchaToken) newErrors.recaptcha = 'Please verify that you are not a robot';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (validateForm()) {
      setIsLoading(true);
      setSubmitMessage('');

      try {
        // Only allow demo credentials for login
        if (!isSignup) {
          if (formData.email !== DEMO_EMAIL || formData.password !== DEMO_PASSWORD) {
            setSubmitMessage('Invalid demo credentials. Please use the demo account.');
            setIsLoading(false);
            return;
          }
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (isSignup) {
          setSubmitMessage('Account created successfully! Please check your email to verify your account.');
          setTimeout(() => {
            setFormData({ email: '', password: '', confirmPassword: '', fullName: '', company: '' });
            setRecaptchaToken(null);
            onToggle();
          }, 3000);
        } else {
          setSubmitMessage('Login successful! Redirecting to dashboard...');
          setTimeout(() => onLogin(), 2000);
        }
      } catch (error) {
        setSubmitMessage('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      borderColor: '#f4c951',
      boxShadow: '0 0 20px rgba(244, 201, 81, 0.3)',
    },
    unfocused: {
      scale: 1,
      borderColor: 'rgba(132, 40, 91, 0.3)',
      boxShadow: '0 0 0px rgba(244, 201, 81, 0)',
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-8 lg:px-0"
    >
      <div className="bg-gradient-to-br from-core-dark/80 to-core-black/80 backdrop-blur-xl border border-core-highlight/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center items-center">
            <a href="https://coretechitplc.com/">
              <img
                src="/logo.png"
                alt="CoreTechIT Logo"
                className="w-36 sm:w-42 h-20 sm:h-22 object-contain"
              />
            </a>
          </div>
        </div>

        {/* Submit Message */}
        {submitMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border text-sm sm:text-base font-inter text-center ${submitMessage.includes('successful') || submitMessage.includes('created')
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
          >
            {submitMessage}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {isSignup && (
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-core-gold/60" />
                  <motion.input
                    variants={inputVariants}
                    whileFocus="focused"
                    initial="unfocused"
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full pl-12 pr-4 py-3 sm:py-3.5 bg-core-black/50 border ${errors.fullName ? 'border-red-500' : 'border-core-highlight/30'} rounded-lg text-core-light placeholder-core-light/40 font-inter focus:outline-none transition-all duration-300 text-sm sm:text-base`}
                  />
                </div>
                {errors.fullName && <p className="text-red-400 text-xs sm:text-sm mt-1 font-inter">{errors.fullName}</p>}
              </div>

              <div>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-core-gold/60" />
                  <motion.input
                    variants={inputVariants}
                    whileFocus="focused"
                    initial="unfocused"
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full pl-12 pr-4 py-3 sm:py-3.5 bg-core-black/50 border ${errors.company ? 'border-red-500' : 'border-core-highlight/30'} rounded-lg text-core-light placeholder-core-light/40 font-inter focus:outline-none transition-all duration-300 text-sm sm:text-base`}
                  />
                </div>
                {errors.company && <p className="text-red-400 text-xs sm:text-sm mt-1 font-inter">{errors.company}</p>}
              </div>
            </div>
          )}

          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-core-gold/60" />
              <motion.input
                variants={inputVariants}
                whileFocus="focused"
                initial="unfocused"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full pl-12 pr-4 py-3 sm:py-3.5 bg-core-black/50 border ${errors.email ? 'border-red-500' : 'border-core-highlight/30'} rounded-lg text-core-light placeholder-core-light/40 font-inter focus:outline-none transition-all duration-300 text-sm sm:text-base`}
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs sm:text-sm mt-1 font-inter">{errors.email}</p>}
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-core-gold/60" />
              <motion.input
                variants={inputVariants}
                whileFocus="focused"
                initial="unfocused"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full pl-12 pr-12 py-3 sm:py-3.5 bg-core-black/50 border ${errors.password ? 'border-red-500' : 'border-core-highlight/30'} rounded-lg text-core-light placeholder-core-light/40 font-inter focus:outline-none transition-all duration-300 text-sm sm:text-base`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-core-gold/60 hover:text-core-gold transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs sm:text-sm mt-1 font-inter">{errors.password}</p>}
          </div>

          {isSignup && (
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-core-gold/60" />
                <motion.input
                  variants={inputVariants}
                  whileFocus="focused"
                  initial="unfocused"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full pl-12 pr-12 py-3 sm:py-3.5 bg-core-black/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-core-highlight/30'} rounded-lg text-core-light placeholder-core-light/40 font-inter focus:outline-none transition-all duration-300 text-sm sm:text-base`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-core-gold/60 hover:text-core-gold transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs sm:text-sm mt-1 font-inter">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(token) => setRecaptchaToken(token)}
            />
          </div>
          {errors.recaptcha && <p className="text-red-400 text-xs sm:text-sm mt-1 font-inter text-center">{errors.recaptcha}</p>}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 sm:py-3.5 bg-gradient-to-r from-core-gold to-core-highlight text-core-black font-inter font-semibold rounded-lg transition-all duration-300 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-core-gold/90 hover:to-core-highlight/90 animate-glow'}`}
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-core-black/30 border-t-core-black rounded-full mr-2"
                />
                {isSignup ? 'Creating Account...' : 'Signing In...'}
              </>
            ) : (
              isSignup ? 'Create Account' : 'Sign In'
            )}
          </motion.button>

          {/* Demo Account Info */}
          {!isSignup && (
            <div className="text-center mt-3">
              <p className="text-core-light/60 text-sm sm:text-base font-inter mb-1">
                Demo Email: <span className="text-core-gold">{DEMO_EMAIL}</span><br />
                Password: <span className="text-core-gold">{DEMO_PASSWORD}</span>
              </p>
            </div>
          )}
        </form>

        {/* Toggle */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-core-light/70 font-inter text-sm sm:text-base">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => { setRecaptchaToken(null); onToggle(); }}
              disabled={isLoading}
              className="ml-2 text-core-gold hover:text-core-gold/80 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
