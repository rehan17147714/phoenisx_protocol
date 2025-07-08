import React from 'react';
import { Shield, Lock, Eye, Database, Globe, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const Privacy: React.FC = () => {
  const privacyFeatures = [
    {
      icon: Lock,
      title: 'Offline-First Design',
      description: 'Phoenix Protocol works completely offline. Your data never leaves your device unless you explicitly choose to connect online features.',
      status: 'secure'
    },
    {
      icon: Database,
      title: 'Local Data Storage',
      description: 'All your conversations, code snippets, and memories are stored locally in your browser. No cloud storage, no external servers.',
      status: 'secure'
    },
    {
      icon: Eye,
      title: 'No Tracking',
      description: 'We don\'t track your usage, collect analytics, or monitor your behavior. Your privacy is completely protected.',
      status: 'secure'
    },
    {
      icon: Globe,
      title: 'Optional Online Features',
      description: 'The Universal Downloader requires internet access only when downloading content. You control when and what to connect.',
      status: 'info'
    }
  ];

  const dataTypes = [
    { type: 'Chat Messages', storage: 'Local Browser Storage', sharing: 'Never shared', retention: 'Until you clear browser data' },
    { type: 'Code Snippets', storage: 'Local Browser Storage', sharing: 'Never shared', retention: 'Until you clear browser data' },
    { type: 'Memory Entries', storage: 'Local Browser Storage', sharing: 'Never shared', retention: 'Until you clear browser data' },
    { type: 'Download History', storage: 'Local Browser Storage', sharing: 'Never shared', retention: 'Until you clear browser data' },
    { type: 'User Preferences', storage: 'Local Browser Storage', sharing: 'Never shared', retention: 'Until you clear browser data' }
  ];

  return (
    <div className="h-full bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-green-500/20 overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-400">Your privacy is our top priority. Phoenix Protocol is designed with privacy-first principles.</p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full border border-green-500/30">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">100% Privacy Protected</span>
          </div>
        </div>

        {/* Privacy Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Lock className="w-6 h-6 text-emerald-400" />
            <span>Privacy Features</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {privacyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                    feature.status === 'secure'
                      ? 'bg-green-500/10 border-green-500/20 hover:border-green-500/40'
                      : 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      feature.status === 'secure'
                        ? 'bg-green-500/20'
                        : 'bg-blue-500/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        feature.status === 'secure' ? 'text-green-400' : 'text-blue-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Handling */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Database className="w-6 h-6 text-blue-400" />
            <span>Data Handling</span>
          </h2>
          <div className="bg-gray-800/30 border border-blue-500/20 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-500/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">Data Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">Storage Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">Sharing Policy</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-400">Retention</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTypes.map((data, index) => (
                    <tr key={index} className="border-t border-gray-700/50 hover:bg-gray-800/20">
                      <td className="px-6 py-4 text-sm text-white font-medium">{data.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{data.storage}</td>
                      <td className="px-6 py-4 text-sm text-green-400">{data.sharing}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{data.retention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Key Principles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span>Our Privacy Principles</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/30 border border-green-500/20 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-bold text-white mb-2">Privacy by Design</h3>
              <p className="text-sm text-gray-400">Built from the ground up with privacy as the core principle</p>
            </div>
            <div className="bg-gray-800/30 border border-blue-500/20 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold text-white mb-2">Data Minimization</h3>
              <p className="text-sm text-gray-400">We only process data that's absolutely necessary for functionality</p>
            </div>
            <div className="bg-gray-800/30 border border-purple-500/20 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="font-bold text-white mb-2">User Control</h3>
              <p className="text-sm text-gray-400">You have complete control over your data and privacy settings</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Info className="w-5 h-5 text-yellow-400" />
            <span>Important Notes</span>
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white mb-1">Universal Downloader</h3>
                <p className="text-sm text-gray-300">
                  The Universal Downloader feature requires internet access to download content from external platforms. 
                  We don't store or track what you download - the feature simply facilitates the download process.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white mb-1">Browser Storage</h3>
                <p className="text-sm text-gray-300">
                  All data is stored in your browser's local storage. Clearing your browser data will remove all Phoenix Protocol data. 
                  Consider exporting important data before clearing browser storage.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white mb-1">No Account Required</h3>
                <p className="text-sm text-gray-300">
                  Phoenix Protocol doesn't require any account creation, email registration, or personal information. 
                  You can use all features completely anonymously.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold text-white mb-4">Questions About Privacy?</h2>
          <p className="text-gray-400 mb-4">
            If you have any questions about our privacy practices, feel free to reach out.
          </p>
          <a
            href="mailto:privacy@phoenixprotocol.dev"
            className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-6 py-3 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all duration-300"
          >
            <Shield className="w-4 h-4" />
            <span>Contact Privacy Team</span>
          </a>
        </div>

        {/* Last Updated */}
        <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
          <p className="text-sm text-gray-500">
            Last updated: January 2025 • Phoenix Protocol v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;