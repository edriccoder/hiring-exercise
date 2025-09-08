import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

type Mode = 'system' | 'light' | 'dark';
type Scheme = 'light' | 'dark' | null | undefined;

type ThemePreference = {
  mode: Mode;
  setMode: (m: Mode) => void;
  effectiveScheme: 'light' | 'dark';
};

const Ctx = createContext<ThemePreference | undefined>(undefined);

export function ThemePreferenceProvider({ children }: { children: React.ReactNode }) {
  const system = useRNColorScheme() as Scheme;
  const [mode, setMode] = useState<Mode>('system');
  const effectiveScheme: 'light' | 'dark' = useMemo(() => {
    if (mode === 'light' || mode === 'dark') return mode;
    return system === 'dark' ? 'dark' : 'light';
  }, [mode, system]);

  const value = useMemo(() => ({ mode, setMode, effectiveScheme }), [mode, effectiveScheme]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useThemePreference() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useThemePreference must be used within ThemePreferenceProvider');
  return v;
}
