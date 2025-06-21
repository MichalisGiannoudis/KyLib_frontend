'use client';

import { useContent } from '@/hooks/useContent';
import { AuthContent } from '@/types/content/authContent.interface';
import { useState } from 'react';
import { Spinner } from '../utilites/spinner.component';

export const SignIn = ({ onSignIn, onForgotPassword, onSignUp }: { onSignIn?: (email: string, password: string) => void, onForgotPassword?: () => void, onSignUp?: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const { emailLabel, passwordLabel, signInLabel } = useContent('auth-page') as AuthContent;

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (onSignIn) {
        await onSignIn(email, password);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };  
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4 overflow-hidden">
      <div className="relative z-10 w-full max-w-md">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">KyLib</h1>
          <p className="text-gray-300">{signInLabel}</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">{emailLabel}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors text-white placeholder-gray-400 ${errors.email ? 'border-red-400' : 'border-gray-600'}`}
                placeholder="Enter your email"
                disabled={isLoading}/>
              { errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p> }
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">{passwordLabel}</label>
              <div className="relative">
                <input 
                  id="password" 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors pr-12 text-white placeholder-gray-400 ${errors.password ? 'border-red-400' : 'border-gray-600'}`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  disabled={isLoading}
                >
                  { showPassword ? <img src="/images/auth/show.png" className="h-5 w-5"/> : <img src="/images/auth/hide.png" className="h-5 w-5"/> }
                </button>
              </div>
              { errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p> }
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded-xl border-blue-900 bg-blue-700/50 text-blue-400 focus:ring-blue-400 focus:ring-offset-gray-800" 
                  disabled={isLoading}/>
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <button type="button" onClick={onForgotPassword} className="text-sm text-blue-400 hover:text-blue-300 font-medium" disabled={isLoading}>Forgot password?</button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              { isLoading ? <Spinner/>: 'Sign In' }
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800/80 text-gray-400">Or</span>
              </div>
            </div>
          </div>

          {/* Social Sign In Options */}
          <div className="mt-6 grid ">
            <button 
              type="button" 
              disabled={isLoading}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700/50 text-sm font-medium text-gray-300 hover:bg-gray-600/50 hover:text-white transition-colors"
            >
              <img src="/images/auth/google.png" alt="GitHub" className="h-5 w-5"/>
              <span className="ml-2">Google</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 flex justify-between items-center text-gray-400">
            <div className="flex items-center gap-2">
              <p className="text-left text-sm text-gray-400">Do not have an account?{' '}</p>
              <button type="button" onClick={onSignUp} className=" text-left  text-blue-400 hover:text-blue-300 font-medium" disabled={isLoading}> Sign up </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};