'use client';

import { CompositeAvatar, SimpleAvatar } from '@/components/shared/CompositeAvatar';
import { formatUsername } from '@/lib/utils/format';

interface ProfileDisplayProps {
  address: string;
  name?: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Show skeleton while loading */
  showLoadingState?: boolean;
}

const sizeMap = {
  sm: 'sm' as const,
  md: 'md' as const,
  lg: 'lg' as const,
};

/**
 * Consistent profile display component showing:
 * - Composite avatar (profile picture with identicon overlay)
 * - Username in @name#abcd format
 */
export function ProfileDisplay({
  address,
  name,
  avatarUrl,
  size = 'md',
  className = '',
  showLoadingState = true,
}: ProfileDisplayProps) {
  const formattedName = formatUsername(name, address);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <CompositeAvatar
        address={address}
        avatarUrl={avatarUrl}
        name={name}
        size={sizeMap[size]}
        showLoadingState={showLoadingState}
      />

      <span className="font-medium truncate">
        {formattedName}
      </span>
    </div>
  );
}

/**
 * Simple inline address display with identicon
 * For use in info rows showing just address (no username)
 */
export function AddressWithIdenticon({
  address,
  size = 'sm',
  className = '',
}: {
  address: string;
  size?: 'sm' | 'md';
  className?: string;
}) {
  // For address-only display, use shortened format
  const shortAddress = formatUsername(null, address);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <SimpleAvatar
        address={address}
        size={size === 'sm' ? 'xs' : 'sm'}
      />
      <span className="font-mono text-sm">{shortAddress}</span>
    </div>
  );
}
