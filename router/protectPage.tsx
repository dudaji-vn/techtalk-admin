'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { keyStorage } from '@/const/keyStorage';

export default function protectPage(Component: any) {
  return function ProtectPage(props: any) {
    const auth = localStorage.getItem(keyStorage.accessToken);

    useEffect(() => {
      if (!auth) {
        return redirect('/auth/signin');
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
