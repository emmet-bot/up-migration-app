'use client';

interface FormattedUsernameProps {
  name: string | null | undefined;
  address: string;
  className?: string;
}

/**
 * Display username with grayed suffix.
 * Shows @name#abcd format where #abcd is slightly grayer.
 */
export function FormattedUsername({
  name,
  address,
  className = '',
}: FormattedUsernameProps) {
  if (!address) return <span className={className}>Unknown</span>;

  // Get first 4 hex chars after 0x, lowercase
  const addressSuffix = address.slice(2, 6).toLowerCase();

  if (name && name.trim()) {
    // Remove any existing @ prefix
    const cleanName = name.trim().replace(/^@/, '');
    return (
      <span className={className}>
        @{cleanName}
        <span className="text-muted-foreground/70">#{addressSuffix}</span>
      </span>
    );
  }

  // Fallback: just show #abcd (all in subdued color)
  return (
    <span className={`text-muted-foreground ${className}`}>
      #{addressSuffix}
    </span>
  );
}
