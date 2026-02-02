'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LuksoProfileAvatar } from '@/components/shared/LuksoProfileAvatar';
import { formatUsername } from '@/lib/utils/format';
import { getBestProfileImage } from '@/lib/indexer/queries';
import type { ProfileSearchResult } from '@/types/profile';

interface ProfileCardProps {
  profile: ProfileSearchResult;
  selected?: boolean;
  onClick?: () => void;
}

export function ProfileCard({ profile, selected, onClick }: ProfileCardProps) {
  const avatarUrl = getBestProfileImage(profile.profileImages, 'medium');
  const name = profile.name || profile.fullName;
  const formattedName = formatUsername(name, profile.id);

  return (
    <Card
      className={`
        transition-all
        ${selected ? 'ring-2 ring-primary border-primary' : 'hover:border-primary/50'}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 p-4">
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

        {selected && (
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
