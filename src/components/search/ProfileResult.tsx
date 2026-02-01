'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { compactAddress } from '@/lib/utils/format';
import { generateIdenticon } from '@/lib/utils/identicon';
import { getBestProfileImage } from '@/lib/indexer/queries';
import type { ProfileSearchResult } from '@/types/profile';

interface ProfileResultProps {
  profile: ProfileSearchResult;
  onClick: () => void;
}

export function ProfileResult({ profile, onClick }: ProfileResultProps) {
  const avatarUrl = getBestProfileImage(profile.profileImages, 'small');
  const identicon = generateIdenticon(profile.id);
  const displayName = profile.name || profile.fullName || 'Unnamed Profile';

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left"
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarUrl || undefined} alt={displayName} />
        {/* Use identicon as fallback instead of text initials */}
        <AvatarFallback className="p-0">
          {identicon ? (
            <img
              src={identicon}
              alt={displayName}
              className="w-full h-full rounded-full"
            />
          ) : (
            <span className="text-xs">
              {displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
            </span>
          )}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">{displayName}</span>
          <span className="text-sm text-muted-foreground font-mono flex-shrink-0">
            {compactAddress(profile.id)}
          </span>
        </div>
      </div>

      <svg
        className="w-5 h-5 text-muted-foreground flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}
