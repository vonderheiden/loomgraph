import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  mode?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, onSuccess, mode: initialMode = 'login' }: AuthModalProps) {
  const { signup, login, loginWithGoogle, error, clearError, isLoading } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setName('');
      setValidationError(null);
      clearError();
    }
  }, [isOpen, clearError]);

  // Reset mode when initialMode changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const validateForm = (): boolean => {
    setValidationError(null);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setValidationError('Please enter a valid email address');
      return false;
    }

    // Password validation
    if (!password || password.length < 8) {
      setValidationError('Password must be at least 8 characters');
      return false;
    }

    // Name validation for signup
    if (mode === 'signup' && !name.trim()) {
      setValidationError('Please enter your name');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (mode === 'signup') {
        await signup(email, password, name);
      } else {
        await login(email, password);
      }

      // Success - close modal and call onSuccess callback
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      // Error is handled by AuthContext
      console.error('[AuthModal] Auth error:', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // OAuth redirect will happen automatically
    } catch (err) {
      console.error('[AuthModal] Google login error:', err);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setValidationError(null);
    clearError();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-bento shadow-bento-lg max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {mode === 'login' 
              ? 'Sign in to save and access your banners' 
              : 'Sign up to start saving your banners'}
          </p>
        </div>

        {/* Error display */}
        {(error || validationError) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-bento text-sm text-red-600">
            {validationError || error}
          </div>
        )}

        {/* Google OAuth button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-3 px-4 border border-gray-300 rounded-bento font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        {/* Email/Password form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-bento focus:outline-none focus:ring-2 focus:ring-action-primary focus:border-transparent"
                  placeholder="Your name"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-bento focus:outline-none focus:ring-2 focus:ring-action-primary focus:border-transparent"
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-bento focus:outline-none focus:ring-2 focus:ring-action-primary focus:border-transparent"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
            {mode === 'signup' && (
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-action-primary hover:bg-blue-600 text-white font-semibold rounded-bento transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Mode toggle */}
        <div className="mt-4 text-center text-sm text-gray-600">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={toggleMode}
                className="text-action-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={toggleMode}
                className="text-action-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
