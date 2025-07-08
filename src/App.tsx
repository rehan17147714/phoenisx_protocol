import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import AIBrain from './components/AIBrain';
import CodeComposer from './components/CodeComposer';
import RCIMS from './components/RCIMS';
import Memory from './components/Memory';
import UniversalDownloader from './components/UniversalDownloader';
import UserProfile from './components/UserProfile';
import AboutMe from './components/AboutMe';
import Privacy from './components/Privacy';
import AuthModal from './components/AuthModal';
import { authService } from './services/AuthService';
import { AuthState } from './types';
import { LogIn, UserPlus, Sparkles, Zap, Brain, Star } from 'lucide-react';

function App() {
  const [activeModule, setActiveModule] = useState('brain');
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  const renderActiveModule = () => {
    if (!authState.isAuthenticated) {
      return (
        <div className="h-full flex items-center justify-center relative overflow-hidden">
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 4}s`
                }}
              ></div>
            ))}
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-32 h-32 border border-cyan-500/20 rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-32 right-32 w-24 h-24 border border-purple-500/20 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 border border-blue-500/20 transform rotate-12 animate-bounce-slow"></div>
          </div>

          <div className="text-center max-w-2xl relative z-10">
            {/* Hero Brain Icon */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto relative">
                {/* Outer glow ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full animate-spin-slow opacity-20 blur-xl"></div>
                
                {/* Main brain container */}
                <div className="relative w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                  <Brain className="w-16 h-16 text-black animate-pulse" />
                  
                  {/* Orbiting particles */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute -top-2 left-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
                    <div className="absolute top-1/2 -right-2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                    <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                    <div className="absolute top-1/2 -left-2 w-3 h-3 bg-violet-400 rounded-full shadow-lg shadow-violet-400/50"></div>
                  </div>
                </div>

                {/* Corner accent stars */}
                <Star className="absolute -top-4 -right-4 w-6 h-6 text-cyan-400 animate-pulse" />
                <Sparkles className="absolute -bottom-4 -left-4 w-5 h-5 text-purple-400 animate-pulse" />
              </div>
            </div>

            {/* Hero Text */}
            <div className="space-y-6 mb-12">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in">
                Welcome to 2PAIR
              </h1>
              <div className="text-2xl text-cyan-300 font-light mb-2 animate-fade-in-delay-1">
                NeoCortex Galaxy UI
              </div>
              <p className="text-xl text-gray-300 leading-relaxed max-w-xl mx-auto animate-fade-in-delay-2">
                Your personal galaxy of intelligence, insight & innovation. 
                <span className="block mt-2 text-cyan-400 font-semibold">
                  Powered by Phoenix Protocol
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in-delay-3">
              <button
                onClick={() => {
                  setAuthMode('signin');
                  setShowAuthModal(true);
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <LogIn className="w-6 h-6" />
                  <span className="text-lg">🔓 Sign In</span>
                </div>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>

              <button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                className="group relative px-8 py-4 bg-transparent border-2 border-cyan-500/50 text-cyan-400 font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <UserPlus className="w-6 h-6" />
                  <span className="text-lg">🌌 Explore</span>
                </div>
              </button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-delay-4">
              {[
                { icon: Brain, title: "AI Brain", desc: "Intelligent conversations with memory", color: "from-cyan-400 to-blue-500" },
                { icon: Zap, title: "Code Assist", desc: "RCIMS powered development", color: "from-blue-500 to-purple-500" },
                { icon: Sparkles, title: "Knowledge Core", desc: "Expandable memory system", color: "from-purple-500 to-pink-500" }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Creator Credit */}
            <div className="mt-12 text-center animate-fade-in-delay-5">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-black font-bold">R</span>
                </div>
                <span className="text-yellow-400 font-semibold">Created by Rehan (@brndxanm)</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (activeModule) {
      case 'brain':
        return <AIBrain />;
      case 'composer':
        return <CodeComposer />;
      case 'rcims':
        return <RCIMS />;
      case 'memory':
        return <Memory />;
      case 'downloader':
        return <UniversalDownloader />;
      case 'profile':
        return authState.user ? <UserProfile user={authState.user} /> : null;
      case 'about':
        return <AboutMe />;
      case 'privacy':
        return <Privacy />;
      default:
        return <AIBrain />;
    }
  };

  if (authState.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        </div>

        {/* Loading animation */}
        <div className="text-center relative z-10">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center animate-pulse shadow-2xl shadow-cyan-500/30">
              <Brain className="w-10 h-10 text-black" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-ping opacity-20"></div>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2">
            Initializing NeoCortex
          </div>
          <div className="text-cyan-400 font-medium">Phoenix Protocol Loading...</div>
          
          {/* Loading bar */}
          <div className="mt-6 w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="fixed inset-0">
        {/* Primary gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        
        {/* Circuit grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-move 25s linear infinite'
          }}></div>
        </div>

        {/* Diagonal tech lines */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(0,240,255,0.2) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(167,0,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            animation: 'diagonal-move 30s linear infinite'
          }}></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="relative flex h-screen">
        <Navigation 
          activeModule={activeModule} 
          onModuleChange={setActiveModule}
          user={authState.user}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
        <main className="flex-1 p-6 overflow-hidden">
          <div className="h-full transform transition-all duration-500 ease-in-out">
            {renderActiveModule()}
          </div>
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes diagonal-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay-1 {
          0% { opacity: 0; transform: translateY(20px); }
          20% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay-2 {
          0% { opacity: 0; transform: translateY(20px); }
          40% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay-3 {
          0% { opacity: 0; transform: translateY(20px); }
          60% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay-4 {
          0% { opacity: 0; transform: translateY(20px); }
          70% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay-5 {
          0% { opacity: 0; transform: translateY(20px); }
          80% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes loading-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay-1 {
          animation: fade-in-delay-1 2s ease-out;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in-delay-2 2.5s ease-out;
        }
        
        .animate-fade-in-delay-3 {
          animation: fade-in-delay-3 3s ease-out;
        }
        
        .animate-fade-in-delay-4 {
          animation: fade-in-delay-4 3.5s ease-out;
        }
        
        .animate-fade-in-delay-5 {
          animation: fade-in-delay-5 4s ease-out;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default App;