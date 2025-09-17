import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../utils/supabase/supabase';

type UserRole = 'admin' | 'super_moderator' | 'project_moderator' | 'library_moderator' | 'community_moderator' | 'user';

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
  login: (email: string, password: string) => Promise<boolean>;
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

  useEffect(() => {
    // Check for existing Supabase session
    console.log('🔄 AuthContext: Initializing Supabase connection check...');
    const getSession = async () => {
      console.log('🔍 AuthContext: Checking for existing session...');
      const { data: { session } } = await supabase.auth.getSession();
      console.log('📋 AuthContext: Session data:', session ? 'Session found' : 'No session');
      console.log('📋 AuthContext: Full session object:', session);
      if (session?.user) {
        // Get user profile from database
        console.log('👤 AuthContext: Fetching user profile for ID:', session.user.id);
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        console.log('📊 AuthContext: Profile data:', profile ? 'Profile found' : 'No profile', profile);
        console.log('🔍 AuthContext: Profile error:', profileError);
        
        if (profile) {
          const userData = {
            id: profile.id,
            name: profile.username || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            avatar: profile.avatar_url || undefined,
            role: profile.role || 'user'
          };
          console.log('✅ AuthContext: Setting user data:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Create basic user data even if no profile exists
          console.log('⚠️ AuthContext: No profile found, creating basic user data');
          const userData = {
            id: session.user.id,
            name: session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            avatar: undefined,
            role: 'user' as UserRole
          };
          console.log('✅ AuthContext: Setting basic user data:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        }
      }
    };

    getSession();

    // Listen for auth changes
    console.log('👂 AuthContext: Setting up auth state listener...');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔔 AuthContext: Auth state changed:', event, session ? 'Session exists' : 'No session');
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('👤 AuthContext: Fetching profile after sign in for ID:', session.user.id);
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        console.log('📊 AuthContext: Profile after sign in:', profile ? 'Profile found' : 'No profile', profile);
        console.log('🔍 AuthContext: Profile error:', profileError);
        
        if (profile) {
          const userData = {
            id: profile.id,
            name: profile.username || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            avatar: profile.avatar_url || undefined,
            role: profile.role || 'user'
          };
          console.log('✅ AuthContext: Setting user data after sign in:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Create basic user data even if no profile exists
          console.log('⚠️ AuthContext: No profile found after sign in, creating basic user data');
          const userData = {
            id: session.user.id,
            name: session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            avatar: undefined,
            role: 'user' as UserRole
          };
          console.log('✅ AuthContext: Setting basic user data after sign in:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('🚪 AuthContext: User signed out');
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('🔐 AuthContext: Attempting login for:', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      console.log('📡 AuthContext: Login response:', { user: data.user ? 'User found' : 'No user', error: error?.message });

      if (error) {
        console.error('❌ AuthContext: Login error:', error.message);
        return false;
      }

      if (data.user) {
        console.log('✅ AuthContext: Login successful, profile will be loaded by listener');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    console.log('📝 AuthContext: Attempting registration for:', email, 'with name:', name);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username: name } // store extra info in user_metadata
        }
      });
      console.log('📡 AuthContext: Registration response:', { user: data.user ? 'User created' : 'No user', error: error?.message });

      if (error) {
        console.error('❌ AuthContext: Registration error:', error.message);
        return false;
      }

      const success = !!data.user;
      console.log(success ? '✅ AuthContext: Registration successful' : '❌ AuthContext: Registration failed - no user returned');
      return success;
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
        console.error('Password reset error:', error.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
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
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      forgotPassword,
      verifyOTP,
      unlockScreen
    }}>
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