import { useState } from 'react';
import { RiShieldKeyholeLine, RiLockPasswordLine } from 'react-icons/ri';
import { HiArrowRight } from 'react-icons/hi2';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const success = await onLogin(username, password);
      if (!success) {
        setError('Invalid credentials');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    } catch (err) {
      setError('Error validating credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-700/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Executive Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-accent-gold/20 to-accent-bronze/10 rounded-2xl border border-accent-gold/30">
            <RiShieldKeyholeLine className="w-10 h-10 text-accent-gold" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            <span className="gradient-text">EXECUTIVE PORTAL</span>
          </h1>
          <p className="text-primary-400 text-sm font-medium uppercase tracking-wider">
            Financial Management System
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className={`glass-card p-8 space-y-6 ${isShaking ? 'animate-shake' : ''}`}
        >
          {/* Username Field */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-primary-300 uppercase tracking-wider ml-1"
            >
              Username
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <RiShieldKeyholeLine className="w-5 h-5 text-primary-500 group-focus-within:text-accent-gold transition-colors" />
              </div>
              <input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-modern w-full pl-12 text-base"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-primary-300 uppercase tracking-wider ml-1"
            >
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <RiLockPasswordLine className="w-5 h-5 text-primary-500 group-focus-within:text-accent-gold transition-colors" />
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-modern w-full pl-12 text-base"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 animate-slide-up">
              <p className="text-red-400 text-sm text-center font-medium">
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary w-full mt-8 flex items-center justify-center gap-3 group disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-4 w-4 border-2 border-accent-gold border-t-transparent rounded-full animate-spin"></span>
                Validating...
              </span>
            ) : (
              <>
                <span>Access System</span>
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Hint - Development Only */}
          <div className="mt-6 pt-6 border-t border-primary-700/30">
            <p className="text-primary-500 text-xs text-center font-mono">
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-primary-600 text-xs font-medium">
            SECURE CONNECTION • ENCRYPTED
          </p>
        </div>
      </div>

      {/* Shake Animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
