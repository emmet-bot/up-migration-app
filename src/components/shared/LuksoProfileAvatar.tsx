'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import '@/types/lukso-components.d';

// Import lukso components on client side only
// Using the main import which registers all components
if (typeof window !== 'undefined') {
  import('@lukso/web-components');
}

type LuksoSize = '2x-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | '2x-large';

interface LuksoProfileAvatarProps {
  /** Profile address for identicon generation */
  address: string;
  /** Profile picture URL (optional) */
  profileUrl?: string | null;
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Show identicon badge when profile pic exists */
  showIdenticon?: boolean;
  /** Show loading skeleton while component initializes */
  showLoadingState?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// Map our size variants to LUKSO's size names
const sizeMap: Record<string, LuksoSize> = {
  'xs': '2x-small',
  'sm': 'x-small',
  'md': 'small',
  'lg': 'medium',
  'xl': 'large',
  '2xl': 'x-large',
};

// Size classes for loading skeleton (match LUKSO sizes)
const skeletonSizeClasses: Record<string, string> = {
  'xs': 'h-4 w-4',
  'sm': 'h-6 w-6',
  'md': 'h-10 w-10',
  'lg': 'h-14 w-14',
  'xl': 'h-20 w-20',
  '2xl': 'h-24 w-24',
};

/**
 * LUKSO Profile Avatar Component
 * 
 * Wrapper around the official lukso-profile web component.
 * Handles:
 * - SSR compatibility (web components only load on client)
 * - Size mapping from our variants to LUKSO's
 * - Identicon display with profile pictures
 * - Loading states
 */
export function LuksoProfileAvatar({
  address,
  profileUrl,
  size = 'md',
  showIdenticon = true,
  showLoadingState = false,
  className = '',
}: LuksoProfileAvatarProps) {
  // Track if component is mounted (for SSR)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const luksoSize = sizeMap[size] || 'small';
  const skeletonClass = skeletonSizeClasses[size] || 'h-10 w-10';

  // Show skeleton during SSR or initial load
  if (!isMounted && showLoadingState) {
    return <Skeleton className={`rounded-full ${skeletonClass} ${className}`} />;
  }

  // Use undefined for empty URLs so the component uses its default placeholder
  const url = profileUrl || undefined;

  return (
    <lukso-profile
      profile-url={url}
      profile-address={address}
      has-identicon={showIdenticon}
      size={luksoSize}
      className={className}
    />
  );
}

/**
 * Simplified alias for common use case
 */
export function ProfileAvatar({
  address,
  avatarUrl,
  size = 'md',
  className = '',
}: {
  address: string;
  avatarUrl?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}) {
  return (
    <LuksoProfileAvatar
      address={address}
      profileUrl={avatarUrl}
      size={size}
      showIdenticon={true}
      className={className}
    />
  );
}
