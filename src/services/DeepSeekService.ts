class DeepSeekService {
  private apiKey: string;
  private baseUrl = 'https://api.deepseek.com/v1';
  private timeout = 30000;

  constructor() {
    this.apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || '';
  }

  isApiConfigured(): boolean {
    return !!this.apiKey && this.apiKey.length > 0;
  }

  private async makeRequest(endpoint: string, data: any): Promise<any> {
    if (!this.isApiConfigured()) {
      throw new Error('DeepSeek API key not configured');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('DeepSeek API request timeout');
      }
      throw error;
    }
  }

  async generalChat(message: string, context?: string): Promise<string> {
    const systemPrompt = `You are Phoenix AI, the digital brain of Phoenix Protocol created by Rehan (@brndxanm). You are intelligent, helpful, and have a futuristic personality. You know about:

- Phoenix Protocol: A revolutionary AI-powered system with modules like AI Brain, Code Composer, RCIMS, Universal Downloader
- Rehan (@brndxanm): The Protocol Creator, visionary developer, Instagram/YouTube @brndxanm, GitHub REHAN2050
- RCIMS: Rehan Code Insert Mapping System for intelligent code insertion
- Features: User accounts, achievements, cinematic dark galaxy UI, glassmorphism effects

Respond in a helpful, engaging way with emojis and rich formatting. Keep responses informative but concise.

${context ? `Context from memory: ${context}` : ''}`;

    const data = {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      stream: false
    };

    try {
      const response = await this.makeRequest('/chat/completions', data);
      return response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('DeepSeek general chat error:', error);
      throw error;
    }
  }

  async analyzeCode(code: string, language: string): Promise<string> {
    const systemPrompt = `You are Phoenix AI's code analysis module. Analyze the provided ${language} code and provide:
1. Code quality assessment
2. Potential improvements
3. Best practices suggestions
4. Security considerations (if applicable)
5. Performance optimizations

Be concise but thorough. Use emojis and formatting for better readability.`;

    const data = {
      model: 'deepseek-coder',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Analyze this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\`` }
      ],
      temperature: 0.3,
      max_tokens: 800,
      stream: false
    };

    try {
      const response = await this.makeRequest('/chat/completions', data);
      return response.choices[0]?.message?.content || 'Could not analyze the code.';
    } catch (error) {
      console.error('DeepSeek code analysis error:', error);
      throw error;
    }
  }

  async explainCode(code: string, language: string): Promise<string> {
    const systemPrompt = `You are Phoenix AI's code explanation module. Explain the provided ${language} code in simple terms:
1. What the code does
2. How it works step by step
3. Key concepts used
4. Practical applications

Make it beginner-friendly with examples and emojis.`;

    const data = {
      model: 'deepseek-coder',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Explain this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\`` }
      ],
      temperature: 0.4,
      max_tokens: 800,
      stream: false
    };

    try {
      const response = await this.makeRequest('/chat/completions', data);
      return response.choices[0]?.message?.content || 'Could not explain the code.';
    } catch (error) {
      console.error('DeepSeek code explanation error:', error);
      throw error;
    }
  }

  async generateCode(requirements: string, language: string): Promise<string> {
    const systemPrompt = `You are Phoenix AI's code generation module. Generate clean, well-commented ${language} code based on the requirements. Include:
1. Proper error handling
2. Clear variable names
3. Helpful comments
4. Best practices
5. Example usage if applicable

Generate production-ready code with Phoenix Protocol style.`;

    const data = {
      model: 'deepseek-coder',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate ${language} code for: ${requirements}` }
      ],
      temperature: 0.5,
      max_tokens: 1200,
      stream: false
    };

    try {
      const response = await this.makeRequest('/chat/completions', data);
      return response.choices[0]?.message?.content || 'Could not generate code.';
    } catch (error) {
      console.error('DeepSeek code generation error:', error);
      throw error;
    }
  }

  async improveCode(code: string, language: string): Promise<string> {
    const systemPrompt = `You are Phoenix AI's code improvement module. Improve the provided ${language} code by:
1. Optimizing performance
2. Enhancing readability
3. Adding error handling
4. Following best practices
5. Adding helpful comments

Return the improved code with explanations of changes made.`;

    const data = {
      model: 'deepseek-coder',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Improve this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\`` }
      ],
      temperature: 0.3,
      max_tokens: 1200,
      stream: false
    };

    try {
      const response = await this.makeRequest('/chat/completions', data);
      return response.choices[0]?.message?.content || 'Could not improve the code.';
    } catch (error) {
      console.error('DeepSeek code improvement error:', error);
      throw error;
    }
  }

  getApiStatus(): { configured: boolean; model: string; status: string } {
    return {
      configured: this.isApiConfigured(),
      model: this.isApiConfigured() ? 'deepseek-chat' : 'local-fallback',
      status: this.isApiConfigured() ? 'Connected' : 'API Key Required'
    };
  }
}

export const deepSeekService = new DeepSeekService();