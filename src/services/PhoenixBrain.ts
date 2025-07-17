import { MemoryEntry, Message, ExecutionResult } from '../types';
import { authService } from './AuthService';
import { deepSeekService } from './DeepSeekService';

class PhoenixBrain {
  private memory: Map<string, string> = new Map();

  constructor() {
    this.initializeMemory();
  }

  private initializeMemory() {
    const defaultMemory = [
      ["Who is Rehan?", "Rehan (@brndxanm) is the visionary creator of Phoenix Protocol - a next-generation AI system that acts as a digital brain. He's a brilliant developer who built this futuristic platform that combines AI intelligence, code analysis, RCIMS, and universal downloading. His socials: Instagram @brndxanm, YouTube @brndxanm, GitHub REHAN2050."],
      ["What is Phoenix Protocol?", "Phoenix Protocol is a revolutionary AI-powered system that behaves like a digital brain - smart, adaptable, fast, and deeply personal. It's not just a tool, it's a living, evolving assistant with intelligent modules, memory engines, and a futuristic cinematic dark galaxy UI. It's the foundation of a new species of intelligence where creativity, logic, and identity merge."],
      ["Who created Phoenix Protocol?", "Phoenix Protocol was created by Rehan (@brndxanm), the Protocol Creator and visionary developer. He built this as a digital extension of intelligent thinking, combining AI with beautiful futuristic design."],
      ["What is RCIMS?", "RCIMS (Rehan Code Insert Mapping System) is Phoenix's intelligent code insertion system that finds smart insert points in your code, shows live diffs, and provides editable insertions with confidence scoring. It's like having an AI that understands exactly where new code should go."],
      ["What can Phoenix do?", "Phoenix Protocol combines multiple powerful modules: Smart Code Composer with RCIMS, Universal Downloader, AI Brain with memory, intelligent chat system, user profiles with achievements, and a beautiful cinematic dark galaxy interface. It's designed to be your digital twin for development and creativity."],
      ["What is the Universal Downloader?", "The Universal Downloader is Phoenix's advanced content downloading system that can grab videos, audio, images, and files from YouTube, Instagram, Twitter, TikTok, Discord, and many other platforms. It supports multiple quality options, shows real-time progress, file sizes, and thumbnails."],
      ["What's special about Phoenix?", "Phoenix Protocol is special because it's not just an AI tool - it's a digital brain that thinks, remembers, and evolves. It combines the best of ChatGPT's conversation, Bolt's interface, and a cinematic dark galaxy theme with glowing neon lines, glassmorphism, and futuristic animations. Plus it has user accounts and achievements!"],
      ["How does Phoenix work?", "Phoenix uses intelligent modules with slide-based navigation, React + Tailwind CSS, real-time AI responses, memory engines, user authentication, achievement systems, and modular architecture. It's built to be expandable with future modules like voice mode, memory tree visualizer, and plugin systems."],
      ["What's coming in Phoenix v3+?", "Phoenix v3+ will include Voice Mode (mic input, TTS reply), Memory Tree Visualizer, Plugin System, Image comprehension, Gamified AI XP, ChatGPT-like Phoenix Chat, Android/Web PWA version, and secure GitHub auto-updater."],
      ["Is Phoenix secure?", "Yes! Phoenix is 100% offline-first with no tracking, secure user authentication, and no third-party data leaks. All knowledge is saved locally with optional cloud sync. Your privacy is completely protected with advanced security features."],
      ["What makes Rehan special?", "Rehan is the Protocol Creator - a visionary who built Phoenix as a digital extension of intelligent thinking. He appears with crown badges and represents the fusion of creativity, logic, and innovation in AI development. His email rehanansari4984@gmail.com gives him owner privileges."],
      ["How do I sign up?", "You can sign up for Phoenix Protocol by clicking the Sign Up button. If you use rehanansari4984@gmail.com, you'll get owner privileges with crown badges and special features. You can also link your GitHub, YouTube, and Instagram accounts for better integration."],
      ["What are achievements?", "Phoenix Protocol has an achievement system that tracks your progress: Phoenix Pioneer (joining), Code Master (100+ executions), Download Expert (50+ downloads), Memory Keeper (25+ memories), and Protocol Creator (owner status). Earn achievements to unlock new features!"]
    ];

    defaultMemory.forEach(([question, answer]) => {
      this.memory.set(question.toLowerCase(), answer);
    });
  }

  async answerQuery(input: string): Promise<Message> {
    const lowerInput = input.toLowerCase();
    
    // Update user stats
    const user = authService.getCurrentUser();
    if (user) {
      authService.updateStats({
        ...user.stats,
        totalSessions: user.stats.totalSessions + 1
      });
    }
    
    // Check for exact matches first
    if (this.memory.has(lowerInput)) {
      return {
        id: Date.now().toString(),
        type: 'phoenix',
        content: this.memory.get(lowerInput)!,
        timestamp: new Date()
      };
    }

    // Try DeepSeek API for intelligent responses
    try {
      const deepSeekResponse = await deepSeekService.generalChat(input, this.getContextFromMemory());
      
      return {
        id: Date.now().toString(),
        type: 'phoenix',
        content: `🧠 **Phoenix AI (Powered by DeepSeek)**\n\n${deepSeekResponse}`,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('DeepSeek API failed, falling back to local responses:', error);
    }
    // Enhanced pattern matching
    let bestMatch = '';
    let bestScore = 0;
    
    for (const [key, answer] of this.memory.entries()) {
      let score = 0;
      const keyWords = key.split(' ');
      const inputWords = lowerInput.split(' ');
      
      keyWords.forEach(keyWord => {
        inputWords.forEach(inputWord => {
          if (inputWord.includes(keyWord) || keyWord.includes(inputWord)) {
            score += keyWord.length > 2 ? 3 : 1;
          }
        });
      });
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = answer;
      }
    }

    if (bestScore > 3) {
      return {
        id: Date.now().toString(),
        type: 'phoenix',
        content: bestMatch,
        timestamp: new Date()
      };
    }

    // Contextual responses for common patterns
    if (lowerInput.includes('rehan') || lowerInput.includes('creator') || lowerInput.includes('brndxanm')) {
      return {
        id: Date.now().toString(),
        type: 'phoenix',
        content: "🔥 **Rehan (@brndxanm)** is the visionary Protocol Creator!\n\n👑 **Role**: Founder & Digital Brain Architect\n🌟 **Vision**: Building the future of AI-human interaction\n🚀 **Achievement**: Created Phoenix Protocol as a living, evolving digital brain\n\n📱 **Connect with Rehan**:\n• Instagram: @brndxanm\n• YouTube: @brndxanm  \n• GitHub: REHAN2050\n\nRehan represents the fusion of creativity, logic, and innovation in AI development. Phoenix Protocol is his digital legacy! ⚡",
        timestamp: new Date()
      };
    }

    if (lowerInput.includes('account') || lowerInput.includes('profile') || lowerInput.includes('sign')) {
      return {
        id: Date.now().toString(),
        type: 'phoenix',
        content: "🔐 **Phoenix Protocol Account System**!\n\n✨ **Features**:\n• Secure user authentication\n• Personal achievement tracking\n• Social account linking (GitHub, YouTube, Instagram)\n• Owner privileges for rehanansari4984@gmail.com\n• Bolt promo code integration\n• Privacy-first design\n\n🏆 **Achievements**:\n• Phoenix Pioneer, Code Master, Download Expert\n• Memory Keeper, Protocol Creator\n\nCheck your User Profile to see your stats and link accounts! 👤",
        timestamp: new Date()
      };
    }

    if (lowerInput.includes('download') || lowerInput.includes('youtube') || lowerInput.includes('video')) {
      return {
        id: Date.now().toString(),
        type: 'phoenix',
        content: "🔥 **Universal Downloader** - Phoenix's Advanced Content System!\n\n⬇️ **Supported Platforms**:\n• YouTube (videos & audio)\n• Instagram (posts & stories)\n• Twitter (media & videos)\n• TikTok (videos)\n• Discord (attachments)\n• General files from any URL\n\n✨ **Features**:\n• Multiple quality options\n• Real-time download progress\n• File size & duration display\n• Thumbnail previews\n• Local storage integration\n• Smart URL analysis\n\nHead to the Downloader module and paste any URL! 🚀",
        timestamp: new Date()
      };
    }

    if (lowerInput.includes('code') || lowerInput.includes('rcims') || lowerInput.includes('programming')) {
      return {
        id: Date.now().toString(),
        type: 'phoenix',
        content: "💻 **Smart Code Composer + RCIMS** - Phoenix's Intelligent Coding Lab!\n\n🧠 **RCIMS Features**:\n• Rehan Code Insert Mapping System\n• Finds optimal insertion points\n• Live diff previews\n• Confidence scoring\n• Smart code suggestions\n\n⚡ **Code Composer**:\n• Multi-language support\n• Real-time execution\n• Syntax highlighting\n• Save & export snippets\n• Multiple AI assistants\n\nTry the Code Composer module for next-level coding! 🔧",
        timestamp: new Date()
      };
    }

    if (lowerInput.includes('help') || lowerInput.includes('what') || lowerInput.includes('how')) {
      return {
        id: Date.now().toString(),
        type: 'phoenix',
        content: "🌟 **Welcome to Phoenix Protocol** - Your Digital Brain!\n\n🧠 **Core Modules**:\n• **AI Brain**: Intelligent conversations & memory\n• **Code Composer**: Smart coding with RCIMS\n• **Universal Downloader**: Content from any platform\n• **Memory**: Teach and expand knowledge\n• **User Profile**: Your digital twin with achievements\n\n🎨 **Experience**:\n• Cinematic dark galaxy theme\n• Glowing neon animations\n• Glassmorphism effects\n• Futuristic slide navigation\n• Achievement system\n\nCreated by Rehan (@brndxanm) - The Protocol Creator! 👑",
        timestamp: new Date()
      };
    }

    return {
      id: Date.now().toString(),
      type: 'phoenix',
      content: "🤔 I don't have specific knowledge about that yet, but I'm always evolving!\n\n💡 **You can**:\n• Teach me in the Memory module\n• Ask about Phoenix Protocol features\n• Explore different modules\n• Try rephrasing your question\n• Check your User Profile for achievements\n• Connect with creator Rehan (@brndxanm)\n\n🚀 Phoenix Protocol is designed to learn and grow with every interaction!",
      timestamp: new Date()
    };
  }

  private getContextFromMemory(): string {
    const recentMemories = Array.from(this.memory.entries()).slice(-5);
    return recentMemories.map(([key, value]) => `${key}: ${value.substring(0, 100)}...`).join('\n');
  }
  teachMemory(question: string, answer: string) {
    this.memory.set(question.toLowerCase(), answer);
    
    // Update user stats
    const user = authService.getCurrentUser();
    if (user) {
      authService.updateStats({
        ...user.stats,
        memoryEntries: user.stats.memoryEntries + 1
      });
    }
  }

  async executeCode(code: string, language: string = 'javascript'): Promise<ExecutionResult> {
    try {
      // Update user stats
      const user = authService.getCurrentUser();
      if (user) {
        authService.updateStats({
          ...user.stats,
          codeExecutions: user.stats.codeExecutions + 1
        });
      }

      if (language === 'javascript') {
        const originalConsoleLog = console.log;
        let output = '';
        
        console.log = (...args: any[]) => {
          output += args.map(arg => String(arg)).join(' ') + '\n';
        };

        try {
          const result = eval(code);
          console.log = originalConsoleLog;
          
          return {
            success: true,
            output: output || (result !== undefined ? String(result) : '✅ Code executed successfully!')
          };
        } catch (error) {
          console.log = originalConsoleLog;
          throw error;
        }
      } else {
        // Use DeepSeek for code analysis and suggestions for other languages
        try {
          const analysis = await deepSeekService.analyzeCode(code, language);
          return {
            success: true,
            output: `🔍 **Code Analysis (${language.toUpperCase()})**\n\n${analysis}\n\n💡 *Note: Direct execution is currently supported for JavaScript only. Other languages show analysis and suggestions.*`
          };
        } catch (error) {
          console.error('DeepSeek code analysis failed:', error);
        }
        
        return {
          success: false,
          error: `🚧 Execution for ${language} is coming soon! Currently supporting JavaScript with plans for Python, TypeScript, and more.`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `❌ ${error instanceof Error ? error.message : 'Unknown execution error'}`
      };
    }
  }

  async getCodeSuggestions(code: string, language: string): Promise<string> {
    try {
      return await deepSeekService.analyzeCode(code, language);
    } catch (error) {
      return 'Unable to get code suggestions at the moment. Please try again later.';
    }
  }

  async explainCode(code: string, language: string): Promise<string> {
    try {
      return await deepSeekService.explainCode(code, language);
    } catch (error) {
      return 'Unable to explain code at the moment. Please try again later.';
    }
  }

  async generateCode(requirements: string, language: string): Promise<string> {
    try {
      return await deepSeekService.generateCode(requirements, language);
    } catch (error) {
      return 'Unable to generate code at the moment. Please try again later.';
    }
  }
  insertCode(baseCode: string, newCode: string, marker: string): string {
    const lines = baseCode.split('\n');
    let inserted = false;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(marker)) {
        const indentation = lines[i].match(/^\s*/)?.[0] || '';
        const indentedNewCode = newCode.split('\n').map(line => 
          line.trim() ? indentation + '  ' + line : line
        ).join('\n');
        
        lines.splice(i + 1, 0, indentedNewCode);
        inserted = true;
        break;
      }
    }
    
    if (!inserted) {
      lines.push('', '// 🔧 Inserted by RCIMS - Rehan Code Insert Mapping System', newCode);
    }
    
    return lines.join('\n');
  }

  getMemoryEntries(): MemoryEntry[] {
    return Array.from(this.memory.entries()).map(([question, answer]) => ({
      question,
      answer,
      timestamp: new Date()
    }));
  }
}

export const phoenixBrain = new PhoenixBrain();