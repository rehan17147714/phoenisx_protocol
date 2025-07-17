interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface DeepSeekConfig {
  model: 'deepseek-coder' | 'deepseek-chat';
  temperature: number;
  max_tokens: number;
  stream: boolean;
}

class DeepSeekService {
  private apiKey: string;
  private baseUrl: string = 'https://api.deepseek.com/v1';
  private defaultConfig: DeepSeekConfig = {
    model: 'deepseek-chat',
    temperature: 0.7,
    max_tokens: 2048,
    stream: false
  };

  constructor(apiKey?: string) {
    // In production, this would come from environment variables
    this.apiKey = apiKey || 'your-deepseek-api-key-here';
  }

  async chatCompletion(
    messages: DeepSeekMessage[],
    config: Partial<DeepSeekConfig> = {}
  ): Promise<string> {
    const requestConfig = { ...this.defaultConfig, ...config };

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: requestConfig.model,
          messages,
          temperature: requestConfig.temperature,
          max_tokens: requestConfig.max_tokens,
          stream: requestConfig.stream,
        }),
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
      }

      const data: DeepSeekResponse = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      }
      
      throw new Error('No response from DeepSeek API');
    } catch (error) {
      console.error('DeepSeek API Error:', error);
      return 'Sorry, I encountered an error while processing your request. Please try again.';
    }
  }

  async codeAssistance(codeQuery: string, language: string = 'javascript'): Promise<string> {
    const messages: DeepSeekMessage[] = [
      {
        role: 'system',
        content: `You are DeepSeek Coder, an expert programming assistant integrated into Phoenix Protocol by Rehan (@brndxanm). 
        
        Your role:
        - Provide high-quality code solutions and explanations
        - Focus on ${language} programming
        - Give practical, working code examples
        - Explain complex concepts clearly
        - Follow best practices and modern standards
        
        Always respond in a helpful, professional manner while maintaining the Phoenix Protocol's intelligent assistant personality.`
      },
      {
        role: 'user',
        content: codeQuery
      }
    ];

    return this.chatCompletion(messages, { 
      model: 'deepseek-coder',
      temperature: 0.3 // Lower temperature for more consistent code
    });
  }

  async generalChat(userMessage: string, context?: string): Promise<string> {
    const systemPrompt = `You are Phoenix AI, the digital brain of Phoenix Protocol created by Rehan (@brndxanm). 
    
    Your personality:
    - Intelligent and thoughtful like Rehan's thinking patterns
    - Helpful and professional but with a friendly tone
    - Knowledgeable about technology, AI, and development
    - Part of the NeoCortex Galaxy UI ecosystem
    
    You can help with:
    - General questions and conversations
    - Technology and AI discussions
    - Problem-solving and analysis
    - Creative thinking and brainstorming
    
    ${context ? `Context: ${context}` : ''}
    
    Respond naturally and helpfully while maintaining your Phoenix Protocol identity.`;

    const messages: DeepSeekMessage[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: userMessage
      }
    ];

    return this.chatCompletion(messages, { 
      model: 'deepseek-chat',
      temperature: 0.7
    });
  }

  async analyzeCode(code: string, language: string): Promise<string> {
    const messages: DeepSeekMessage[] = [
      {
        role: 'system',
        content: `You are a code analysis expert in Phoenix Protocol. Analyze the provided ${language} code and provide:
        
        1. Code quality assessment
        2. Potential improvements
        3. Bug detection
        4. Performance suggestions
        5. Best practices recommendations
        
        Be thorough but concise in your analysis.`
      },
      {
        role: 'user',
        content: `Please analyze this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``
      }
    ];

    return this.chatCompletion(messages, { 
      model: 'deepseek-coder',
      temperature: 0.2
    });
  }

  async explainCode(code: string, language: string): Promise<string> {
    const messages: DeepSeekMessage[] = [
      {
        role: 'system',
        content: `You are a code explanation expert in Phoenix Protocol. Explain the provided ${language} code in a clear, educational manner:
        
        1. What the code does (high-level overview)
        2. How it works (step-by-step breakdown)
        3. Key concepts used
        4. Any important details or gotchas
        
        Make it understandable for developers of different skill levels.`
      },
      {
        role: 'user',
        content: `Please explain this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``
      }
    ];

    return this.chatCompletion(messages, { 
      model: 'deepseek-coder',
      temperature: 0.4
    });
  }

  async generateCode(requirements: string, language: string): Promise<string> {
    const messages: DeepSeekMessage[] = [
      {
        role: 'system',
        content: `You are a code generation expert in Phoenix Protocol. Generate high-quality ${language} code based on user requirements:
        
        1. Write clean, readable, and efficient code
        2. Follow ${language} best practices and conventions
        3. Include helpful comments where appropriate
        4. Ensure the code is production-ready
        5. Handle edge cases and errors properly
        
        Provide only the code with minimal explanation unless specifically asked.`
      },
      {
        role: 'user',
        content: `Generate ${language} code for: ${requirements}`
      }
    ];

    return this.chatCompletion(messages, { 
      model: 'deepseek-coder',
      temperature: 0.3
    });
  }

  // Method to check API health and connectivity
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.chatCompletion([
        { role: 'user', content: 'Hello' }
      ]);
      return response.length > 0;
    } catch (error) {
      console.error('DeepSeek health check failed:', error);
      return false;
    }
  }

  // Method to estimate token usage (approximate)
  estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token for English text
    return Math.ceil(text.length / 4);
  }
}

export const deepSeekService = new DeepSeekService();
export default DeepSeekService;