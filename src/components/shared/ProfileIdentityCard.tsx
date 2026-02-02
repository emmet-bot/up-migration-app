'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { formatUsername, shortenAddress } from '@/lib/utils/format';
import { generateIdenticon } from '@/lib/utils/identicon';
import { useProfileData, useImagePreload } from '@/hooks/useProfileData';
import type { NetworkId } from '@/constants/endpoints';

interface ProfileIdentityCardProps {
  /** Address to display */
  address: string;
  /** Network for profile lookup */
  network?: NetworkId | null;
  /** Layout variant */
  variant?: 'horizontal' | 'vertical';
  /** Show full address instead of shortened */
  showFullAddress?: boolean;
  /** Custom label above the card */
  label?: string;
  /** Size of the avatar */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

const avatarSizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
};

/**
 * Profile Identity Card
 * 
 * Displays a profile with:
 * - Profile picture (with loading state, falls back to identicon)
 * - Name (if available)
 * - Address
 * 
 * Supports horizontal (inline) and vertical (stacked) layouts.
 */
export function ProfileIdentityCard({
  address,
  network,
  variant = 'horizontal',
  showFullAddress = false,
  label,
  size = 'md',
  className = '',
}: ProfileIdentityCardProps) {
  const { name, avatarUrl, isLoading: profileLoading } = useProfileData(address, network);
  const { loaded: imageLoaded, error: imageError } = useImagePreload(avatarUrl);
  const [imageFailed, setImageFailed] = useState(false);

  const identicon = generateIdenticon(address);
  const displayName = name ? formatUsername(name, address) : null;
  const displayAddress = showFullAddress ? address : shortenAddress(address);

  // Determine what to show in avatar
  const showAvatar = avatarUrl && imageLoaded && !imageFailed && !imageError;
  const showSkeleton = profileLoading || (avatarUrl && !imageLoaded && !imageError && !imageFailed);

  const handleImageError = () => {
    setImageFailed(true);
  };

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        {label && (
          <span className="text-xs text-muted-foreground">{label}</span>
        )}
        
        {/* Avatar with loading state */}
        <div className={`relative ${avatarSizeClasses[size]}`}>
          {showSkeleton ? (
            <Skeleton className={`rounded-full ${avatarSizeClasses[size]}`} />
          ) : (
            <Avatar className={avatarSizeClasses[size]}>
              {showAvatar ? (
                <AvatarImage 
                  src={avatarUrl} 
                  alt={displayName || address}
                  onError={handleImageError}
                />
              ) : null}
              <AvatarFallback className="p-0">
                {identicon ? (
                  <img
                    src={identicon}
                    alt={displayName || address}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-xs">
                    {(name || 'UP').slice(0, 2).toUpperCase()}
                  </span>
                )}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        {/* Name */}
        {profileLoading ? (
          <Skeleton className="h-4 w-24" />
        ) : displayName ? (
          <span className="font-medium text-sm truncate max-w-full">
            {displayName}
          </span>
        ) : null}

        {/* Address */}
        <span className="font-mono text-xs text-muted-foreground truncate max-w-full">
          {displayAddress}
        </span>
      </div>
    );
  }

  // Horizontal layout (default)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Avatar with loading state */}
      <div className={`relative flex-shrink-0 ${avatarSizeClasses[size]}`}>
        {showSkeleton ? (
          <Skeleton className={`rounded-full ${avatarSizeClasses[size]}`} />
        ) : (
          <Avatar className={avatarSizeClasses[size]}>
            {showAvatar ? (
              <AvatarImage 
                src={avatarUrl} 
                alt={displayName || address}
                onError={handleImageError}
              />
            ) : null}
            <AvatarFallback className="p-0">
              {identicon ? (
                <img
                  src={identicon}
                  alt={displayName || address}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <span className="text-xs">
                  {(name || 'UP').slice(0, 2).toUpperCase()}
                </span>
              )}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* Name and Address */}
      <div className="flex flex-col min-w-0">
        {label && (
          <span className="text-xs text-muted-foreground">{label}</span>
        )}
        {profileLoading ? (
          <>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-3 w-24" />
          </>
        ) : (
          <>
            {displayName && (
              <span className="font-medium text-sm truncate">
                {displayName}
              </span>
            )}
            <span className="font-mono text-xs text-muted-foreground truncate">
              {displayAddress}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Compact profile display for headers/navigation.
 * Shows avatar + short address, with optional name on hover.
 */
export function ProfileMicroHeader({
  address,
  network,
  className = '',
}: {
  address: string;
  network?: NetworkId | null;
  className?: string;
}) {
  const { name, avatarUrl, isLoading } = useProfileData(address, network);
  const { loaded: imageLoaded, error: imageError } = useImagePreload(avatarUrl);
  const [imageFailed, setImageFailed] = useState(false);

  const identicon = generateIdenticon(address);
  const showAvatar = avatarUrl && imageLoaded && !imageFailed && !imageError;
  const showSkeleton = isLoading || (avatarUrl && !imageLoaded && !imageError && !imageFailed);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Avatar */}
      <div className="relative h-6 w-6 flex-shrink-0">
        {showSkeleton ? (
          <Skeleton className="rounded-full h-6 w-6" />
        ) : (
          <Avatar className="h-6 w-6">
            {showAvatar ? (
              <AvatarImage 
                src={avatarUrl} 
                alt={name || address}
                onError={() => setImageFailed(true)}
              />
            ) : null}
            <AvatarFallback className="p-0 text-[10px]">
              {identicon ? (
                <img
                  src={identicon}
                  alt={name || address}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <span>{(name || 'UP').slice(0, 2).toUpperCase()}</span>
              )}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* Short address or name */}
      <span className="text-sm font-medium truncate">
        {isLoading ? (
          <Skeleton className="h-4 w-16 inline-block" />
        ) : name ? (
          name.length > 12 ? `${name.slice(0, 10)}...` : name
        ) : (
          shortenAddress(address, 4)
        )}
      </span>
    </div>
  );
}
