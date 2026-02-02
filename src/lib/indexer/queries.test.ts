import { describe, it, expect } from 'vitest';
import { getBestProfileImage } from './queries';
import type { ProfileImage } from '@/types/profile';

describe('getBestProfileImage', () => {
  it('should return null for empty array', () => {
    expect(getBestProfileImage([])).toBeNull();
  });

  it('should return null for undefined', () => {
    expect(getBestProfileImage(undefined as unknown as ProfileImage[])).toBeNull();
  });

  it('should return the only image when array has single item', () => {
    const images: ProfileImage[] = [
      { width: 100, src: 'https://example.com/image.jpg', url: 'ipfs://Qm123', verified: true },
    ];
    
    // Should prefer src (HTTP URL) over url (IPFS URI)
    expect(getBestProfileImage(images)).toBe('https://example.com/image.jpg');
  });

  it('should prefer src (HTTP) over url (IPFS)', () => {
    const images: ProfileImage[] = [
      { width: 100, src: 'https://api.universalprofile.cloud/image/Qm123', url: 'ipfs://Qm123', verified: true },
    ];
    
    // Browsers can't load IPFS URIs directly, so prefer src
    expect(getBestProfileImage(images)).toBe('https://api.universalprofile.cloud/image/Qm123');
  });

  it('should fall back to url when src is empty', () => {
    const images: ProfileImage[] = [
      { width: 100, src: '', url: 'ipfs://Qm123', verified: true },
    ];
    
    // When src is empty, use url (converted to HTTP gateway)
    expect(getBestProfileImage(images)).toBe('https://api.universalprofile.cloud/image/Qm123');
  });

  it('should convert IPFS URI to HTTP gateway URL when falling back', () => {
    const images: ProfileImage[] = [
      { width: 100, src: '', url: 'ipfs://QmabcdefghijklmnopqrstuvwxyzABCDEF', verified: true },
    ];
    
    expect(getBestProfileImage(images)).toBe('https://api.universalprofile.cloud/image/QmabcdefghijklmnopqrstuvwxyzABCDEF');
  });

  it('should select image closest to small target (64px)', () => {
    const images: ProfileImage[] = [
      { width: 32, src: 'https://example.com/small.jpg', url: 'ipfs://small', verified: true },
      { width: 64, src: 'https://example.com/medium.jpg', url: 'ipfs://medium', verified: true },
      { width: 256, src: 'https://example.com/large.jpg', url: 'ipfs://large', verified: true },
    ];
    
    // 64px is closest to 64px target
    expect(getBestProfileImage(images, 'small')).toBe('https://example.com/medium.jpg');
  });

  it('should select image closest to medium target (200px)', () => {
    const images: ProfileImage[] = [
      { width: 64, src: 'https://example.com/small.jpg', url: 'ipfs://small', verified: true },
      { width: 180, src: 'https://example.com/medium.jpg', url: 'ipfs://medium', verified: true },
      { width: 400, src: 'https://example.com/large.jpg', url: 'ipfs://large', verified: true },
    ];
    
    // 180px is closest to 200px target
    expect(getBestProfileImage(images, 'medium')).toBe('https://example.com/medium.jpg');
  });

  it('should select image closest to large target (400px)', () => {
    const images: ProfileImage[] = [
      { width: 100, src: 'https://example.com/small.jpg', url: 'ipfs://small', verified: true },
      { width: 200, src: 'https://example.com/medium.jpg', url: 'ipfs://medium', verified: true },
      { width: 350, src: 'https://example.com/large.jpg', url: 'ipfs://large', verified: true },
    ];
    
    // 350px is closest to 400px target
    expect(getBestProfileImage(images, 'large')).toBe('https://example.com/large.jpg');
  });

  it('should default to medium size preference', () => {
    const images: ProfileImage[] = [
      { width: 64, src: 'https://example.com/small.jpg', url: 'ipfs://small', verified: true },
      { width: 200, src: 'https://example.com/exact-medium.jpg', url: 'ipfs://exact-medium', verified: true },
      { width: 800, src: 'https://example.com/very-large.jpg', url: 'ipfs://very-large', verified: true },
    ];
    
    // Default is medium (200px target)
    expect(getBestProfileImage(images)).toBe('https://example.com/exact-medium.jpg');
  });

  it('should handle unsorted image arrays', () => {
    const images: ProfileImage[] = [
      { width: 500, src: 'https://example.com/large.jpg', url: 'ipfs://large', verified: true },
      { width: 50, src: 'https://example.com/small.jpg', url: 'ipfs://small', verified: true },
      { width: 200, src: 'https://example.com/medium.jpg', url: 'ipfs://medium', verified: true },
    ];
    
    // Should still find closest to 200px target
    expect(getBestProfileImage(images, 'medium')).toBe('https://example.com/medium.jpg');
  });
});
