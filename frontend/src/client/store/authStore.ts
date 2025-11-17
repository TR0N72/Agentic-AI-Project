import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
  logout: () => void;
}

const getInitialSession = () => {
  const storedSession = localStorage.getItem('session');
  if (storedSession) {
    try {
      return JSON.parse(storedSession);
    } catch (error) {
      console.error("Failed to parse session from local storage", error);
      return null;
    }
  }
  return null;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: getInitialSession(),
  user: getInitialSession()?.user ?? null,
  setSession: (session) => {
    set({ session, user: session?.user ?? null });
    if (session) {
      localStorage.setItem('session', JSON.stringify(session));
    } else {
      localStorage.removeItem('session');
    }
  },
  logout: () => {
    set({ session: null, user: null });
    localStorage.removeItem('session');
  }
}));