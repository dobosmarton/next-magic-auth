'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagicUserMetadata } from 'magic-sdk';
import { useMagicAuth } from '#/lib/magic';

type UserContextState = {
  user: MagicUserMetadata | null;
  isLoading: boolean;
  login: (email: string) => Promise<string | null>;
  logout: () => Promise<void>;
  getUserData: () => Promise<void>;
};

// Ignoring missing initialValue, because there's always a provider and value is provided
// @ts-ignore - value is provided in index.tsx
export const UserContext = createContext<UserContextState>();

export const useUser = () => useContext(UserContext);

export type UserProviderProps = {
  //
};

export const UserProvider = ({ children }: PropsWithChildren<UserProviderProps>) => {
  const magicAuth = useMagicAuth();
  const router = useRouter();
  const [user, setUser] = useState<MagicUserMetadata | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    magicAuth.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        getUserData();
      } else {
        router.push('/login');
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  const login = async (email: string) => magicAuth.login(email);

  const logout = async () =>
    magicAuth.logout().then(() => {
      setUser(null);
      router.push('/login');
    });

  const getUserData = async () => magicAuth.getMetadata().then((userData) => setUser(userData));

  const state: UserContextState = {
    user,
    isLoading,
    login,
    logout,
    getUserData,
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
