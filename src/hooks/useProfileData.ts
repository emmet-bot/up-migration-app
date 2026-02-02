'use client';

import { useState, useEffect } from 'react';
import { getProfileByAddress, getBestProfileImage } from '@/lib/indexer/queries';
import type { NetworkId } from '@/constants/endpoints';
import type { ProfileDetails } from '@/types/profile';

/**
 * Profile data including resolved avatar URL
 */
export interface ProfileData {
  address: string;
  name: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch profile data for a given address.
 * Includes loading and error states.
 * 
 * @param address - The profile address to fetch
 * @param network - Network to query (mainnet/testnet)
 * @returns ProfileData with loading/error states
 */
export function useProfileData(
  address: string | null | undefined,
  network?: NetworkId | null
): ProfileData {
  const [data, setData] = useState<ProfileData>({
    address: address || '',
    name: null,
    fullName: null,
    avatarUrl: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!address) {
      setData({
        address: '',
        name: null,
        fullName: null,
        avatarUrl: null,
        isLoading: false,
        error: null,
      });
      return;
    }

    let cancelled = false;
    const normalizedAddress = address || '';

    async function fetchProfile() {
      setData(prev => ({ ...prev, address: normalizedAddress, isLoading: true, error: null }));

      try {
        const profile = await getProfileByAddress(normalizedAddress, network ?? undefined);
        
        if (cancelled) return;

        if (profile) {
          const avatarUrl = getBestProfileImage(profile.profileImages, 'medium');
          setData({
            address: normalizedAddress,
            name: profile.name,
            fullName: profile.fullName,
            avatarUrl,
            isLoading: false,
            error: null,
          });
        } else {
          // Profile not found - not an error, just no data
          setData({
            address: normalizedAddress,
            name: null,
            fullName: null,
            avatarUrl: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (err) {
        if (cancelled) return;
        
        console.error('Failed to fetch profile:', err);
        setData({
          address: normalizedAddress,
          name: null,
          fullName: null,
          avatarUrl: null,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Failed to fetch profile',
        });
      }
    }

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [address, network]);

  return data;
}

/**
 * Hook to preload an image and track its loading state.
 * Returns true once the image has loaded.
 * 
 * @param src - Image URL to preload
 * @returns Object with loaded state and error
 */
export function useImagePreload(src: string | null | undefined): {
  loaded: boolean;
  error: boolean;
} {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setLoaded(false);
      setError(false);
      return;
    }

    setLoaded(false);
    setError(false);

    const img = new Image();
    
    img.onload = () => {
      setLoaded(true);
      setError(false);
    };
    
    img.onerror = () => {
      setLoaded(false);
      setError(true);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loaded, error };
}
