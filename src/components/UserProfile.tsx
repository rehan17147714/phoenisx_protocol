import React, { useState } from 'react';
import { User, Crown, Github, Youtube, Instagram, Settings, Link, Award, Calendar, Activity, Download, Code, Brain, Zap, Edit3, Save, X, Users, BarChart3, TrendingUp } from 'lucide-react';
import { authService } from '../services/AuthService';
import { User as UserType } from '../types';

interface UserProfileProps {
  user: UserType;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [linkingAccount, setLinkingAccount] = useState<string | null>(null);
  const [linkUsername, setLinkUsername] = useState('');
  const [showUserStats, setShowUserStats] = useState(false);

  const handleSaveName = async () => {
    // In a real app, this would update the user's name
    setIsEditing(false);
  };

  const handleLinkAccount = async (platform: string) => {
    if (!linkUsername.trim()) return;
    
    try {
      await authService.linkAccount(platform, linkUsername);
      setLinkingAccount(null);
      setLinkUsername('');
    } catch (error) {
      console.error('Failed to link account:', error);
    }
  };

  const socialPlatforms = [
    { 
      id: 'github', 
      name: 'GitHub', 
      icon: Github, 
      color: 'text-gray-400 hover:text-white',
      placeholder: 'GitHub username',
      connected: user.linkedAccounts.github
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: Youtube, 
      color: 'text-red-400 hover:text-red-300',
      placeholder: 'YouTube channel',
      connected: user.linkedAccounts.youtube
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: Instagram, 
      color: 'text-pink-400 hover:text-pink-300',
      placeholder: 'Instagram handle',
      connected: user.linkedAccounts.instagram
    }
  ];

  const achievements = [
    { title: 'Phoenix Pioneer', description: 'First to join Phoenix Protocol', icon: '🚀', earned: true },
    { title: 'Code Master', description: 'Execute 100+ code snippets', icon: '💻', earned: user.stats.codeExecutions >= 100 },
    { title: 'Download Expert', description: 'Download 50+ files', icon: '⬇️', earned: user.stats.downloads >= 50 },
    { title: 'Memory Keeper', description: 'Add 25+ memory entries', icon: '🧠', earned: user.stats.memoryEntries >= 25 },
    { title: 'Protocol Creator', description: 'Owner of Phoenix Protocol', icon: '👑', earned: user.isOwner }
  ];

  // Owner-only data
  let registeredUsers: any[] = [];
  let userStats: any = null;
  
  if (user.isOwner) {
    try {
      registeredUsers = authService.getRegisteredUsers();
      userStats = authService.getUserStats();
    } catch (error) {
      console.error('Error fetching owner data:', error);
    }
  }

  return (
    <div className="h-full bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-green-500/20 overflow-y-auto relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse"></div>
      
      <div className="p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl shadow-blue-500/20">
              {user.isOwner ? (
                <Crown className="w-12 h-12 text-black" />
              ) : (
                <User className="w-12 h-12 text-black" />
              )}
            </div>
            {user.isOwner && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Crown className="w-4 h-4 text-black" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-center space-x-2 mb-2">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="bg-gray-800/50 border border-blue-500/20 rounded-lg px-3 py-1 text-white text-xl font-bold text-center"
                />
                <button
                  onClick={handleSaveName}
                  className="text-green-400 hover:text-green-300"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {user.isOwner && (
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">Protocol Creator</span>
            </div>
          )}

          <p className="text-gray-400">{user.email}</p>
          
          <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {user.stats.joinDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="w-4 h-4" />
              <span>{user.stats.totalSessions} sessions</span>
            </div>
          </div>
        </div>

        {/* Owner Dashboard */}
        {user.isOwner && userStats && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span>Owner Dashboard</span>
              </h2>
              <button
                onClick={() => setShowUserStats(!showUserStats)}
                className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                {showUserStats ? 'Hide Stats' : 'Show Stats'}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userStats.totalUsers}</div>
                <div className="text-xs text-gray-400">Total Users</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userStats.recentSignups}</div>
                <div className="text-xs text-gray-400">This Week</div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                <User className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userStats.regularUsers}</div>
                <div className="text-xs text-gray-400">Regular Users</div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
                <BarChart3 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userStats.ownerUsers}</div>
                <div className="text-xs text-gray-400">Owners</div>
              </div>
            </div>

            {showUserStats && (
              <div className="bg-gray-800/30 border border-yellow-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Registered Users</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {registeredUsers.map((regUser, index) => (
                    <div key={regUser.id} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          {regUser.isOwner ? (
                            <Crown className="w-4 h-4 text-black" />
                          ) : (
                            <User className="w-4 h-4 text-black" />
                          )}
                        </div>
                        <div>
                          <div className="text-white font-medium">{regUser.name}</div>
                          <div className="text-xs text-gray-400">{regUser.email}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(regUser.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
            <Code className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{user.stats.codeExecutions}</div>
            <div className="text-xs text-gray-400">Code Runs</div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
            <Download className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{user.stats.downloads}</div>
            <div className="text-xs text-gray-400">Downloads</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
            <Brain className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{user.stats.memoryEntries}</div>
            <div className="text-xs text-gray-400">Memories</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
            <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{user.stats.totalSessions}</div>
            <div className="text-xs text-gray-400">Sessions</div>
          </div>
        </div>

        {/* Linked Accounts */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Link className="w-5 h-5 text-blue-400" />
            <span>Connected Accounts</span>
          </h2>
          <div className="space-y-3">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.id} className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${platform.color}`} />
                    <div>
                      <div className="font-medium text-white">{platform.name}</div>
                      {platform.connected ? (
                        <div className="text-sm text-green-400">@{platform.connected}</div>
                      ) : (
                        <div className="text-sm text-gray-400">Not connected</div>
                      )}
                    </div>
                  </div>
                  
                  {linkingAccount === platform.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={linkUsername}
                        onChange={(e) => setLinkUsername(e.target.value)}
                        placeholder={platform.placeholder}
                        className="bg-gray-900/50 border border-blue-500/20 rounded px-3 py-1 text-white text-sm w-32"
                      />
                      <button
                        onClick={() => handleLinkAccount(platform.id)}
                        className="text-green-400 hover:text-green-300"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setLinkingAccount(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setLinkingAccount(platform.id)}
                      className={`text-sm px-3 py-1 rounded transition-colors ${
                        platform.connected
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-blue-400 hover:text-blue-300'
                      }`}
                    >
                      {platform.connected ? 'Update' : 'Connect'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span>Achievements</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  achievement.earned
                    ? 'bg-yellow-500/10 border-yellow-500/20 shadow-lg shadow-yellow-500/10'
                    : 'bg-gray-800/30 border-gray-700/50 opacity-60'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h3 className={`font-bold ${achievement.earned ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    {achievement.earned && (
                      <div className="mt-2 text-xs text-green-400 flex items-center space-x-1">
                        <Award className="w-3 h-3" />
                        <span>Unlocked</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bolt Promo */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-400" />
            <span>Bolt Integration</span>
          </h3>
          <p className="text-gray-300 mb-4">
            Get rewards when users sign up for Bolt using your Phoenix Protocol referral!
          </p>
          <div className="bg-gray-900/50 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Promo Code</div>
                <div className="text-lg font-bold text-blue-400">PHOENIX-REHAN-2024</div>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText('PHOENIX-REHAN-2024')}
                className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors"
              >
                Copy Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;