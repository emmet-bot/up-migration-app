'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { CompositeAvatar } from '@/components/shared/CompositeAvatar';
import { formatUsername, shortenAddress } from '@/lib/utils/format';
import { useProfileData } from '@/hooks/useProfileData';
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

const sizeMap = {
  sm: 'sm' as const,
  md: 'md' as const,
  lg: 'xl' as const,
};

/**
 * Profile Identity Card
 * 
 * Displays a profile with:
 * - Composite avatar (profile picture with identicon overlay)
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

  const displayName = name ? formatUsername(name, address) : null;
  const displayAddress = showFullAddress ? address : shortenAddress(address);

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        {label && (
          <span className="text-xs text-muted-foreground">{label}</span>
        )}
        
        {/* Composite Avatar */}
        <CompositeAvatar
          address={address}
          avatarUrl={avatarUrl}
          name={name}
          size={sizeMap[size]}
          showLoadingState={true}
        />

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
      {/* Composite Avatar */}
      <CompositeAvatar
        address={address}
        avatarUrl={avatarUrl}
        name={name}
        size={sizeMap[size]}
        showLoadingState={true}
      />

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
 * Shows composite avatar + short address/name.
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

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Composite Avatar */}
      <CompositeAvatar
        address={address}
        avatarUrl={avatarUrl}
        name={name}
        size="sm"
        showLoadingState={true}
      />

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
