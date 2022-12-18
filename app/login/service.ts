'use client';

export const login = async (didToken: string | null): Promise<Response> => {
  if (!didToken) {
    throw new Error('Token is not defined!');
  }

  return fetch(`/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + didToken,
    },
  });
};
