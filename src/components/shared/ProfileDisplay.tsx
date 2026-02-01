'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { compactAddress } from '@/lib/utils/format';
import { generateIdenticon } from '@/lib/utils/identicon';

interface ProfileDisplayProps {
  address: string;
  name?: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

/**
 * Consistent profile display component showing:
 * - Profile picture (with identicon fallback)
 * - Username (if available)
 * - Compact address (e.g., "0xAb...")
 */
export function ProfileDisplay({
  address,
  name,
  avatarUrl,
  size = 'md',
  className = '',
}: ProfileDisplayProps) {
  const identicon = generateIdenticon(address);
  const displayName = name || 'Unknown';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={avatarUrl || undefined} alt={displayName} />
        <AvatarFallback className="p-0">
          {identicon ? (
            <img
              src={identicon}
              alt={displayName}
              className="w-full h-full rounded-full"
            />
          ) : (
            <span className="text-xs">
              {displayName.slice(0, 2).toUpperCase()}
            </span>
          )}
        </AvatarFallback>
      </Avatar>

      <div className="flex items-center gap-1.5 min-w-0">
        {name && (
          <span className="font-medium truncate">{name}</span>
        )}
        <span className="text-sm text-muted-foreground font-mono flex-shrink-0">
          {compactAddress(address)}
        </span>
      </div>
    </div>
  );
}

/**
 * Simple inline address display with identicon
 * For use in info rows showing just address
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
  const identicon = generateIdenticon(address);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Avatar className={size === 'sm' ? 'h-5 w-5' : 'h-6 w-6'}>
        <AvatarFallback className="p-0">
          {identicon ? (
            <img
              src={identicon}
              alt={address}
              className="w-full h-full rounded-full"
            />
          ) : null}
        </AvatarFallback>
      </Avatar>
      <span className="font-mono text-sm">{compactAddress(address)}</span>
    </div>
  );
}
