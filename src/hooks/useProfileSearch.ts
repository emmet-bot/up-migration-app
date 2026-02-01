'use client';

import { useState, useEffect, useCallback } from 'react';
import { searchProfiles } from '@/lib/indexer/queries';
import type { ProfileSearchResult } from '@/types/profile';
import type { NetworkId } from '@/constants/endpoints';

interface UseProfileSearchReturn {
  data: ProfileSearchResult[] | null;
  isLoading: boolean;
  error: string | null;
  search: (term: string) => void;
  reset: () => void;
}

export function useProfileSearch(
  network?: NetworkId,
  debounceMs = 300
): UseProfileSearchReturn {
  const [data, setData] = useState<ProfileSearchResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Debounced search
  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      setData(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await searchProfiles(searchTerm, network);
        setData(results);
      } catch (err) {
        console.error('Search error:', err);
        setError(err instanceof Error ? err.message : 'Search failed');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, network, debounceMs]);

  const search = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const reset = useCallback(() => {
    setSearchTerm('');
    setData(null);
    setError(null);
  }, []);

  return {
    data,
    isLoading,
    error,
    search,
    reset,
  };
}

// Hook for direct search without debounce
export function useProfileSearchDirect(
  searchTerm: string,
  network?: NetworkId
): UseProfileSearchReturn {
  const [data, setData] = useState<ProfileSearchResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      setData(null);
      return;
    }

    const fetchProfiles = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await searchProfiles(searchTerm, network);
        setData(results);
      } catch (err) {
        console.error('Search error:', err);
        setError(err instanceof Error ? err.message : 'Search failed');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [searchTerm, network]);

  return {
    data,
    isLoading,
    error,
    search: () => {}, // No-op for direct search
    reset: () => {}, // No-op for direct search
  };
}
