'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ProfileResult } from './ProfileResult';
import { useProfileSearch } from '@/hooks/useProfileSearch';
import type { ProfileSearchResult } from '@/types/profile';
import type { NetworkId } from '@/constants/endpoints';

interface ProfileSearchProps {
  onSelect: (profile: ProfileSearchResult) => void;
  network?: NetworkId;
  placeholder?: string;
}

export function ProfileSearch({
  onSelect,
  network,
  placeholder = 'Search by name or address...',
}: ProfileSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { data: profiles, isLoading, error, search, reset } = useProfileSearch(network);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    search(value);
  };

  const handleProfileSelect = (profile: ProfileSearchResult) => {
    // Close dropdown and clear search
    setIsOpen(false);
    setQuery('');
    reset();
    // Notify parent
    onSelect(profile);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="pr-10"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <LoadingSpinner size="sm" />
          </div>
        )}
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      {isOpen && profiles && profiles.length > 0 && (
        <div className="border rounded-lg divide-y max-h-64 overflow-y-auto">
          {profiles.map((profile) => (
            <ProfileResult
              key={profile.id}
              profile={profile}
              onClick={() => handleProfileSelect(profile)}
            />
          ))}
        </div>
      )}

      {isOpen && profiles && profiles.length === 0 && query.trim() && (
        <div className="text-center text-muted-foreground py-8">
          No profiles found matching &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
