class OTPService {
  private otpStorage = new Map<string, { otp: string; timestamp: number; attempts: number }>();
  private maxAttempts = 3;
  private otpExpiry = 5 * 60 * 1000; // 5 minutes

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOTP(email: string): Promise<{ success: boolean; message: string }> {
    // Only send OTP for owner email
    if (email !== 'rehanansari4984@gmail.com') {
      return { success: true, message: 'No OTP required for regular users' };
    }

    const otp = this.generateOTP();
    const timestamp = Date.now();

    // Store OTP
    this.otpStorage.set(email, {
      otp,
      timestamp,
      attempts: 0
    });

    // Simulate sending OTP to email
    console.log(`🔐 Phoenix Protocol Security Alert`);
    console.log(`📧 Sending OTP: ${otp} to ${email}`);
    console.log(`⏰ Valid for 5 minutes`);
    
    // In real implementation, this would integrate with email service
    // For demo, we'll show the OTP in console
    
    return {
      success: true,
      message: `OTP sent to ${email}. Check your email inbox.`
    };
  }

  verifyOTP(email: string, enteredOTP: string): { success: boolean; message: string } {
    const otpData = this.otpStorage.get(email);
    
    if (!otpData) {
      return { success: false, message: 'No OTP found. Please request a new one.' };
    }

    // Check if OTP expired
    if (Date.now() - otpData.timestamp > this.otpExpiry) {
      this.otpStorage.delete(email);
      return { success: false, message: 'OTP expired. Please request a new one.' };
    }

    // Check attempts
    if (otpData.attempts >= this.maxAttempts) {
      this.otpStorage.delete(email);
      return { success: false, message: 'Too many failed attempts. Please request a new OTP.' };
    }

    // Verify OTP
    if (otpData.otp === enteredOTP) {
      this.otpStorage.delete(email);
      return { success: true, message: 'OTP verified successfully!' };
    } else {
      otpData.attempts++;
      return { 
        success: false, 
        message: `Invalid OTP. ${this.maxAttempts - otpData.attempts} attempts remaining.` 
      };
    }
  }

  // Get current OTP for demo purposes (remove in production)
  getCurrentOTP(email: string): string | null {
    const otpData = this.otpStorage.get(email);
    return otpData ? otpData.otp : null;
  }
}

export const otpService = new OTPService();