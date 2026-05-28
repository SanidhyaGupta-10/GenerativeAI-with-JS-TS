'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { api } from '@/lib/axios';

/**
 * @hook useUserSync
 * @description Fires exactly once per authenticated session to sync the user. It grabs the Clerk session token and sends it to the backend to verify the user and upsert them in the database (Neon/Prisma).
 * @effect Automatically runs on mount if the user is loaded and signed in.
 */
export function useUserSync() {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const hasSynced = useRef(false);

  useEffect(() => {
    // Only run when Clerk has finished loading and user is signed in
    if (!isLoaded || !isSignedIn || hasSynced.current) return;

    const syncUser = async () => {
      try {
        // Get the short-lived JWT from Clerk (Bearer token for the backend)
        const token = await getToken();
        if (!token) return;

        const response = await api.post(
          '/user/create-user',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('[useUserSync] User synced to Neon ✅', response.data.user);
        hasSynced.current = true;
      } catch (err: unknown) {
        // Log but don't crash — user can still use the app
        if (err instanceof Error) {
          console.error('[useUserSync] Failed to sync user:', err.message);
        }
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, getToken]);
}
