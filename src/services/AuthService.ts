import { User, AuthState } from '../types';
import { otpService } from './OTPService';

interface UserData {
  id: string;
  email: string;
  name: string;
  isOwner: boolean;
  joinDate: string;
}

class AuthService {
  private currentUser: User | null = null;
  private listeners: ((authState: AuthState) => void)[] = [];
  private pendingOwnerAuth: { email: string; name: string } | null = null;
  private registeredUsers: UserData[] = [];

  constructor() {
    this.loadUserFromStorage();
    this.loadRegisteredUsers();
  }

  private loadUserFromStorage() {
    try {
      const userData = localStorage.getItem('phoenix-user');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  private loadRegisteredUsers() {
    try {
      const usersData = localStorage.getItem('phoenix-registered-users');
      if (usersData) {
        this.registeredUsers = JSON.parse(usersData);
      }
    } catch (error) {
      console.error('Error loading registered users:', error);
    }
  }

  private saveUserToStorage(user: User) {
    try {
      localStorage.setItem('phoenix-user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  private saveRegisteredUsers() {
    try {
      localStorage.setItem('phoenix-registered-users', JSON.stringify(this.registeredUsers));
    } catch (error) {
      console.error('Error saving registered users:', error);
    }
  }

  private addToRegisteredUsers(user: User) {
    const userData: UserData = {
      id: user.id,
      email: user.isOwner ? user.email : this.maskEmail(user.email),
      name: user.name,
      isOwner: user.isOwner,
      joinDate: user.stats.joinDate.toISOString()
    };

    // Only owner can see this data
    if (this.currentUser?.isOwner) {
      const existingIndex = this.registeredUsers.findIndex(u => u.id === user.id);
      if (existingIndex >= 0) {
        this.registeredUsers[existingIndex] = userData;
      } else {
        this.registeredUsers.push(userData);
      }
      this.saveRegisteredUsers();
    }
  }

  private maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    const maskedUsername = username.length > 2 
      ? username.substring(0, 2) + '*'.repeat(username.length - 2)
      : username;
    return `${maskedUsername}@${domain}`;
  }

  private notifyListeners() {
    const authState: AuthState = {
      isAuthenticated: !!this.currentUser,
      user: this.currentUser,
      loading: false
    };
    this.listeners.forEach(listener => listener(authState));
  }

  subscribe(listener: (authState: AuthState) => void) {
    this.listeners.push(listener);
    // Immediately call with current state
    this.notifyListeners();
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  async signUp(email: string, name: string): Promise<{ requiresOTP: boolean; user?: User }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const isOwner = email === 'rehanansari4984@gmail.com';
    
    if (isOwner) {
      // Store pending auth for OTP verification
      this.pendingOwnerAuth = { email, name };
      return { requiresOTP: true };
    }

    // Check if user already exists
    const existingUser = this.registeredUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists. Please sign in instead.');
    }

    // Regular user - no OTP required
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      isOwner: false,
      linkedAccounts: {},
      preferences: {
        theme: 'galaxy',
        aiModel: 'phoenix',
        notifications: true
      },
      stats: {
        totalSessions: 1,
        codeExecutions: 0,
        downloads: 0,
        memoryEntries: 0,
        joinDate: new Date()
      }
    };

    this.currentUser = newUser;
    this.saveUserToStorage(newUser);
    this.addToRegisteredUsers(newUser);
    this.notifyListeners();
    
    return { requiresOTP: false, user: newUser };
  }

  async signIn(email: string): Promise<{ requiresOTP: boolean; user?: User }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const isOwner = email === 'rehanansari4984@gmail.com';
    
    if (isOwner) {
      // Store pending auth for OTP verification
      this.pendingOwnerAuth = { email, name: 'Rehan (Protocol Creator)' };
      return { requiresOTP: true };
    }

    // Check if user exists in registered users
    const existingUserData = this.registeredUsers.find(u => u.email === email);
    if (!existingUserData) {
      throw new Error('User not found. Please sign up first.');
    }

    // Create user session
    const user: User = {
      id: existingUserData.id,
      email,
      name: existingUserData.name,
      isOwner: false,
      linkedAccounts: {},
      preferences: {
        theme: 'galaxy',
        aiModel: 'phoenix',
        notifications: true
      },
      stats: {
        totalSessions: 1,
        codeExecutions: 0,
        downloads: 0,
        memoryEntries: 0,
        joinDate: new Date(existingUserData.joinDate)
      }
    };

    this.currentUser = user;
    this.saveUserToStorage(user);
    this.notifyListeners();
    
    return { requiresOTP: false, user };
  }

  async completeOwnerAuth(): Promise<User> {
    if (!this.pendingOwnerAuth) {
      throw new Error('No pending owner authentication');
    }

    const { email, name } = this.pendingOwnerAuth;
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      isOwner: true,
      linkedAccounts: {
        github: 'REHAN2050',
        youtube: '@brndxanm',
        instagram: '@brndxanm'
      },
      preferences: {
        theme: 'galaxy',
        aiModel: 'phoenix',
        notifications: true
      },
      stats: {
        totalSessions: 1,
        codeExecutions: 0,
        downloads: 0,
        memoryEntries: 0,
        joinDate: new Date()
      }
    };

    this.currentUser = newUser;
    this.pendingOwnerAuth = null;
    this.saveUserToStorage(newUser);
    this.addToRegisteredUsers(newUser);
    this.notifyListeners();
    
    return newUser;
  }

  getPendingOwnerAuth() {
    return this.pendingOwnerAuth;
  }

  cancelOwnerAuth() {
    this.pendingOwnerAuth = null;
  }

  async linkAccount(platform: string, username: string): Promise<void> {
    if (!this.currentUser) throw new Error('No user logged in');

    this.currentUser.linkedAccounts = {
      ...this.currentUser.linkedAccounts,
      [platform]: username
    };

    this.saveUserToStorage(this.currentUser);
    this.notifyListeners();
  }

  async updatePreferences(preferences: Partial<User['preferences']>): Promise<void> {
    if (!this.currentUser) throw new Error('No user logged in');

    this.currentUser.preferences = {
      ...this.currentUser.preferences,
      ...preferences
    };

    this.saveUserToStorage(this.currentUser);
    this.notifyListeners();
  }

  async updateStats(statUpdate: Partial<User['stats']>): Promise<void> {
    if (!this.currentUser) throw new Error('No user logged in');

    this.currentUser.stats = {
      ...this.currentUser.stats,
      ...statUpdate
    };

    this.saveUserToStorage(this.currentUser);
    this.addToRegisteredUsers(this.currentUser);
    this.notifyListeners();
  }

  signOut(): void {
    this.currentUser = null;
    this.pendingOwnerAuth = null;
    localStorage.removeItem('phoenix-user');
    this.notifyListeners();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  isOwner(): boolean {
    return this.currentUser?.isOwner || false;
  }

  getBoltPromoCode(): string {
    return 'PHOENIX-REHAN-2024';
  }

  // Owner-only method to get registered users
  getRegisteredUsers(): UserData[] {
    if (!this.currentUser?.isOwner) {
      throw new Error('Access denied. Owner privileges required.');
    }
    return this.registeredUsers;
  }

  // Owner-only method to get user statistics
  getUserStats() {
    if (!this.currentUser?.isOwner) {
      throw new Error('Access denied. Owner privileges required.');
    }
    
    return {
      totalUsers: this.registeredUsers.length,
      regularUsers: this.registeredUsers.filter(u => !u.isOwner).length,
      ownerUsers: this.registeredUsers.filter(u => u.isOwner).length,
      recentSignups: this.registeredUsers.filter(u => {
        const joinDate = new Date(u.joinDate);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return joinDate > weekAgo;
      }).length
    };
  }
}

export const authService = new AuthService();