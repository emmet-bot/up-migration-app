import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProfileDisplay, AddressWithIdenticon } from './ProfileDisplay';

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

// Mock the FormattedUsername component
vi.mock('@/components/shared/FormattedUsername', () => ({
  FormattedUsername: ({
    name,
    address,
    className,
  }: {
    name: string | null | undefined;
    address: string;
    className?: string;
  }) => {
    const suffix = address.slice(2, 6).toLowerCase();
    const displayText = name ? `@${name}#${suffix}` : `#${suffix}`;
    return <span data-testid="formatted-username" className={className}>{displayText}</span>;
  },
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
    render(
      <ProfileDisplay 
        address={testAddress} 
        name="johndoe"
        avatarUrl={avatarUrl}
      />
    );
    
    const avatar = screen.getByTestId('composite-avatar');
    expect(avatar).toHaveAttribute('data-avatar-url', avatarUrl);
  });

  it('should render CompositeAvatar with address', () => {
    render(
      <ProfileDisplay 
        address={testAddress} 
        name="johndoe"
      />
    );
    
    const avatar = screen.getByTestId('composite-avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('data-address', testAddress);
  });

  it('should apply different sizes', () => {
    const { rerender } = render(
      <ProfileDisplay 
        address={testAddress} 
        name="johndoe"
        size="sm"
      />
    );
    
    // CompositeAvatar sm maps to sm
    let avatar = screen.getByTestId('composite-avatar');
    expect(avatar).toHaveAttribute('data-size', 'sm');
    
    rerender(
      <ProfileDisplay 
        address={testAddress} 
        name="johndoe"
        size="lg"
      />
    );
    
    // CompositeAvatar lg maps to lg
    avatar = screen.getByTestId('composite-avatar');
    expect(avatar).toHaveAttribute('data-size', 'lg');
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

  it('should render SimpleAvatar', () => {
    render(
      <AddressWithIdenticon address={testAddress} />
    );
    
    const avatar = screen.getByTestId('simple-avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('data-address', testAddress);
  });

  it('should apply different sizes', () => {
    const { rerender } = render(
      <AddressWithIdenticon address={testAddress} size="sm" />
    );
    
    // SimpleAvatar: sm -> xs
    let avatar = screen.getByTestId('simple-avatar');
    expect(avatar).toHaveAttribute('data-size', 'xs');
    
    rerender(
      <AddressWithIdenticon address={testAddress} size="md" />
    );
    
    // SimpleAvatar: md -> sm
    avatar = screen.getByTestId('simple-avatar');
    expect(avatar).toHaveAttribute('data-size', 'sm');
  });
});
