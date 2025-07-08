import React from 'react';
import { User, Code, Zap, Heart, Github, Instagram, Youtube, Globe, Mail, MapPin, Calendar, Award, Crown, Star, Sparkles } from 'lucide-react';

const AboutMe: React.FC = () => {
  const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/brndxanm', color: 'text-pink-400 hover:text-pink-300', handle: '@brndxanm' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@brndxanm', color: 'text-red-400 hover:text-red-300', handle: '@brndxanm' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/REHAN2050', color: 'text-gray-400 hover:text-white', handle: 'REHAN2050' },
    { name: 'Portfolio', icon: Globe, url: 'https://rehan.dev', color: 'text-blue-400 hover:text-blue-300', handle: 'rehan.dev' },
    { name: 'Email', icon: Mail, url: 'mailto:rehan@phoenixprotocol.dev', color: 'text-green-400 hover:text-green-300', handle: 'Contact' }
  ];

  const achievements = [
    { 
      title: 'Phoenix Protocol Creator', 
      description: 'Built the ultimate AI-powered digital brain ecosystem that thinks, learns, and evolves', 
      icon: Crown,
      color: 'text-yellow-400'
    },
    { 
      title: 'Digital Brain Architect', 
      description: 'Designed intelligent systems that merge creativity, logic, and identity seamlessly', 
      icon: Zap,
      color: 'text-green-400'
    },
    { 
      title: 'Visionary Developer', 
      description: 'Expert in React, AI integration, and futuristic interface design', 
      icon: Code,
      color: 'text-blue-400'
    },
    { 
      title: 'Innovation Pioneer', 
      description: 'Building the foundation of a new species of intelligence for the future', 
      icon: Sparkles,
      color: 'text-purple-400'
    }
  ];

  const techStack = [
    'React & TypeScript', 'AI/ML Integration', 'Tailwind CSS', 'Node.js',
    'Digital Brain Architecture', 'RCIMS Technology', 'Phoenix Protocol',
    'Next.js', 'Python', 'Cinematic UI Design', 'Glassmorphism', 'Future Tech'
  ];

  const phoenixFeatures = [
    {
      title: 'AI Brain',
      description: 'Intelligent conversations with memory and learning capabilities',
      icon: '🧠',
      color: 'from-green-400 to-blue-500'
    },
    {
      title: 'RCIMS',
      description: 'Rehan Code Insert Mapping System for smart code insertion',
      icon: '🔧',
      color: 'from-cyan-400 to-purple-500'
    },
    {
      title: 'Universal Downloader',
      description: 'Download content from any platform with advanced features',
      icon: '⬇️',
      color: 'from-orange-400 to-red-500'
    }
  ];

  return (
    <div className="h-full bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-green-500/20 overflow-y-auto relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse"></div>
      
      <div className="p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-yellow-500/20 relative">
            <Crown className="w-16 h-16 text-black" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-black" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-3">
            Rehan
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <p className="text-xl text-yellow-400 font-bold">Protocol Creator & Digital Brain Architect</p>
          </div>
          <p className="text-gray-400 text-lg">Visionary Developer • AI Pioneer • Future Builder</p>
          
          <div className="flex items-center justify-center space-x-8 mt-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Digital Realm • Earth</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Building the Future Since 2020</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mt-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-2 px-4 py-2 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 group ${link.color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{link.handle}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <Crown className="w-6 h-6 text-yellow-400" />
                <span>The Visionary Behind Phoenix</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm Rehan (@brndxanm), the creator of Phoenix Protocol - a revolutionary AI-powered system that behaves like a 
                <span className="text-yellow-400 font-semibold"> digital brain</span>. Smart, adaptable, fast, and deeply personal.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Phoenix Protocol isn't just a tool - it's a <span className="text-green-400 font-semibold">living, evolving assistant</span> that 
                represents the foundation of a new species of intelligence where creativity, logic, and identity merge seamlessly.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My vision is to create systems that don't just help developers code, but truly understand and enhance the creative process. 
                Phoenix Protocol is my contribution to the future of AI-human interaction.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Code className="w-5 h-5 text-purple-400" />
                <span>Technology Mastery</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-green-400" />
                <span>Achievements & Vision</span>
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-colors">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${achievement.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{achievement.title}</h3>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Phoenix Protocol Features */}
        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3 text-center justify-center">
            <Zap className="w-8 h-8 text-green-400" />
            <span>Phoenix Protocol - Digital Brain Technology</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {phoenixFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-300 mb-4">
              "Phoenix Protocol is not just an AI tool. It is the foundation of a new species of intelligence 
              where creativity, logic, and identity merge."
            </p>
            <div className="inline-flex items-center space-x-2 bg-yellow-500/20 text-yellow-400 px-6 py-3 rounded-full border border-yellow-500/30">
              <Crown className="w-5 h-5" />
              <span className="font-bold">Created by Rehan - The Protocol Creator</span>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center bg-gradient-to-r from-gray-800/30 to-gray-900/30 border border-gray-700/50 rounded-xl p-8">
          <blockquote className="text-2xl italic text-gray-300 mb-4">
            "The future belongs to those who build it. Phoenix Protocol is my contribution to that future - 
            a digital brain that thinks, remembers, and evolves."
          </blockquote>
          <cite className="text-lg text-yellow-400 font-semibold">- Rehan (@brndxanm), Creator of Phoenix Protocol</cite>
          <div className="mt-4 text-sm text-gray-500">
            Phoenix Protocol v2.0 • Digital Brain Technology • Built with ❤️ by Rehan
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;