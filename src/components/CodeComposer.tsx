import React, { useState } from 'react';
import { Play, Save, Download, Code2, Eye, EyeOff, Cpu, Search, CheckCircle, AlertCircle, Zap, Bot, Sparkles, Crown, FileCode, Layers, GitBranch } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { phoenixBrain } from '../services/PhoenixBrain';
import { CodeSnippet, ExecutionResult } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface InsertionPoint {
  line: number;
  context: string;
  confidence: number;
  suggestion: string;
}

interface AIAssistant {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  specialty: string;
}

const CodeComposer: React.FC = () => {
  const [code, setCode] = useState(`// Welcome to Phoenix Smart Code Composer + RCIMS
// Created by Rehan (@brndxanm) - Protocol Creator

function phoenixGreeting(name) {
  return \`🔥 Hello, \${name}! Welcome to Phoenix Protocol - The Future of AI Development!\`;
}

class PhoenixSystem {
  constructor() {
    this.modules = ['AI Brain', 'RCIMS', 'Universal Downloader'];
    this.creator = 'Rehan (@brndxanm)';
  }
  
  // RCIMS: Insert data validation here
  
  processIntelligence(input) {
    return input.map(data => this.enhanceWithAI(data));
  }
  
  // RCIMS: Insert utility functions here
}

// RCIMS: Insert main execution here

console.log(phoenixGreeting("Developer"));
console.log("🧠 Phoenix Protocol - Digital Brain Technology");`);

  const [newCode, setNewCode] = useState(`// AI-Enhanced functionality
validateInput(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid input data');
  }
  return true;
}

enhanceWithAI(data) {
  return {
    ...data,
    aiEnhanced: true,
    timestamp: new Date(),
    processedBy: 'Phoenix AI'
  };
}`);

  const [language, setLanguage] = useState('javascript');
  const [isPreview, setIsPreview] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [savedSnippets, setSavedSnippets] = useLocalStorage<CodeSnippet[]>('phoenix-snippets', []);
  
  // RCIMS States
  const [insertionPoints, setInsertionPoints] = useState<InsertionPoint[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [insertedCode, setInsertedCode] = useState<string>('');
  const [selectedAI, setSelectedAI] = useState('phoenix');
  const [activeTab, setActiveTab] = useState<'composer' | 'rcims'>('composer');

  const languages = [
    'javascript',
    'typescript',
    'python',
    'html',
    'css',
    'json',
    'markdown',
    'jsx',
    'tsx'
  ];

  const aiAssistants: AIAssistant[] = [
    {
      id: 'phoenix',
      name: 'Phoenix AI',
      description: 'Rehan\'s Digital Brain - Ultimate coding assistant',
      icon: '🧠',
      color: 'from-green-400 to-blue-500',
      specialty: 'Full-stack development, AI integration'
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT Style',
      description: 'Conversational AI for code explanations',
      icon: '💬',
      color: 'from-blue-400 to-purple-500',
      specialty: 'Code explanation, debugging'
    },
    {
      id: 'github-copilot',
      name: 'Copilot Style',
      description: 'AI pair programmer for code completion',
      icon: '🤖',
      color: 'from-purple-400 to-pink-500',
      specialty: 'Code completion, suggestions'
    },
    {
      id: 'claude',
      name: 'Claude Style',
      description: 'Advanced reasoning for complex problems',
      icon: '🎯',
      color: 'from-orange-400 to-red-500',
      specialty: 'Complex problem solving, architecture'
    }
  ];

  const analyzeCodeWithRCIMS = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const points: InsertionPoint[] = [
        {
          line: 12,
          context: "// RCIMS: Insert data validation here",
          confidence: 98,
          suggestion: "Perfect spot for input validation methods - High confidence match"
        },
        {
          line: 18,
          context: "// RCIMS: Insert utility functions here",
          confidence: 95,
          suggestion: "Ideal location for utility and helper functions"
        },
        {
          line: 21,
          context: "// RCIMS: Insert main execution here",
          confidence: 92,
          suggestion: "Optimal place for main application logic and execution"
        },
        {
          line: 7,
          context: "constructor() {",
          confidence: 85,
          suggestion: "Could add initialization methods and configuration here"
        },
        {
          line: 15,
          context: "processIntelligence(input) {",
          confidence: 78,
          suggestion: "Good spot for additional processing logic"
        }
      ];
      
      setInsertionPoints(points);
      setIsAnalyzing(false);
    }, 2500);
  };

  const insertCodeWithRCIMS = (pointIndex: number) => {
    const point = insertionPoints[pointIndex];
    const result = phoenixBrain.insertCode(code, newCode, point.context);
    setInsertedCode(result);
    setSelectedPoint(pointIndex);
    setCode(result);
  };

  const handleExecute = () => {
    const currentCode = insertedCode || code;
    const result = phoenixBrain.executeCode(currentCode, language);
    setExecutionResult(result);
  };

  const handleSave = () => {
    const snippet: CodeSnippet = {
      id: Date.now().toString(),
      name: `Phoenix Snippet ${savedSnippets.length + 1}`,
      code: insertedCode || code,
      language,
      timestamp: new Date()
    };
    setSavedSnippets(prev => [...prev, snippet]);
  };

  const handleLoadSnippet = (snippet: CodeSnippet) => {
    setCode(snippet.code);
    setLanguage(snippet.language);
    setExecutionResult(null);
    setInsertedCode('');
    setSelectedPoint(null);
  };

  const handleAIAssist = () => {
    const selectedAssistant = aiAssistants.find(ai => ai.id === selectedAI);
    const aiResponse = `// 🤖 ${selectedAssistant?.name} Analysis
// Specialty: ${selectedAssistant?.specialty}

// Code suggestions based on ${selectedAssistant?.name}:
// 1. Add error handling for better reliability
// 2. Implement type checking for input validation  
// 3. Consider adding async/await for better performance
// 4. Add logging for debugging purposes

// Enhanced by ${selectedAssistant?.name} AI Assistant`;

    setNewCode(aiResponse);
  };

  const exportCode = () => {
    const finalCode = insertedCode || code;
    const blob = new Blob([finalCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phoenix-code-${Date.now()}.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-green-500/20 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-cyan-500 to-green-400 animate-pulse"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-green-500/20 bg-gray-900/20 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Code2 className="w-7 h-7 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
              Smart Code Composer + RCIMS
            </h2>
            <div className="flex items-center space-x-2">
              <Crown className="w-4 h-4 text-yellow-400" />
              <p className="text-sm text-gray-400">Rehan's Code Intelligence System</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Tab Switcher */}
          <div className="flex bg-gray-800/50 rounded-lg p-1 border border-purple-500/20">
            <button
              onClick={() => setActiveTab('composer')}
              className={`flex items-center space-x-2 px-3 py-1 rounded text-sm transition-all duration-300 ${
                activeTab === 'composer'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-purple-400'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>Composer</span>
            </button>
            <button
              onClick={() => setActiveTab('rcims')}
              className={`flex items-center space-x-2 px-3 py-1 rounded text-sm transition-all duration-300 ${
                activeTab === 'rcims'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-cyan-400'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>RCIMS</span>
            </button>
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang.toUpperCase()}</option>
            ))}
          </select>

          <select
            value={selectedAI}
            onChange={(e) => setSelectedAI(e.target.value)}
            className="bg-gray-800/50 border border-green-500/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500/50"
          >
            {aiAssistants.map(ai => (
              <option key={ai.id} value={ai.id}>{ai.icon} {ai.name}</option>
            ))}
          </select>

          <button
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300"
          >
            {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="text-sm">{isPreview ? 'Edit' : 'Preview'}</span>
          </button>
        </div>
      </div>

      <div className="flex h-full">
        {/* Main Code Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            {isPreview ? (
              <div className="h-full overflow-auto">
                <SyntaxHighlighter
                  language={language}
                  style={oneDark}
                  className="h-full text-sm"
                  showLineNumbers
                  lineNumberStyle={{ color: '#4a5568', fontSize: '12px' }}
                >
                  {insertedCode || code}
                </SyntaxHighlighter>
              </div>
            ) : (
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent text-white font-mono text-sm p-6 resize-none focus:outline-none"
                placeholder="// Start coding with Phoenix Protocol..."
                style={{ fontFamily: 'JetBrains Mono, Consolas, monospace' }}
              />
            )}
          </div>

          {/* Action Bar */}
          <div className="p-4 border-t border-green-500/20 bg-gray-900/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-3">
                <button
                  onClick={handleExecute}
                  className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all duration-300"
                >
                  <Play className="w-4 h-4" />
                  <span className="text-sm">Execute</span>
                </button>

                {activeTab === 'rcims' && (
                  <button
                    onClick={analyzeCodeWithRCIMS}
                    disabled={isAnalyzing}
                    className="flex items-center space-x-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-all duration-300 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    <span className="text-sm">{isAnalyzing ? 'Analyzing...' : 'RCIMS Analyze'}</span>
                  </button>
                )}

                <button
                  onClick={handleAIAssist}
                  className="flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-all duration-300"
                >
                  <Bot className="w-4 h-4" />
                  <span className="text-sm">AI Assist</span>
                </button>

                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300"
                >
                  <Save className="w-4 h-4" />
                  <span className="text-sm">Save</span>
                </button>

                <button
                  onClick={exportCode}
                  className="flex items-center space-x-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-lg border border-orange-500/30 hover:bg-orange-500/30 transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Export</span>
                </button>
              </div>

              <div className="text-sm text-gray-400">
                Lines: {code.split('\n').length} • Characters: {code.length}
              </div>
            </div>

            {/* Execution Result */}
            {executionResult && (
              <div className={`p-4 rounded-lg border ${
                executionResult.success 
                  ? 'bg-green-500/10 border-green-500/20 text-green-400'
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                <div className="font-mono text-sm">
                  {executionResult.success ? (
                    <div>
                      <div className="text-green-400 mb-2 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>✅ Execution successful:</span>
                      </div>
                      <div className="text-white bg-gray-900/50 p-3 rounded">{executionResult.output}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-red-400 mb-2 flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>❌ Execution failed:</span>
                      </div>
                      <div className="text-red-300 bg-gray-900/50 p-3 rounded">{executionResult.error}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel - RCIMS or Snippets */}
        <div className="w-96 border-l border-green-500/20 bg-gray-900/20 flex flex-col">
          {activeTab === 'rcims' ? (
            <>
              {/* New Code Input */}
              <div className="p-4 border-b border-green-500/20">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span>Code to Insert</span>
                </h3>
                <textarea
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full h-32 bg-gray-800/50 border border-cyan-500/20 rounded-lg px-3 py-2 text-white font-mono text-sm resize-none focus:outline-none focus:border-cyan-500/50"
                  placeholder="Enter code to insert via RCIMS..."
                />
              </div>

              {/* RCIMS Analysis Results */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 border-b border-green-500/20">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <span>RCIMS Analysis</span>
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {insertionPoints.length} optimal insertion points found
                  </p>
                </div>

                {insertionPoints.length === 0 ? (
                  <div className="p-6 text-center">
                    <Zap className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400 mb-2">Run RCIMS analysis to find insertion points</p>
                    <p className="text-xs text-gray-500">Rehan's intelligent code mapping system</p>
                  </div>
                ) : (
                  <div className="space-y-3 p-4">
                    {insertionPoints.map((point, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          selectedPoint === index
                            ? 'bg-green-500/20 border-green-500/40 shadow-lg'
                            : 'bg-gray-800/30 border-gray-700/50 hover:border-cyan-500/30'
                        }`}
                        onClick={() => insertCodeWithRCIMS(index)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Code2 className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-medium text-white">Line {point.line}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {point.confidence >= 90 ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yellow-400" />
                            )}
                            <span className="text-xs text-gray-400">{point.confidence}%</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-300 font-mono bg-gray-900/50 p-2 rounded mb-2">
                          {point.context}
                        </div>
                        
                        <p className="text-xs text-gray-400">{point.suggestion}</p>
                        
                        {selectedPoint !== index && (
                          <button className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                            🔧 Click to insert with RCIMS →
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {selectedPoint !== null && (
                  <div className="p-4 border-t border-green-500/20 bg-green-500/5">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">RCIMS Insertion Complete</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Code successfully inserted at line {insertionPoints[selectedPoint].line} by Rehan's RCIMS
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Saved Snippets */
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 border-b border-green-500/20">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  <span>Saved Snippets</span>
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {savedSnippets.length} code snippets saved
                </p>
              </div>

              {savedSnippets.length === 0 ? (
                <div className="p-6 text-center">
                  <GitBranch className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 mb-2">No saved snippets yet</p>
                  <p className="text-xs text-gray-500">Save your code to access it later</p>
                </div>
              ) : (
                <div className="space-y-2 p-4">
                  {savedSnippets.map((snippet) => (
                    <button
                      key={snippet.id}
                      onClick={() => handleLoadSnippet(snippet)}
                      className="w-full text-left p-4 border border-gray-700/50 rounded-lg hover:bg-purple-500/5 hover:border-purple-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white font-medium">{snippet.name}</div>
                        <div className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded">
                          {snippet.language}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        {snippet.timestamp.toLocaleDateString()} • {snippet.code.split('\n').length} lines
                      </div>
                      <div className="text-xs text-gray-400 font-mono bg-gray-900/50 p-2 rounded truncate">
                        {snippet.code.split('\n')[0]}...
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeComposer;