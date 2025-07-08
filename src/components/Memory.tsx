import React, { useState } from 'react';
import { Brain, Plus, Trash2, Edit3, Save, X, Zap, BookOpen } from 'lucide-react';
import { MemoryEntry } from '../types';
import { phoenixBrain } from '../services/PhoenixBrain';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Memory: React.FC = () => {
  const [memoryEntries, setMemoryEntries] = useLocalStorage<MemoryEntry[]>('phoenix-memory', []);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddMemory = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const newEntry: MemoryEntry = {
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      timestamp: new Date()
    };

    setMemoryEntries(prev => [...prev, newEntry]);
    phoenixBrain.teachMemory(newQuestion.trim(), newAnswer.trim());
    
    setNewQuestion('');
    setNewAnswer('');
    setIsAddingNew(false);
  };

  const handleDeleteMemory = (index: number) => {
    setMemoryEntries(prev => prev.filter((_, i) => i !== index));
  };

  const filteredEntries = memoryEntries.filter(entry =>
    entry.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveEdit = (index: number, question: string, answer: string) => {
    setMemoryEntries(prev => prev.map((entry, i) => 
      i === index ? { ...entry, question, answer } : entry
    ));
    phoenixBrain.teachMemory(question, answer);
    setEditingId(null);
  };

  return (
    <div className="h-full bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-green-500/20 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-green-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Phoenix Memory</h2>
            <p className="text-sm text-gray-400">Knowledge Base & Learning Center</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400">{memoryEntries.length} memories</span>
          </div>
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Memory</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6 border-b border-green-500/20">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search memories..."
          className="w-full bg-gray-800/50 border border-green-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
        />
      </div>

      {/* Add New Memory Form */}
      {isAddingNew && (
        <div className="p-6 border-b border-green-500/20 bg-purple-500/5">
          <h3 className="text-lg font-semibold text-white mb-4">Teach Phoenix Something New</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Question</label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="What question should Phoenix learn to answer?"
                className="w-full bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Answer</label>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="How should Phoenix respond?"
                className="w-full h-20 bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleAddMemory}
                className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all duration-300"
              >
                <Save className="w-4 h-4" />
                <span className="text-sm">Save Memory</span>
              </button>
              <button
                onClick={() => {
                  setIsAddingNew(false);
                  setNewQuestion('');
                  setNewAnswer('');
                }}
                className="flex items-center space-x-2 bg-gray-500/20 text-gray-400 px-4 py-2 rounded-lg border border-gray-500/30 hover:bg-gray-500/30 transition-all duration-300"
              >
                <X className="w-4 h-4" />
                <span className="text-sm">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Memory Entries */}
      <div className="flex-1 overflow-y-auto">
        {filteredEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Zap className="w-16 h-16 text-gray-500 mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-white mb-2">No memories found</h3>
            <p className="text-gray-400 text-center">
              {searchQuery ? 'Try a different search term' : 'Start by adding some knowledge to Phoenix'}
            </p>
          </div>
        ) : (
          <div className="space-y-4 p-6">
            {filteredEntries.map((entry, index) => (
              <MemoryCard
                key={index}
                entry={entry}
                isEditing={editingId === `${index}`}
                onEdit={() => setEditingId(`${index}`)}
                onSave={(question, answer) => handleSaveEdit(index, question, answer)}
                onCancel={() => setEditingId(null)}
                onDelete={() => handleDeleteMemory(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface MemoryCardProps {
  entry: MemoryEntry;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (question: string, answer: string) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  entry,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete
}) => {
  const [editQuestion, setEditQuestion] = useState(entry.question);
  const [editAnswer, setEditAnswer] = useState(entry.answer);

  const handleSave = () => {
    if (editQuestion.trim() && editAnswer.trim()) {
      onSave(editQuestion.trim(), editAnswer.trim());
    }
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-gray-800/30 border border-purple-500/20 rounded-lg">
        <div className="space-y-3">
          <input
            type="text"
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
            className="w-full bg-gray-900/50 border border-purple-500/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
          />
          <textarea
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
            className="w-full h-16 bg-gray-900/50 border border-purple-500/20 rounded px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-purple-500/50"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-3 py-1 rounded text-sm hover:bg-green-500/30 transition-colors"
            >
              <Save className="w-3 h-3" />
              <span>Save</span>
            </button>
            <button
              onClick={onCancel}
              className="flex items-center space-x-1 bg-gray-500/20 text-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-500/30 transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg hover:border-purple-500/30 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-white group-hover:text-purple-300 transition-colors">
          Q: {entry.question}
        </h4>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-3">A: {entry.answer}</p>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Learned: {entry.timestamp.toLocaleDateString()}</span>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Memory;