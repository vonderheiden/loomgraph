import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { pb } from '../lib/pocketbase';
import type { User } from '../lib/pocketbase';
import type { RecordAuthResponse } from 'pocketbase';

/* eslint-disable react-refresh/only-export-components */

interface AuthContextValue {
  user: User | null;
  session: RecordAuthResponse<User> | null;
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
  const [session, setSession] = useState<RecordAuthResponse<User> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        // Check if there's a valid auth store
        if (pb.authStore.isValid && pb.authStore.model) {
          const authModel = pb.authStore.model as unknown as User;
          setUser(authModel);
          setSession({
            token: pb.authStore.token,
            record: authModel
          } as RecordAuthResponse<User>);
        }
      } catch (err) {
        console.error('[Auth] Failed to get session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Subscribe to auth state changes
    pb.authStore.onChange(() => {
      if (pb.authStore.isValid && pb.authStore.model) {
        const authModel = pb.authStore.model as unknown as User;
        setUser(authModel);
        setSession({
          token: pb.authStore.token,
          record: authModel
        } as RecordAuthResponse<User>);
      } else {
        setUser(null);
        setSession(null);
      }
    });
  }, []);

  const signup = useCallback(async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('[Auth] Starting signup for:', email);
      console.log('[Auth] PocketBase URL:', pb.baseUrl);
      
      // Create user account
      console.log('[Auth] Creating user account...');
      const authData = await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        name: name || email.split('@')[0],
        emailVisibility: true
      });

      console.log('[Auth] User created successfully:', authData);

      // Authenticate the user immediately after creation
      console.log('[Auth] Authenticating user...');
      const authResponse = await pb.collection('users').authWithPassword(email, password);
      const authUser = authResponse.record as unknown as User;

      console.log('[Auth] Authentication successful, user ID:', authUser.id);

      // Create profile record - now that user is authenticated
      console.log('[Auth] Creating profile for authenticated user:', authUser.id);
      try {
        const profileData = await pb.collection('profiles').create({
          user: authUser.id,
          company_name: '',
          brand_color: '#6366f1',
          logo_url: ''
        });
        console.log('[Auth] Profile created successfully:', profileData);
      } catch (profileErr) {
        console.error('[Auth] Failed to create profile:', profileErr);
        console.error('[Auth] Profile error details:', JSON.stringify(profileErr, null, 2));
        // Don't fail signup if profile creation fails - user can still use the app
      }

      setSession(authResponse as unknown as RecordAuthResponse<User>);
      setUser(authUser);
      console.log('[Auth] Signup completed successfully');
    } catch (err) {
      console.error('[Auth] Signup failed with error:', err);
      console.error('[Auth] Error details:', JSON.stringify(err, null, 2));
      
      let errorMessage = 'Signup failed';
      
      // Handle PocketBase specific errors
      if (err && typeof err === 'object' && 'data' in err) {
        const pbError = err as any;
        if (pbError.data?.message) {
          errorMessage = pbError.data.message;
        } else if (pbError.message) {
          errorMessage = pbError.message;
        }
        
        // Handle validation errors
        if (pbError.data?.data) {
          const fieldErrors = Object.entries(pbError.data.data).map(([field, error]) => 
            `${field}: ${error}`
          ).join(', ');
          if (fieldErrors) {
            errorMessage = `Validation error: ${fieldErrors}`;
          }
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      console.error('[Auth] Final error message:', errorMessage);
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
      console.log('[Auth] PocketBase URL:', pb.baseUrl);
      
      const authResponse = await pb.collection('users').authWithPassword(email, password);

      console.log('[Auth] Login successful:', authResponse);

      const authUser = authResponse.record as unknown as User;
      setSession(authResponse as unknown as RecordAuthResponse<User>);
      setUser(authUser);
      console.log('[Auth] Login completed successfully');
    } catch (err) {
      console.error('[Auth] Login failed with error:', err);
      console.error('[Auth] Error details:', JSON.stringify(err, null, 2));
      
      let errorMessage = 'Login failed';
      
      // Handle PocketBase specific errors
      if (err && typeof err === 'object' && 'data' in err) {
        const pbError = err as any;
        if (pbError.data?.message) {
          errorMessage = pbError.data.message;
        } else if (pbError.message) {
          errorMessage = pbError.message;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      console.error('[Auth] Final error message:', errorMessage);
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
      // Initiate OAuth2 flow with Google
      const authData = await pb.collection('users').authWithOAuth2({
        provider: 'google',
        urlCallback: (url) => {
          // Open OAuth2 URL in current window
          window.location.href = url;
        }
      });

      if (authData) {
        const authUser = authData.record as unknown as User;
        setSession(authData as unknown as RecordAuthResponse<User>);
        setUser(authUser);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google login failed';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      pb.authStore.clear();
      setSession(null);
      setUser(null);
    } catch (err) {
      console.error('[Auth] Logout error:', err);
      // Clear local state even if logout fails
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
