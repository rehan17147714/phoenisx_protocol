import React, { useState } from 'react';
import { Cpu, Search, Code2, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { phoenixBrain } from '../services/PhoenixBrain';

interface InsertionPoint {
  line: number;
  context: string;
  confidence: number;
  suggestion: string;
}

const RCIMS: React.FC = () => {
  const [baseCode, setBaseCode] = useState(`// Sample codebase for RCIMS analysis
function calculateSum(a, b) {
  return a + b;
}

class DataProcessor {
  constructor() {
    this.data = [];
  }
  
  // RCIMS: Insert data validation here
  
  processData(input) {
    return input.map(item => item * 2);
  }
}

// RCIMS: Insert utility functions here

export { calculateSum, DataProcessor };`);

  const [newCode, setNewCode] = useState(`// New functionality to insert
validateData(data) {
  return data && typeof data === 'object';
}`);

  const [insertionPoints, setInsertionPoints] = useState<InsertionPoint[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [insertedCode, setInsertedCode] = useState<string>('');

  const analyzeCode = () => {
    setIsAnalyzing(true);
    
    // Simulate code analysis
    setTimeout(() => {
      const points: InsertionPoint[] = [
        {
          line: 9,
          context: "// RCIMS: Insert data validation here",
          confidence: 95,
          suggestion: "Perfect spot for data validation method"
        },
        {
          line: 16,
          context: "// RCIMS: Insert utility functions here",
          confidence: 88,
          suggestion: "Ideal location for utility functions"
        },
        {
          line: 5,
          context: "constructor() {",
          confidence: 72,
          suggestion: "Could add initialization methods here"
        }
      ];
      
      setInsertionPoints(points);
      setIsAnalyzing(false);
    }, 2000);
  };

  const insertCode = (pointIndex: number) => {
    const point = insertionPoints[pointIndex];
    const result = phoenixBrain.insertCode(baseCode, newCode, point.context);
    setInsertedCode(result);
    setSelectedPoint(pointIndex);
  };

  return (
    <div className="h-full bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-green-500/20 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-green-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
            <Cpu className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">RCIMS</h2>
            <p className="text-sm text-gray-400">Rapid Code Insertion & Management System</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-cyan-400">AI Analysis Ready</span>
        </div>
      </div>

      <div className="flex h-full">
        {/* Code Input Section */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-green-500/20">
            <h3 className="text-lg font-semibold text-white mb-2">Base Codebase</h3>
            <div className="flex space-x-3">
              <button
                onClick={analyzeCode}
                disabled={isAnalyzing}
                className="flex items-center space-x-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-all duration-300 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span className="text-sm">{isAnalyzing ? 'Analyzing...' : 'Analyze Code'}</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <SyntaxHighlighter
              language="javascript"
              style={oneDark}
              className="h-full text-sm"
              showLineNumbers
              lineNumberStyle={{ color: '#4a5568', fontSize: '12px' }}
            >
              {insertedCode || baseCode}
            </SyntaxHighlighter>
          </div>

          <div className="p-4 border-t border-green-500/20">
            <h3 className="text-lg font-semibold text-white mb-2">New Code to Insert</h3>
            <textarea
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="w-full h-24 bg-gray-800/50 border border-green-500/20 rounded-lg px-3 py-2 text-white font-mono text-sm resize-none focus:outline-none focus:border-green-500/50"
              placeholder="Enter code to insert..."
            />
          </div>
        </div>

        {/* Analysis Results */}
        <div className="w-96 border-l border-green-500/20 bg-gray-900/20">
          <div className="p-4 border-b border-green-500/20">
            <h3 className="text-lg font-semibold text-white">Insertion Analysis</h3>
            <p className="text-sm text-gray-400 mt-1">
              {insertionPoints.length} optimal insertion points found
            </p>
          </div>

          <div className="overflow-y-auto max-h-96">
            {insertionPoints.length === 0 ? (
              <div className="p-6 text-center">
                <Zap className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">Run analysis to find insertion points</p>
              </div>
            ) : (
              <div className="space-y-3 p-4">
                {insertionPoints.map((point, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      selectedPoint === index
                        ? 'bg-green-500/20 border-green-500/40'
                        : 'bg-gray-800/30 border-gray-700/50 hover:border-cyan-500/30'
                    }`}
                    onClick={() => insertCode(index)}
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
                        Click to insert here →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedPoint !== null && (
            <div className="p-4 border-t border-green-500/20 bg-green-500/5">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Code Successfully Inserted</span>
              </div>
              <p className="text-xs text-gray-400">
                New code has been intelligently inserted at line {insertionPoints[selectedPoint].line}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RCIMS;