import { cookies } from 'next/headers';

export const getSessionId = () => {
  const cookieStore = cookies();
  return cookieStore.get('sessionId')?.value;
};

export const setSessionId = (sessionId: string) => {
  cookies().set('sessionId', sessionId, { httpOnly: true, secure: true });
};