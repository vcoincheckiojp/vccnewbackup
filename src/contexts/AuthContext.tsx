import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../utils/supabase/supabase';

type UserRole = 'admin' | 'super_moderator' | 'project_moderator' | 'library_moderator' | '            id: profile.user_id || userId,
            name: profile.username || profile.display_name || email?.split('@')[0] || 'User',
            email: profile.email || email || '',
            avatar: profile.avatar_url || undefined,
            role: (profile.role as UserRole) || 'user',nity_moderator' | 'user';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; userId?: string; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  verifyOTP: (code: string) => Promise<boolean>;
  unlockScreen: (password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper: fetch profile safely, selecting explicit columns and returning maybeSingle
  const fetchProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('user_id, username, display_name, avatar_url, role, email')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('❌ fetchProfile - query error:', error);
        return { profile: null, error };
      }
      return { profile, error: null };
    } catch (err) {
      console.error('❌ fetchProfile - exception:', err);
      return { profile: null, error: err };
    }
  };

  useEffect(() => {
    console.log('🔄 AuthContext: Initializing Supabase connection check...');
    const getSession = async () => {
      try {
        console.log('🔍 AuthContext: Checking for existing session...');
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('❌ AuthContext: getSession error:', sessionError);
          return;
        }

        console.log('📋 AuthContext: Session data:', session ? 'Session found' : 'No session');
        if (session?.user) {
          console.log('👤 AuthContext: Fetching user profile for ID:', session.user.id);
          const { profile, error: profileError } = await fetchProfile(session.user.id);

          if (profileError) {
            // RLS or permission issues typically surface here
            console.error('❌ AuthContext: Failed to fetch profile on init:', profileError);
            // Fallback: create basic user data from session (still authenticated)
            const fallback = {
              id: session.user.id,
              name: session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              avatar: undefined,
              role: 'user' as UserRole,
            };
            setUser(fallback);
            setIsAuthenticated(true);
            return;
          }

          if (profile) {
            const userData = {
              id: profile.user_id || session.user.id,
              name: profile.username || profile.display_name || session.user.email?.split('@')[0] || 'User',
              email: profile.email || session.user.email || '',
              avatar: profile.avatar_url || undefined,
              role: (profile.role as UserRole) || 'user',
            };
            console.log('✅ AuthContext: Setting user data from profile:', userData);
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // No profile row exists — set basic user object
            console.warn('⚠️ AuthContext: No profile row found for user. Using fallback.');
            const fallback = {
              id: session.user.id,
              name: session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              avatar: undefined,
              role: 'user' as UserRole,
            };
            setUser(fallback);
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        console.error('❌ AuthContext: getSession exception:', err);
      }
    };

    getSession();

    console.log('👂 AuthContext: Setting up auth state listener...');
    const listener = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔔 AuthContext: Auth state changed:', event, session ? 'Session exists' : 'No session');

      try {
        if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user) {
          console.log('👤 AuthContext: Fetching profile after sign in/update for ID:', session.user.id);
          const { profile, error: profileError } = await fetchProfile(session.user.id);

          if (profileError) {
            console.error('❌ AuthContext: Failed to fetch profile after sign in:', profileError);
            // fallback basic user
            const fallback = {
              id: session.user.id,
              name: session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              avatar: undefined,
              role: 'user' as UserRole,
            };
            setUser(fallback);
            setIsAuthenticated(true);
            return;
          }

          if (profile) {
            const userData = {
              id: profile.user_id || session.user.id,
              name: profile.username || profile.display_name || session.user.email?.split('@')[0] || 'User',
              email: profile.email || session.user.email || '',
              avatar: profile.avatar_url || undefined,
              role: (profile.role as UserRole) || 'user',
            };
            console.log('✅ AuthContext: Setting user data after sign in:', userData);
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            console.warn('⚠️ AuthContext: No profile found after sign in - using fallback.');
            const fallback = {
              id: session.user.id,
              name: session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              avatar: undefined,
              role: 'user' as UserRole,
            };
            setUser(fallback);
            setIsAuthenticated(true);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('🚪 AuthContext: User signed out');
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('❌ AuthContext: onAuthStateChange handler exception:', err);
      }
    });

    // Safer unsubscribe handling (supabase client returns different shapes across versions)
    const subscription = (listener as any)?.data?.subscription ?? (listener as any);
    return () => {
      try {
        subscription?.unsubscribe?.();
      } catch (err) {
        console.warn('Failed to unsubscribe auth listener', err);
      }
    };
  }, []);

  // Improved login: returns structured result and optionally populate state immediately
  const login = async (email: string, password: string): Promise<{ success: boolean; userId?: string; error?: string }> => {
    console.log('🔐 AuthContext: Attempting login for:', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('📡 AuthContext: signIn response:', { data, error });

      if (error) {
        console.error('❌ AuthContext: Login error:', error);
        return { success: false, error: error.message };
      }

      const userId = data?.user?.id ?? data?.session?.user?.id;
      if (!userId) {
        return { success: false, error: 'No user returned from signIn' };
      }

      // Optionally fetch profile immediately to populate state without waiting for listener
      try {
        const { profile, error: profileError } = await fetchProfile(userId);
        if (profileError) {
          console.warn('⚠️ AuthContext: Could not fetch profile immediately after login:', profileError);
          // still consider login successful but fallback user data
          setUser({
            id: userId,
            name: email.split('@')[0],
            email,
            role: 'user',
          });
          setIsAuthenticated(true);
        } else if (profile) {
          setUser({
            id: profile.user_id || userId,
            name: profile.username || profile.display_name || email.split('@')[0],
            email: profile.email || email,
            avatar: profile.avatar_url || undefined,
            role: (profile.role as UserRole) || 'user',
          });
          setIsAuthenticated(true);
        } else {
          // no profile row
          setUser({
            id: userId,
            name: email.split('@')[0],
            email,
            role: 'user',
          });
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('❌ AuthContext: Exception fetching profile in login flow:', err);
        setUser({
          id: userId,
          name: email.split('@')[0],
          email,
          role: 'user',
        });
        setIsAuthenticated(true);
      }

      console.log('✅ AuthContext: Login successful, userId:', userId);
      return { success: true, userId };
    } catch (err) {
      console.error('❌ AuthContext: Login exception:', err);
      return { success: false, error: String(err) };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    console.log('📝 AuthContext: Attempting registration for:', email, 'with name:', name);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username: name }, // store extra info in user_metadata
        },
      });
      if (error) {
        console.error('❌ AuthContext: Registration error:', error);
        return false;
      }
      console.log('✅ AuthContext: Registration successful:', !!data.user);
      return !!data.user;
    } catch (error) {
      console.error('❌ AuthContext: Registration exception:', error);
      return false;
    }
  };

  const logout = async () => {
    console.log('🚪 AuthContext: Attempting logout...');
    try {
      await supabase.auth.signOut();
      console.log('✅ AuthContext: Logout successful');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('❌ AuthContext: Logout error:', error);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        console.error('❌ AuthContext: Password reset error:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('❌ AuthContext: Password reset exception:', error);
      return false;
    }
  };

  const verifyOTP = async (code: string): Promise<boolean> => {
    // Mock OTP verification
    return code.length === 6;
  };

  const unlockScreen = async (password: string): Promise<boolean> => {
    // Mock unlock
    return password.length > 0;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        forgotPassword,
        verifyOTP,
        unlockScreen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
