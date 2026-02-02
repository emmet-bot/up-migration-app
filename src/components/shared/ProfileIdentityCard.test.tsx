import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProfileIdentityCard, ProfileMicroHeader } from './ProfileIdentityCard';

// Mock the hooks
vi.mock('@/hooks/useProfileData', () => ({
  useProfileData: (address: string) => ({
    address,
    name: address === '0x1234567890abcdef1234567890abcdef12345678' ? 'testuser' : null,
    fullName: address === '0x1234567890abcdef1234567890abcdef12345678' ? 'Test User' : null,
    avatarUrl: address === '0x1234567890abcdef1234567890abcdef12345678' 
      ? 'https://example.com/avatar.jpg' 
      : null,
    isLoading: false,
    error: null,
  }),
  useImagePreload: (src: string | null | undefined) => ({
    loaded: !!src,
    error: false,
  }),
}));

// Mock the identicon generator
vi.mock('@/lib/utils/identicon', () => ({
  generateIdenticon: (address: string) =>
    address ? `data:image/png;base64,mock-identicon-${address.slice(0, 6)}` : '',
}));

describe('ProfileIdentityCard', () => {
  const testAddress = '0x1234567890abcdef1234567890abcdef12345678';
  const unknownAddress = '0x0000000000000000000000000000000000000001';

  it('should render with profile name and address', () => {
    render(<ProfileIdentityCard address={testAddress} />);

    // Should show formatted username
    expect(screen.getByText('@testuser#1234')).toBeInTheDocument();
    // Should show short address
    expect(screen.getByText('0x1234...5678')).toBeInTheDocument();
  });

  it('should render horizontal layout by default', () => {
    const { container } = render(<ProfileIdentityCard address={testAddress} />);
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'items-center', 'gap-3');
  });

  it('should render vertical layout when specified', () => {
    const { container } = render(
      <ProfileIdentityCard address={testAddress} variant="vertical" />
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'flex-col', 'items-center');
  });

  it('should show only address when profile not found', () => {
    render(<ProfileIdentityCard address={unknownAddress} />);

    // Should show short address
    expect(screen.getByText('0x0000...0001')).toBeInTheDocument();
  });

  it('should show label when provided', () => {
    render(
      <ProfileIdentityCard 
        address={testAddress} 
        variant="vertical" 
        label="Profile Owner"
      />
    );

    expect(screen.getByText('Profile Owner')).toBeInTheDocument();
  });

  it('should apply different sizes', () => {
    const { container, rerender } = render(
      <ProfileIdentityCard address={testAddress} size="sm" />
    );
    
    let avatar = container.querySelector('[class*="h-8 w-8"]');
    expect(avatar).toBeInTheDocument();

    rerender(<ProfileIdentityCard address={testAddress} size="lg" />);
    avatar = container.querySelector('[class*="h-14 w-14"]');
    expect(avatar).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ProfileIdentityCard address={testAddress} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});

describe('ProfileMicroHeader', () => {
  const testAddress = '0x1234567890abcdef1234567890abcdef12345678';
  const unknownAddress = '0x0000000000000000000000000000000000000001';

  it('should render profile name when available', () => {
    render(<ProfileMicroHeader address={testAddress} />);

    // Should show truncated name
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('should render short address when name not available', () => {
    render(<ProfileMicroHeader address={unknownAddress} />);

    // Should show short address
    expect(screen.getByText('0x0000...0001')).toBeInTheDocument();
  });

  it('should have compact styling', () => {
    const { container } = render(
      <ProfileMicroHeader address={testAddress} />
    );

    // Should have small avatar
    const avatar = container.querySelector('[class*="h-6 w-6"]');
    expect(avatar).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ProfileMicroHeader address={testAddress} className="header-class" />
    );

    expect(container.firstChild).toHaveClass('header-class');
  });
});
