'use client';

import Link from 'next/link';
import { useUser } from '#/context/UserContext';
import { Button } from './Button';

const navigation = [{ name: 'Home', href: '/' }];

export const Header = () => {
  const { user, logout } = useUser();

  if (!user) {
    return null;
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto px-4 sm:px-6 lg:px-12" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b-2 border-gray-100 py-6">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Your Company</span>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span className="text-base font-medium text-gray-900 hover:text-gray-700">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {user?.issuer ? (
              <Button
                variant="text"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link href={'/login'}>
                <span className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  Log in
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <a key={link.name} href={link.href} className="text-base font-medium text-gray-500 hover:text-gray-900">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
