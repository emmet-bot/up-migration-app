'use client';

import { LuksoProfileAvatar } from '@/components/shared/LuksoProfileAvatar';
import { formatUsername } from '@/lib/utils/format';
import { getBestProfileImage } from '@/lib/indexer/queries';
import type { ProfileSearchResult } from '@/types/profile';

interface ProfileResultProps {
  profile: ProfileSearchResult;
  onClick: () => void;
}

export function ProfileResult({ profile, onClick }: ProfileResultProps) {
  const avatarUrl = getBestProfileImage(profile.profileImages, 'small');
  const name = profile.name || profile.fullName;
  const formattedName = formatUsername(name, profile.id);

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left"
    >
      {/* LUKSO Profile Avatar */}
      <LuksoProfileAvatar
        address={profile.id}
        profileUrl={avatarUrl}
        size="lg"
        showIdenticon={true}
      />

      <div className="flex-1 min-w-0">
        <span className="font-medium truncate block">{formattedName}</span>
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
