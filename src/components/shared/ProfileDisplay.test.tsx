import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProfileDisplay, AddressWithIdenticon } from './ProfileDisplay';

// Mock the identicon generator
vi.mock('@/lib/utils/identicon', () => ({
  generateIdenticon: (address: string) => 
    address ? `data:image/png;base64,mock-identicon-${address.slice(0, 6)}` : '',
}));

// Mock the useImagePreload hook to return loaded immediately in tests
vi.mock('@/hooks/useProfileData', () => ({
  useImagePreload: (src: string | null | undefined) => ({
    loaded: !!src, // Mark as loaded if src is provided
    error: false,
  }),
}));

describe('ProfileDisplay', () => {
  const testAddress = '0xa1b2c3d4e5f6789012345678901234567890abcd';

  it('should render with name and format as @name#abcd', () => {
    render(
      <ProfileDisplay 
        address={testAddress} 
        name="johndoe" 
      />
    );
    
    expect(screen.getByText('@johndoe#a1b2')).toBeInTheDocument();
  });

  it('should render address suffix only when no name provided', () => {
    render(
      <ProfileDisplay 
        address={testAddress} 
      />
    );
    
    expect(screen.getByText('#a1b2')).toBeInTheDocument();
  });

  it('should render with avatar URL when provided', () => {
    const avatarUrl = 'https://example.com/avatar.jpg';
    const { container } = render(
      <ProfileDisplay 
        address={testAddress} 
        name="johndoe"
        avatarUrl={avatarUrl}
      />
    );
    
    // The Avatar component renders the img inside AvatarImage
    // Check that the avatar container exists and has the right structure
    const avatarContainer = container.querySelector('[data-slot="avatar"]') || 
                           container.querySelector('.relative');
    expect(avatarContainer).toBeInTheDocument();
    
    // The AvatarImage component should have the src set even if not loaded
    const avatarImg = container.querySelector('img');
    expect(avatarImg).toBeInTheDocument();
  });

  it('should show identicon fallback when no avatar URL', () => {
    render(
      <ProfileDisplay 
        address={testAddress} 
        name="johndoe"
      />
    );
    
    // Should have identicon image as fallback
    const identiconImg = document.querySelector('img[src*="mock-identicon"]');
    expect(identiconImg).toBeInTheDocument();
  });

  it('should apply different sizes', () => {
    const { rerender, container } = render(
      <ProfileDisplay 
        address={testAddress} 
        name="johndoe"
        size="sm"
      />
    );
    
    let avatar = container.querySelector('[class*="h-6 w-6"]');
    expect(avatar).toBeInTheDocument();
    
    rerender(
      <ProfileDisplay 
        address={testAddress} 
        name="johndoe"
        size="lg"
      />
    );
    
    avatar = container.querySelector('[class*="h-10 w-10"]');
    expect(avatar).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ProfileDisplay 
        address={testAddress} 
        name="johndoe"
        className="custom-class"
      />
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });
});

describe('AddressWithIdenticon', () => {
  const testAddress = '0xa1b2c3d4e5f6789012345678901234567890abcd';

  it('should render address suffix format', () => {
    render(
      <AddressWithIdenticon address={testAddress} />
    );
    
    expect(screen.getByText('#a1b2')).toBeInTheDocument();
  });

  it('should show identicon', () => {
    render(
      <AddressWithIdenticon address={testAddress} />
    );
    
    const identiconImg = document.querySelector('img[src*="mock-identicon"]');
    expect(identiconImg).toBeInTheDocument();
  });

  it('should apply different sizes', () => {
    const { rerender, container } = render(
      <AddressWithIdenticon address={testAddress} size="sm" />
    );
    
    let avatar = container.querySelector('[class*="h-5 w-5"]');
    expect(avatar).toBeInTheDocument();
    
    rerender(
      <AddressWithIdenticon address={testAddress} size="md" />
    );
    
    avatar = container.querySelector('[class*="h-6 w-6"]');
    expect(avatar).toBeInTheDocument();
  });
});
