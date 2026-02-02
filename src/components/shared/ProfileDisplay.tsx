'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { formatUsername } from '@/lib/utils/format';
import { generateIdenticon } from '@/lib/utils/identicon';
import { useImagePreload } from '@/hooks/useProfileData';

interface ProfileDisplayProps {
  address: string;
  name?: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Show skeleton while loading */
  showLoadingState?: boolean;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

/**
 * Consistent profile display component showing:
 * - Profile picture (with loading state and identicon fallback)
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
  const identicon = generateIdenticon(address);
  const formattedName = formatUsername(name, address);
  const { loaded: imageLoaded, error: imageError } = useImagePreload(avatarUrl);
  const [imageFailed, setImageFailed] = useState(false);

  const showAvatar = avatarUrl && imageLoaded && !imageFailed && !imageError;
  const showSkeleton = showLoadingState && avatarUrl && !imageLoaded && !imageError && !imageFailed;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`relative flex-shrink-0 ${sizeClasses[size]}`}>
        {showSkeleton ? (
          <Skeleton className={`rounded-full ${sizeClasses[size]}`} />
        ) : (
          <Avatar className={sizeClasses[size]}>
            {showAvatar ? (
              <AvatarImage 
                src={avatarUrl} 
                alt={formattedName}
                onError={() => setImageFailed(true)}
              />
            ) : null}
            <AvatarFallback className="p-0">
              {identicon ? (
                <img
                  src={identicon}
                  alt={formattedName}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <span className="text-xs">
                  {(name || 'UN').slice(0, 2).toUpperCase()}
                </span>
              )}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

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
  const identicon = generateIdenticon(address);
  // For address-only display, use shortened format
  const shortAddress = formatUsername(null, address);

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
      <span className="font-mono text-sm">{shortAddress}</span>
    </div>
  );
}
