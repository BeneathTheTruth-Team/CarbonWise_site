import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User } from '@/types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  language: 'zh' | 'en';
}

interface AppContextType extends AppState {
  login: (user: User) => void;
  logout: () => void;
  toggleTheme: () => void;
  setLanguage: (lang: 'zh' | 'en') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    isAuthenticated: false,
    theme: 'light',
    language: 'zh',
  });

  const login = useCallback((user: User) => {
    setState(prev => ({ ...prev, user, isAuthenticated: true }));
  }, []);

  const logout = useCallback(() => {
    setState(prev => ({ ...prev, user: null, isAuthenticated: false }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  }, []);

  const setLanguage = useCallback((language: 'zh' | 'en') => {
    setState(prev => ({ ...prev, language }));
  }, []);

  return (
    <AppContext.Provider value={{ ...state, login, logout, toggleTheme, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
