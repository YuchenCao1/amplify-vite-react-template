// src/UserContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';


interface UserContextType {
  user: any | null;
  signOut?: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  user: any | null;
  signOut?: () => void;
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ user, signOut, children }) => {
  return (
    <UserContext.Provider value={{ user, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
