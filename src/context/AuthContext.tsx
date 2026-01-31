import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

/* eslint-disable react-refresh/only-export-components */

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Email/Password methods
  signup: (email: string, password: string, name?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  
  // OAuth2 methods
  loginWithGoogle: () => Promise<void>;
  
  // Session management
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } catch (err) {
        console.error('[Auth] Failed to get session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signup = useCallback(async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('[Auth] Starting signup for:', email);
      
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split('@')[0]
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      console.log('[Auth] Signup response:', { data, error: signupError });

      if (signupError) {
        console.error('[Auth] Signup error:', signupError);
        throw signupError;
      }

      // Check if email confirmation is required
      if (data.user && !data.session) {
        console.log('[Auth] Email confirmation required');
        setError('Please check your email to confirm your account');
        return;
      }

      // Create profile record
      if (data.user) {
        console.log('[Auth] Creating profile for user:', data.user.id);
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            company_name: null,
            brand_color: '#6366f1',
            logo_url: null
          });

        if (profileError) {
          console.error('[Auth] Failed to create profile:', profileError);
        }
      }

      setSession(data.session);
      setUser(data.user);
      console.log('[Auth] Signup successful');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      console.error('[Auth] Signup exception:', err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('[Auth] Starting login for:', email);
      
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      console.log('[Auth] Login response:', { data, error: loginError });

      if (loginError) {
        console.error('[Auth] Login error:', loginError);
        throw loginError;
      }

      setSession(data.session);
      setUser(data.user);
      console.log('[Auth] Login successful');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      console.error('[Auth] Login exception:', err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (oauthError) throw oauthError;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google login failed';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) throw logoutError;

      setSession(null);
      setUser(null);
    } catch (err) {
      console.error('[Auth] Logout error:', err);
      // Clear local state even if server logout fails
      setSession(null);
      setUser(null);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextValue = {
    user,
    session,
    isAuthenticated: !!user,
    isLoading,
    error,
    signup,
    login,
    loginWithGoogle,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
