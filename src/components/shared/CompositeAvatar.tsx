'use client';

import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { generateIdenticon } from '@/lib/utils/identicon';
import { useImagePreload } from '@/hooks/useProfileData';

interface CompositeAvatarProps {
  address: string;
  avatarUrl?: string | null;
  name?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showLoadingState?: boolean;
  className?: string;
}

const sizeConfig = {
  xs: {
    container: 'h-5 w-5',
    identicon: 'h-5 w-5',
    profile: 'h-4 w-4',
    border: 'border',
  },
  sm: {
    container: 'h-8 w-8',
    identicon: 'h-8 w-8',
    profile: 'h-6 w-6',
    border: 'border-2',
  },
  md: {
    container: 'h-10 w-10',
    identicon: 'h-10 w-10',
    profile: 'h-8 w-8',
    border: 'border-2',
  },
  lg: {
    container: 'h-12 w-12',
    identicon: 'h-12 w-12',
    profile: 'h-10 w-10',
    border: 'border-2',
  },
  xl: {
    container: 'h-16 w-16',
    identicon: 'h-16 w-16',
    profile: 'h-14 w-14',
    border: 'border-[3px]',
  },
};

export function CompositeAvatar({
  address,
  avatarUrl,
  name,
  size = 'md',
  showLoadingState = true,
  className = '',
}: CompositeAvatarProps) {
  const identicon = generateIdenticon(address);
  const { loaded: imageLoaded, error: imageError } = useImagePreload(avatarUrl);
  const [imageFailed, setImageFailed] = useState(false);

  const config = sizeConfig[size];
  const altText = name || address;

  const hasProfilePic = avatarUrl && imageLoaded && !imageFailed && !imageError;
  const isLoading = showLoadingState && avatarUrl && !imageLoaded && !imageError && !imageFailed;

  if (isLoading) {
    return (
      <div className={['relative', config.container, className].join(' ')}>
        <Skeleton className={['rounded-full', config.container].join(' ')} />
      </div>
    );
  }

  if (!hasProfilePic) {
    return (
      <div className={['relative', config.container, className].join(' ')}>
        {identicon ? (
          <img
            src={identicon}
            alt={altText}
            className={['rounded-full', config.identicon].join(' ')}
          />
        ) : (
          <div className={['rounded-full bg-muted flex items-center justify-center', config.identicon].join(' ')}>
            <span className="text-xs text-muted-foreground">
              {(name || 'UP').slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={['relative', config.container, className].join(' ')}>
      {identicon && (
        <img
          src={identicon}
          alt=""
          aria-hidden="true"
          className={['absolute inset-0 rounded-full', config.identicon].join(' ')}
        />
      )}
      <img
        src={avatarUrl!}
        alt={altText}
        onError={() => setImageFailed(true)}
        className={['absolute inset-0 m-auto rounded-full border-background object-cover', config.profile, config.border].join(' ')}
      />
    </div>
  );
}

export function SimpleAvatar({
  address,
  avatarUrl,
  name,
  size = 'md',
  showLoadingState = true,
  className = '',
}: CompositeAvatarProps) {
  const identicon = generateIdenticon(address);
  const { loaded: imageLoaded, error: imageError } = useImagePreload(avatarUrl);
  const [imageFailed, setImageFailed] = useState(false);

  const config = sizeConfig[size];
  const altText = name || address;

  const hasProfilePic = avatarUrl && imageLoaded && !imageFailed && !imageError;
  const isLoading = showLoadingState && avatarUrl && !imageLoaded && !imageError && !imageFailed;

  if (isLoading) {
    return <Skeleton className={['rounded-full', config.container, className].join(' ')} />;
  }

  if (hasProfilePic) {
    return (
      <img
        src={avatarUrl!}
        alt={altText}
        onError={() => setImageFailed(true)}
        className={['rounded-full object-cover', config.container, className].join(' ')}
      />
    );
  }

  return identicon ? (
    <img
      src={identicon}
      alt={altText}
      className={['rounded-full', config.container, className].join(' ')}
    />
  ) : (
    <div className={['rounded-full bg-muted flex items-center justify-center', config.container, className].join(' ')}>
      <span className="text-xs text-muted-foreground">
        {(name || 'UP').slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}
