import React, { useState, useEffect } from 'react';
import { Shield, Mail, Clock, AlertTriangle, CheckCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { otpService } from '../services/OTPService';

interface OTPModalProps {
  isOpen: boolean;
  email: string;
  onVerified: () => void;
  onCancel: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ isOpen, email, onVerified, onCancel }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [otpSent, setOtpSent] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  useEffect(() => {
    if (isOpen && !otpSent) {
      sendOTP();
    }
  }, [isOpen]);

  useEffect(() => {
    if (timeLeft > 0 && otpSent) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, otpSent]);

  const sendOTP = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await otpService.sendOTP(email);
      if (result.success) {
        setOtpSent(true);
        setSuccess(result.message);
        setTimeLeft(300);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = otpService.verifyOTP(email, otp);
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          onVerified();
        }, 1000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setOtp('');
    setError('');
    setSuccess('');
    setOtpSent(false);
    await sendOTP();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Demo helper - show current OTP for testing
  const currentOTP = otpService.getCurrentOTP(email);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-8 max-w-md w-full relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl shadow-yellow-500/20 animate-pulse">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
              Owner Security Verification
            </h2>
            <p className="text-gray-400 text-sm">
              Additional security required for Protocol Creator account
            </p>
          </div>

          {/* Email Display */}
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Mail className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm">OTP sent to:</span>
            </div>
            <div className="text-sm text-gray-300 font-mono">
              📧 {email}
            </div>
          </div>

          {/* Demo OTP Display */}
          {currentOTP && (
            <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400 text-sm">Demo OTP:</span>
                  <span className="text-white font-mono text-lg">{showOTP ? currentOTP : '••••••'}</span>
                </div>
                <button
                  onClick={() => setShowOTP(!showOTP)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {showOTP ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                In production, this would be sent to your email
              </p>
            </div>
          )}

          {/* OTP Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Enter 6-digit OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="w-full px-4 py-3 bg-gray-800/50 border border-yellow-500/20 rounded-xl text-white text-center text-2xl font-mono tracking-widest focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
              maxLength={6}
            />
          </div>

          {/* Timer */}
          {otpSent && timeLeft > 0 && (
            <div className="mb-4 flex items-center justify-center space-x-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>OTP expires in {formatTime(timeLeft)}</span>
            </div>
          )}

          {/* Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>{success}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={verifyOTP}
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify OTP'
              )}
            </button>

            <div className="flex space-x-3">
              <button
                onClick={resendOTP}
                disabled={loading || timeLeft > 240} // Can resend after 1 minute
                className="flex-1 bg-gray-800/50 border border-yellow-500/20 text-yellow-400 py-2 rounded-lg hover:bg-yellow-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Resend OTP</span>
              </button>

              <button
                onClick={onCancel}
                className="flex-1 bg-gray-800/50 border border-gray-500/20 text-gray-400 py-2 rounded-lg hover:bg-gray-500/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Security Info */}
          <div className="mt-6 p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Security Features</span>
            </h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• OTP expires in 5 minutes</li>
              <li>• Maximum 3 verification attempts</li>
              <li>• Sent to registered email only</li>
              <li>• Required for owner account access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;