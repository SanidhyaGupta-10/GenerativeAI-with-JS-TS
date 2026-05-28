'use client';

import { useUserSync } from '@/hooks/useUserSync';

/**
 * UserSyncProvider
 *
 * A thin client component that lives inside <ClerkProvider>.
 * It calls useUserSync() so the hook can access Clerk's auth context.
 * Must be a client component because useAuth (used inside the hook) is client-only.
 */
export default function UserSyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useUserSync(); // ← side-effect only; no render output
  return <>{children}</>;
}
