import React from 'react';
import { Brain, Code, Cpu, Settings, Zap, Download, User, Shield, Crown, Star, LogOut, Menu, X, MessageSquare } from 'lucide-react';
import { authService } from '../services/AuthService';

interface NavigationProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  user: any;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeModule, onModuleChange, user, isCollapsed, onToggleCollapse }) => {
  const modules = [
    { id: 'brain', name: 'AI Brain', icon: Brain, color: 'from-cyan-400 to-blue-500', description: 'NeoCortex Intelligence' },
    { id: 'composer', name: 'Code Assist', icon: Code, color: 'from-blue-500 to-purple-500', description: 'Smart Development' },
    { id: 'rcims', name: 'RCIMS Core', icon: Cpu, color: 'from-purple-500 to-pink-500', description: 'Code Mapping System' },
    { id: 'memory', name: 'Knowledge Core', icon: Zap, color: 'from-pink-500 to-red-500', description: 'Memory Engine' },
    { id: 'downloader', name: 'Data Harvester', icon: Download, color: 'from-red-500 to-orange-500', description: 'Universal Downloader' },
  ];

  const infoModules = [
    { id: 'profile', name: 'Digital Twin', icon: User, color: 'from-blue-400 to-purple-500', description: 'Your Neural Profile' },
    { id: 'about', name: 'Creator Core', icon: User, color: 'from-pink-400 to-rose-500', description: 'About Rehan' },
    { id: 'privacy', name: 'Security Matrix', icon: Shield, color: 'from-emerald-400 to-teal-500', description: 'Privacy Shield' },
  ];

  const handleSignOut = () => {
    authService.signOut();
  };

  return (
    <nav className={`${isCollapsed ? 'w-20' : 'w-80'} bg-black/40 backdrop-blur-2xl border-r border-cyan-500/20 p-4 overflow-y-auto relative transition-all duration-500 ease-in-out`}>
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse"></div>
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="relative z-10">
        {/* Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-3 mb-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 group"
        >
          <div className="relative">
            {isCollapsed ? (
              <Menu className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            ) : (
              <X className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            )}
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
          </div>
        </button>

        {/* 2PAIR Header */}
        {!isCollapsed && (
          <div className="flex items-center space-x-4 mb-8 p-6 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 animate-pulse"></div>
            <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30 animate-pulse">
              <Brain className="w-8 h-8 text-black" />
              <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping opacity-30"></div>
            </div>
            <div className="relative">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                2PAIR AI
              </h1>
              <div className="text-sm text-cyan-400 font-medium">NeoCortex Galaxy</div>
              <p className="text-xs text-gray-400 flex items-center space-x-1 mt-1">
                <span>Phoenix Protocol</span>
                <Crown className="w-3 h-3 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">v2.0</span>
              </p>
            </div>
          </div>
        )}

        {/* Collapsed Header */}
        {isCollapsed && (
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/30 mb-3 animate-pulse">
              <Brain className="w-6 h-6 text-black" />
            </div>
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* User Info */}
        {user && !isCollapsed && (
          <div className="mb-8 p-5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>
            <div className="relative flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  {user.isOwner ? (
                    <Crown className="w-6 h-6 text-black" />
                  ) : (
                    <User className="w-6 h-6 text-black" />
                  )}
                </div>
                {user.isOwner && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-2 h-2 text-black" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white text-lg">{user.name}</div>
                {user.isOwner && (
                  <div className="text-sm text-yellow-400 font-semibold">Protocol Creator</div>
                )}
                <div className="text-xs text-gray-400">Neural ID: {user.id.slice(-6)}</div>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-red-400 transition-colors text-sm py-3 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Disconnect</span>
            </button>
          </div>
        )}

        {/* Collapsed User */}
        {user && isCollapsed && (
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                {user.isOwner ? (
                  <Crown className="w-5 h-5 text-black" />
                ) : (
                  <User className="w-5 h-5 text-black" />
                )}
              </div>
              {user.isOwner && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
              )}
            </div>
            <button
              onClick={handleSignOut}
              className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {/* Core Intelligence Modules */}
        <div className="space-y-3 mb-8">
          {!isCollapsed && (
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Core Intelligence</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
            </div>
          )}
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'} px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  activeModule === module.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 transform scale-105'
                    : 'text-gray-400 hover:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:border hover:border-cyan-500/20 hover:transform hover:scale-102'
                }`}
                title={isCollapsed ? module.name : undefined}
              >
                {/* Animated background for active module */}
                {activeModule === module.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
                )}
                
                <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center ${
                  activeModule === module.id ? 'shadow-2xl animate-pulse' : 'group-hover:shadow-xl'
                } transition-all duration-300`}>
                  <Icon className="w-5 h-5 text-black" />
                  {activeModule === module.id && (
                    <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping opacity-50"></div>
                  )}
                </div>
                {!isCollapsed && (
                  <div className="flex-1 text-left relative">
                    <div className="font-bold text-lg">{module.name}</div>
                    <div className="text-xs opacity-80">{module.description}</div>
                  </div>
                )}
                {activeModule === module.id && !isCollapsed && (
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse relative shadow-lg shadow-cyan-400/50"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Protocol Info Modules */}
        <div className="space-y-3 mb-8">
          {!isCollapsed && (
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="w-5 h-5 text-yellow-400" />
              <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">Protocol Matrix</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/50 to-transparent"></div>
            </div>
          )}
          {infoModules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'} px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  activeModule === module.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow-2xl shadow-cyan-500/20'
                    : 'text-gray-400 hover:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:border hover:border-cyan-500/20'
                }`}
                title={isCollapsed ? module.name : undefined}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center ${
                  activeModule === module.id ? 'shadow-2xl' : 'group-hover:shadow-xl'
                } transition-all duration-300`}>
                  <Icon className="w-5 h-5 text-black" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 text-left">
                    <div className="font-bold text-lg">{module.name}</div>
                    <div className="text-xs opacity-80">{module.description}</div>
                  </div>
                )}
                {activeModule === module.id && !isCollapsed && (
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* System Status */}
        {!isCollapsed && (
          <div className="p-5 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl backdrop-blur-xl mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>
            <div className="relative">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                <span className="text-sm text-cyan-400 font-bold">NeoCortex Status</span>
              </div>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between items-center">
                  <span>AI Brain:</span>
                  <span className="text-cyan-400 font-semibold">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>RCIMS Core:</span>
                  <span className="text-green-400 font-semibold">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Memory Matrix:</span>
                  <span className="text-blue-400 font-semibold">Learning</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Data Harvester:</span>
                  <span className="text-orange-400 font-semibold">Ready</span>
                </div>
              </div>
              <div className="mt-4 w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-3 rounded-full w-full animate-pulse shadow-lg"></div>
              </div>
              <div className="text-center mt-3 text-sm text-cyan-400 font-bold">100% Operational</div>
            </div>
          </div>
        )}

        {/* Creator Info */}
        {!isCollapsed && (
          <div className="p-5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 animate-pulse"></div>
            <div className="relative">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/30">
                  <Crown className="w-6 h-6 text-black" />
                </div>
                <div>
                  <div className="text-sm font-bold text-yellow-400">Protocol Creator</div>
                  <div className="text-xs text-gray-400">Digital Brain Architect</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Rehan
                </div>
                <div className="text-sm text-gray-400 mb-3">@brndxanm</div>
                <div className="flex justify-center space-x-2 text-xs">
                  <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-lg">Instagram</span>
                  <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-lg">YouTube</span>
                  <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded-lg">GitHub</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;