'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { api } from '@/lib/axios';

/**
 * useUserSync
 *
 * Fires exactly once per authenticated session.
 * Sends the Clerk session token to the backend so the server can
 * verify the user via clerkClient and upsert them in Neon/Prisma.
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
