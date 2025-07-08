import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Zap, Crown, Brain, Cpu, Star, MessageSquare, Mic, MicOff } from 'lucide-react';
import { Message } from '../types';
import { phoenixBrain } from '../services/PhoenixBrain';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AIBrain: React.FC = () => {
  const [messages, setMessages] = useLocalStorage<Message[]>('phoenix-messages', []);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate realistic AI thinking time
    setTimeout(() => {
      const phoenixResponse = phoenixBrain.answerQuery(input);
      setMessages(prev => [...prev, phoenixResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Voice input simulation
    setTimeout(() => {
      setIsListening(false);
      setInput("Voice input: Tell me about Phoenix Protocol");
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-2xl rounded-3xl border border-cyan-500/20 overflow-hidden relative">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse"></div>
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>
      
      {/* Header */}
      <div className="flex items-center justify-between p-8 border-b border-cyan-500/20 bg-black/20 relative z-10">
        <div className="flex items-center space-x-5">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30 animate-pulse">
              <Brain className="w-8 h-8 text-black" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
              <Cpu className="w-3 h-3 text-black" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              NeoCortex AI Brain
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <Crown className="w-5 h-5 text-yellow-400" />
              <p className="text-lg text-cyan-400 font-semibold">2PAIR Digital Intelligence</p>
            </div>
            <p className="text-sm text-gray-400 mt-1">Created by Rehan • Phoenix Protocol v2.0</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={clearChat}
            className="text-sm text-gray-400 hover:text-red-400 transition-colors px-4 py-2 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
          >
            Clear Neural Memory
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
            <span className="text-lg text-cyan-400 font-bold">Neural Link Active</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10">
        {messages.length === 0 && (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-cyan-500/30 animate-pulse">
                <Sparkles className="w-12 h-12 text-black" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-ping opacity-20"></div>
            </div>
            <h3 className="text-4xl font-bold text-white mb-4">Welcome to NeoCortex</h3>
            <p className="text-xl text-cyan-400 mb-8 max-w-2xl mx-auto">
              Your digital brain is online! Ask me anything about coding, AI, or let me help you build something extraordinary.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <button
                onClick={() => setInput("Who is the Protocol Creator?")}
                className="group p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl text-yellow-400 hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Crown className="w-6 h-6" />
                  <span className="font-bold text-lg">Protocol Creator</span>
                </div>
                <p className="text-sm text-gray-400">Learn about Rehan and the Phoenix Protocol vision</p>
              </button>
              <button
                onClick={() => setInput("What is NeoCortex Galaxy UI?")}
                className="group p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Brain className="w-6 h-6" />
                  <span className="font-bold text-lg">NeoCortex System</span>
                </div>
                <p className="text-sm text-gray-400">Discover the futuristic AI architecture</p>
              </button>
              <button
                onClick={() => setInput("How does RCIMS Core work?")}
                className="group p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl text-purple-400 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Cpu className="w-6 h-6" />
                  <span className="font-bold text-lg">RCIMS Core</span>
                </div>
                <p className="text-sm text-gray-400">Explore the intelligent code mapping system</p>
              </button>
              <button
                onClick={() => setInput("What can the Data Harvester download?")}
                className="group p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl text-orange-400 hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Star className="w-6 h-6" />
                  <span className="font-bold text-lg">Data Harvester</span>
                </div>
                <p className="text-sm text-gray-400">Universal content downloading capabilities</p>
              </button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-5 ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.type === 'phoenix' && (
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                  <Bot className="w-6 h-6 text-black" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
              </div>
            )}
            <div
              className={`max-w-3xl p-6 rounded-3xl relative overflow-hidden ${
                message.type === 'user'
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-2xl shadow-blue-500/20'
                  : 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 text-cyan-100 border border-cyan-500/20 shadow-2xl shadow-cyan-500/20'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none"></div>
              <div className="relative whitespace-pre-wrap leading-relaxed text-lg">{message.content}</div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-500/20">
                <p className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
                {message.type === 'phoenix' && (
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-cyan-400 font-semibold">NeoCortex</span>
                  </div>
                )}
              </div>
            </div>
            {message.type === 'user' && (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-5">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30 animate-pulse">
                <Bot className="w-6 h-6 text-black" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl animate-ping opacity-30"></div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-6 shadow-2xl shadow-cyan-500/20">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-lg text-cyan-400 font-semibold">NeoCortex is processing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-8 border-t border-cyan-500/20 bg-black/20 relative z-10">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Connect with NeoCortex... (Press Enter to transmit)"
              className="w-full bg-black/50 border border-cyan-500/20 rounded-2xl px-8 py-5 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-xl"
            />
            <button
              onClick={startVoiceInput}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500/20 text-red-400 animate-pulse' 
                  : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black px-10 py-5 rounded-2xl font-bold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="relative flex items-center space-x-2">
              <Send className="w-6 h-6" />
              <span className="text-lg">Transmit</span>
            </div>
          </button>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-semibold">
            NeoCortex Galaxy UI v2.0
          </span>
          <span className="mx-2">•</span>
          <span>Created by Rehan (@brndxanm)</span>
          <span className="mx-2">•</span>
          <span>2PAIR Digital Intelligence</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 30px); }
        }
      `}</style>
    </div>
  );
};

export default AIBrain;