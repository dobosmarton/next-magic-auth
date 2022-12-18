import { Magic, MagicUserMetadata } from 'magic-sdk';
import { useEffect, useRef } from 'react';

type Props = {
  login: (email: string) => Promise<string | null>;
  logout: () => Promise<boolean | null>;
  getMetadata: () => Promise<MagicUserMetadata | null>;
  isLoggedIn: () => Promise<boolean>;
};

export const useMagicAuth = (): Props => {
  const magicClient = useRef<Magic | null>(null);

  useEffect(() => {
    magicClient.current = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY ?? '');
  }, []);

  const login = async (email: string): Promise<string | null> => {
    if (!email || !magicClient.current) {
      return null;
    }

    return magicClient.current.auth.loginWithEmailOTP({ email });
  };

  const logout = async (): Promise<boolean | null> => {
    if (!magicClient.current) {
      return null;
    }
    return magicClient.current.user.logout();
  };

  const getMetadata = async (): Promise<MagicUserMetadata | null> => {
    if (!magicClient.current) {
      return null;
    }
    return magicClient.current.user.getMetadata();
  };

  const isLoggedIn = async (): Promise<boolean> => {
    if (!magicClient.current) {
      return false;
    }
    return magicClient.current.user.isLoggedIn();
  };

  return {
    login,
    logout,
    getMetadata,
    isLoggedIn,
  };
};
