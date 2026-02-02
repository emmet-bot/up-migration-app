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
}));

// Mock the CompositeAvatar component
vi.mock('@/components/shared/CompositeAvatar', () => ({
  CompositeAvatar: ({ 
    address, 
    avatarUrl, 
    name,
    size,
    showLoadingState,
    className 
  }: {
    address: string;
    avatarUrl?: string | null;
    name?: string | null;
    size?: string;
    showLoadingState?: boolean;
    className?: string;
  }) => (
    <div 
      data-testid="composite-avatar"
      data-address={address}
      data-avatar-url={avatarUrl || ''}
      data-name={name || ''}
      data-size={size}
      data-show-loading-state={showLoadingState}
      className={className}
    />
  ),
  SimpleAvatar: ({ address, size }: { address: string; size?: string }) => (
    <div data-testid="simple-avatar" data-address={address} data-size={size} />
  ),
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

  it('should render CompositeAvatar with correct props', () => {
    render(<ProfileIdentityCard address={testAddress} size="lg" />);
    
    const avatar = screen.getByTestId('composite-avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('data-address', testAddress);
    expect(avatar).toHaveAttribute('data-avatar-url', 'https://example.com/avatar.jpg');
    expect(avatar).toHaveAttribute('data-size', 'xl'); // lg maps to xl in sizeMap
    expect(avatar).toHaveAttribute('data-show-loading-state', 'true');
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

    // Should show name (not truncated since it's short)
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('should render short address when name not available', () => {
    render(<ProfileMicroHeader address={unknownAddress} />);

    // Should show short address
    expect(screen.getByText('0x0000...0001')).toBeInTheDocument();
  });

  it('should render CompositeAvatar with small size', () => {
    render(<ProfileMicroHeader address={testAddress} />);
    
    const avatar = screen.getByTestId('composite-avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('data-size', 'sm');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ProfileMicroHeader address={testAddress} className="header-class" />
    );

    expect(container.firstChild).toHaveClass('header-class');
  });
});
