import React, { useState } from 'react';
import { X, Mail, User, Crown, Github, Youtube, Instagram, Zap, Shield, Sparkles } from 'lucide-react';
import { authService } from '../services/AuthService';
import OTPModal from './OTPModal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (mode === 'signup') {
        result = await authService.signUp(email, name);
      } else {
        result = await authService.signIn(email);
      }

      if (result.requiresOTP) {
        setShowOTP(true);
      } else {
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerified = async () => {
    try {
      await authService.completeOwnerAuth();
      setShowOTP(false);
      onClose();
    } catch (err) {
      setError('Failed to complete authentication');
    }
  };

  const handleOTPCancel = () => {
    authService.cancelOwnerAuth();
    setShowOTP(false);
    setError('');
  };

  const isOwnerEmail = email === 'rehanansari4984@gmail.com';

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 max-w-md w-full relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-pulse"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center animate-pulse">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    {mode === 'signup' ? 'Join Phoenix' : 'Welcome Back'}
                  </h2>
                  <p className="text-sm text-gray-400">Digital Brain Access</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Owner Detection */}
            {isOwnerEmail && (
              <div className="mb-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">Protocol Creator Detected</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Welcome back, Rehan! You'll have full owner privileges and access to all Phoenix Protocol features.
                </p>
                <div className="text-xs text-yellow-400 flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>OTP verification will be required for security</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                    required
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                      required
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-black py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  mode === 'signup' ? 'Create Account' : 'Sign In'
                )}
              </button>
            </form>

            {/* Mode Switch */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => onModeChange(mode === 'signup' ? 'signin' : 'signup')}
                  className="ml-2 text-green-400 hover:text-green-300 transition-colors font-medium"
                >
                  {mode === 'signup' ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            {/* Features */}
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-green-400" />
                <span>Phoenix Protocol Features</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Shield className="w-3 h-3 text-green-400" />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Github className="w-3 h-3 text-purple-400" />
                  <span>GitHub Integration</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Youtube className="w-3 h-3 text-red-400" />
                  <span>YouTube Connect</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Instagram className="w-3 h-3 text-pink-400" />
                  <span>Instagram Link</span>
                </div>
              </div>
            </div>

            {/* Bolt Promo */}
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-blue-400 text-center">
                🚀 Use promo code <span className="font-bold">PHOENIX-REHAN-2024</span> on Bolt for rewards!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <OTPModal
        isOpen={showOTP}
        email={email}
        onVerified={handleOTPVerified}
        onCancel={handleOTPCancel}
      />
    </>
  );
};

export default AuthModal;