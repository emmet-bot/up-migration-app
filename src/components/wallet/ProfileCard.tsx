'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { compactAddress } from '@/lib/utils/format';
import { generateIdenticon } from '@/lib/utils/identicon';
import { getBestProfileImage } from '@/lib/indexer/queries';
import type { ProfileSearchResult } from '@/types/profile';

interface ProfileCardProps {
  profile: ProfileSearchResult;
  selected?: boolean;
  onClick?: () => void;
}

export function ProfileCard({ profile, selected, onClick }: ProfileCardProps) {
  const avatarUrl = getBestProfileImage(profile.profileImages, 'medium');
  const identicon = generateIdenticon(profile.id);
  const displayName = profile.name || profile.fullName || 'Unnamed Profile';

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
        <Avatar className="h-12 w-12">
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
              <span>
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
