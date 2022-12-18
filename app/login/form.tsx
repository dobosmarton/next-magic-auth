'use client';

import { FormEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { login as loginService } from './service';
import { Button } from '../../ui/Button';
import { TextInput } from '../../ui/TextInput';
import { useUser } from '#/context/UserContext';

type FormProps = {};

export const LoginForm: React.FunctionComponent<FormProps> = (props) => {
  const router = useRouter();

  const { login, getUserData, user } = useUser();
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    user?.issuer && router.push('/');
  }, [user]);

  const handleLoginWithEmail = async (email: string) => {
    try {
      const didToken = await login(email);

      // Validate didToken with server
      const res = await loginService(didToken);

      if (res.status === 200) {
        getUserData();
        router.push('/');
      }
    } catch (error) {
      console.log('handleLoginWithEmail#error', (error as any).message);
    }
  };

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleLoginWithEmail(email);
  };

  return (
    <form className="space-y-6" onSubmit={onFormSubmit}>
      <div>
        <label html-for="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full justify-center">
        Sign in
      </Button>
    </form>
  );
};
