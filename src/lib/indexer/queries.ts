import { gql } from 'graphql-request';
import { getGraphQLClient } from './client';
import type { ProfileSearchResult, ProfileDetails } from '@/types/profile';
import type { NetworkId } from '@/constants/endpoints';

// GraphQL Queries
const SEARCH_PROFILES_QUERY = gql`
  query SearchProfiles($search: String!) {
    search_profiles(args: { search: $search }) {
      id
      name
      fullName
      profileImages(
        where: { error: { _is_null: true } }
        order_by: { width: asc }
      ) {
        width
        src
        url
        verified
      }
    }
  }
`;

const GET_PROFILE_BY_ADDRESS_QUERY = gql`
  query GetProfile($address: String!) {
    Profile(where: { id: { _eq: $address } }) {
      id
      name
      fullName
      description
      profileImages(
        where: { error: { _is_null: true } }
        order_by: { width: asc }
      ) {
        width
        src
        url
        verified
      }
      backgroundImages(
        where: { error: { _is_null: true } }
        order_by: { width: asc }
      ) {
        width
        src
        url
      }
      tags
      links {
        title
        url
      }
    }
  }
`;

interface SearchProfilesResponse {
  search_profiles: ProfileSearchResult[];
}

interface GetProfileResponse {
  Profile: ProfileDetails[];
}

/**
 * Search for Universal Profiles by name or address
 */
export async function searchProfiles(
  searchTerm: string,
  network?: NetworkId
): Promise<ProfileSearchResult[]> {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return [];
  }

  const client = getGraphQLClient(network);
  
  try {
    const data = await client.request<SearchProfilesResponse>(
      SEARCH_PROFILES_QUERY,
      { search: searchTerm.trim() }
    );
    
    return data.search_profiles || [];
  } catch (error) {
    console.error('Error searching profiles:', error);
    throw new Error('Failed to search profiles');
  }
}

/**
 * Get a Universal Profile by address
 */
export async function getProfileByAddress(
  address: string,
  network?: NetworkId
): Promise<ProfileDetails | null> {
  if (!address) {
    return null;
  }

  const client = getGraphQLClient(network);
  const normalizedAddress = address.toLowerCase();
  
  try {
    const data = await client.request<GetProfileResponse>(
      GET_PROFILE_BY_ADDRESS_QUERY,
      { address: normalizedAddress }
    );
    
    return data.Profile[0] || null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw new Error('Failed to fetch profile');
  }
}

/**
 * Convert IPFS URI to HTTP gateway URL
 */
function ipfsToHttp(uri: string): string {
  if (!uri) return uri;
  
  // Already an HTTP URL
  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    return uri;
  }
  
  // Convert ipfs:// URI to gateway URL
  if (uri.startsWith('ipfs://')) {
    const hash = uri.replace('ipfs://', '');
    return `https://api.universalprofile.cloud/image/${hash}`;
  }
  
  return uri;
}

/**
 * Get the best profile image URL
 */
export function getBestProfileImage(
  images: ProfileSearchResult['profileImages'],
  preferredSize: 'small' | 'medium' | 'large' = 'medium'
): string | null {
  if (!images || images.length === 0) {
    return null;
  }

  // Sort by width
  const sorted = [...images].sort((a, b) => a.width - b.width);
  
  // Target sizes
  const targetSizes = {
    small: 64,
    medium: 200,
    large: 400,
  };

  const target = targetSizes[preferredSize];
  
  // Find closest to target
  let best = sorted[0];
  let bestDiff = Math.abs(best.width - target);
  
  for (const img of sorted) {
    const diff = Math.abs(img.width - target);
    if (diff < bestDiff) {
      best = img;
      bestDiff = diff;
    }
  }
  
  // Prefer src (HTTP URL) over url (IPFS URI)
  // Convert IPFS URIs to HTTP gateway URLs as fallback
  if (best.src) {
    return ipfsToHttp(best.src);
  }
  
  return ipfsToHttp(best.url);
}
