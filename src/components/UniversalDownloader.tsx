import React, { useState } from 'react';
import { Download, Link, Play, Pause, CheckCircle, AlertCircle, Globe, Video, Music, FileText, Image, Clock, HardDrive } from 'lucide-react';
import { authService } from '../services/AuthService';

interface DownloadItem {
  id: string;
  url: string;
  title: string;
  type: 'video' | 'audio' | 'image' | 'document';
  status: 'pending' | 'downloading' | 'completed' | 'error';
  progress: number;
  size?: string;
  duration?: string;
  thumbnail?: string;
}

const UniversalDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('best');

  const supportedSites = [
    { name: 'YouTube', icon: Video, color: 'text-red-400' },
    { name: 'Instagram', icon: Image, color: 'text-pink-400' },
    { name: 'Twitter', icon: Globe, color: 'text-blue-400' },
    { name: 'TikTok', icon: Music, color: 'text-purple-400' },
    { name: 'Discord', icon: FileText, color: 'text-indigo-400' },
    { name: 'General Files', icon: Download, color: 'text-green-400' }
  ];

  const qualityOptions = [
    { value: 'best', label: 'Best Quality', description: 'Highest available quality' },
    { value: 'worst', label: 'Fastest Download', description: 'Lowest quality, fastest speed' },
    { value: 'audio', label: 'Audio Only', description: 'Extract audio only' },
    { value: '720p', label: '720p HD', description: 'Standard HD quality' },
    { value: '480p', label: '480p', description: 'Standard quality' }
  ];

  const analyzeUrl = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate URL analysis
    setTimeout(() => {
      const newDownload: DownloadItem = {
        id: Date.now().toString(),
        url: url.trim(),
        title: getUrlTitle(url.trim()),
        type: getUrlType(url.trim()),
        status: 'pending',
        progress: 0,
        size: getFileSize(url.trim()),
        duration: getDuration(url.trim()),
        thumbnail: getThumbnail(url.trim())
      };

      setDownloads(prev => [newDownload, ...prev]);
      setIsAnalyzing(false);
      setUrl('');
    }, 1500);
  };

  const getUrlTitle = (url: string): string => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'Phoenix Protocol Tutorial - Advanced AI Development';
    } else if (url.includes('instagram.com')) {
      return 'Instagram Post - @brndxanm Phoenix Updates';
    } else if (url.includes('twitter.com')) {
      return 'Twitter Thread - Phoenix Protocol Launch';
    } else if (url.includes('tiktok.com')) {
      return 'TikTok Video - Coding with Phoenix AI';
    } else {
      return 'Downloaded File - Phoenix Content';
    }
  };

  const getUrlType = (url: string): 'video' | 'audio' | 'image' | 'document' => {
    if (url.includes('youtube.com') || url.includes('tiktok.com')) return 'video';
    if (url.includes('instagram.com')) return 'image';
    if (url.includes('.mp3') || url.includes('.wav')) return 'audio';
    if (url.includes('.pdf') || url.includes('.doc')) return 'document';
    return 'video';
  };

  const getFileSize = (url: string): string => {
    const sizes = ['15.2 MB', '42.8 MB', '128.5 MB', '256.3 MB', '512.7 MB', '1.2 GB'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const getDuration = (url: string): string => {
    if (url.includes('youtube.com') || url.includes('tiktok.com')) {
      const durations = ['2:45', '5:23', '8:17', '12:34', '15:42', '20:18'];
      return durations[Math.floor(Math.random() * durations.length)];
    }
    return '';
  };

  const getThumbnail = (url: string): string => {
    const thumbnails = [
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=300'
    ];
    return thumbnails[Math.floor(Math.random() * thumbnails.length)];
  };

  const startDownload = (id: string) => {
    setDownloads(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'downloading' } : item
    ));

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloads(prev => prev.map(item => {
        if (item.id === id && item.status === 'downloading') {
          const newProgress = Math.min(item.progress + Math.random() * 15, 100);
          if (newProgress >= 100) {
            clearInterval(interval);
            
            // Update user stats
            const user = authService.getCurrentUser();
            if (user) {
              authService.updateStats({
                ...user.stats,
                downloads: user.stats.downloads + 1
              });
            }
            
            return { ...item, progress: 100, status: 'completed' };
          }
          return { ...item, progress: newProgress };
        }
        return item;
      }));
    }, 500);
  };

  const openFile = (download: DownloadItem) => {
    // Simulate opening file
    alert(`Opening ${download.title}\nFile: ${download.size}\nLocation: Local Storage/Phoenix Downloads/`);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Music;
      case 'image': return Image;
      case 'document': return FileText;
      default: return Download;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'downloading': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      case 'error': return 'text-red-400 border-red-500/30 bg-red-500/10';
      default: return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
    }
  };

  return (
    <div className="h-full bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-green-500/20 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 animate-pulse"></div>
      
      <div className="flex items-center justify-between p-6 border-b border-green-500/20 bg-gray-900/20 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Download className="w-7 h-7 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Universal Downloader
            </h2>
            <p className="text-sm text-gray-400">Download from any platform • SnapTube Style</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-orange-400">Ready to Download</span>
        </div>
      </div>

      {/* Supported Sites */}
      <div className="p-6 border-b border-green-500/20 bg-gray-900/20 relative z-10">
        <h3 className="text-lg font-semibold text-white mb-3">Supported Platforms</h3>
        <div className="grid grid-cols-3 gap-3">
          {supportedSites.map((site, index) => {
            const Icon = site.icon;
            return (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-orange-500/30 transition-colors">
                <Icon className={`w-4 h-4 ${site.color}`} />
                <span className="text-sm text-gray-300">{site.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* URL Input */}
      <div className="p-6 border-b border-green-500/20 relative z-10">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Paste URL to Download
            </label>
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or any supported URL"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-orange-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              <button
                onClick={analyzeUrl}
                disabled={!url.trim() || isAnalyzing}
                className="bg-gradient-to-r from-orange-400 to-red-500 text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isAnalyzing ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Analyze'
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quality Settings
            </label>
            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="w-full bg-gray-800/50 border border-orange-500/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500/50"
            >
              {qualityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Downloads List */}
      <div className="flex-1 overflow-y-auto relative z-10">
        {downloads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Download className="w-16 h-16 text-gray-500 mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-white mb-2">No downloads yet</h3>
            <p className="text-gray-400 text-center">
              Paste a URL above to start downloading content from any supported platform
            </p>
          </div>
        ) : (
          <div className="space-y-4 p-6">
            {downloads.map((download) => {
              const TypeIcon = getTypeIcon(download.type);
              return (
                <div
                  key={download.id}
                  className={`p-4 rounded-lg border transition-all duration-300 hover:scale-102 ${getStatusColor(download.status)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {download.thumbnail ? (
                        <img
                          src={download.thumbnail}
                          alt="Thumbnail"
                          className="w-16 h-12 object-cover rounded-lg border border-gray-700/50"
                        />
                      ) : (
                        <div className="w-16 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700/50">
                          <TypeIcon className="w-6 h-6 text-orange-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-white mb-1 line-clamp-2">{download.title}</h4>
                        <p className="text-xs text-gray-400 break-all mb-2">{download.url}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          {download.size && (
                            <div className="flex items-center space-x-1">
                              <HardDrive className="w-3 h-3" />
                              <span>{download.size}</span>
                            </div>
                          )}
                          {download.duration && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{download.duration}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <TypeIcon className="w-3 h-3" />
                            <span className="capitalize">{download.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {download.status === 'completed' && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                      {download.status === 'error' && (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      )}
                      {download.status === 'pending' && (
                        <button
                          onClick={() => startDownload(download.id)}
                          className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded text-sm hover:bg-orange-500/30 transition-colors flex items-center space-x-1"
                        >
                          <Play className="w-3 h-3" />
                          <span>Start</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {download.status === 'downloading' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-400">Downloading...</span>
                        <span className="text-gray-400">{Math.round(download.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${download.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {download.status === 'completed' && (
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-green-400 flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Download completed</span>
                      </span>
                      <button 
                        onClick={() => openFile(download)}
                        className="text-sm text-green-400 hover:text-green-300 transition-colors bg-green-500/10 px-3 py-1 rounded-lg hover:bg-green-500/20"
                      >
                        Open File →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversalDownloader;