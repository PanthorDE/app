import * as React from 'react';

export const PreferenceContext = React.createContext<{
  apiKey: string | null;
  setApiKey: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

export const PreferenceProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [apiKey, setApiKey] = React.useState<string | null>(null);

  return <PreferenceContext.Provider value={{ apiKey, setApiKey }}>{children}</PreferenceContext.Provider>;
};
