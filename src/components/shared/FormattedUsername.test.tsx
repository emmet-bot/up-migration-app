import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormattedUsername } from './FormattedUsername';

describe('FormattedUsername', () => {
  const testAddress = '0xa1b2c3d4e5f6789012345678901234567890abcd';

  it('should render @name#abcd format when name is provided', () => {
    render(<FormattedUsername name="johndoe" address={testAddress} />);
    
    // Full text should be @johndoe#a1b2
    expect(screen.getByText(/@johndoe/)).toBeInTheDocument();
  });

  it('should render suffix in muted color', () => {
    const { container } = render(
      <FormattedUsername name="johndoe" address={testAddress} />
    );
    
    // Find the suffix span with muted class
    const suffixSpan = container.querySelector('.text-muted-foreground\\/70');
    expect(suffixSpan).toBeInTheDocument();
    expect(suffixSpan?.textContent).toBe('#a1b2');
  });

  it('should render only suffix when name is null', () => {
    render(<FormattedUsername name={null} address={testAddress} />);
    
    expect(screen.getByText('#a1b2')).toBeInTheDocument();
  });

  it('should render only suffix when name is empty string', () => {
    render(<FormattedUsername name="" address={testAddress} />);
    
    expect(screen.getByText('#a1b2')).toBeInTheDocument();
  });

  it('should render Unknown when address is empty', () => {
    render(<FormattedUsername name="johndoe" address="" />);
    
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('should strip existing @ prefix from name', () => {
    render(<FormattedUsername name="@johndoe" address={testAddress} />);
    
    // Should not have double @
    expect(screen.getByText(/@johndoe/)).toBeInTheDocument();
    expect(screen.queryByText('@@johndoe')).not.toBeInTheDocument();
  });

  it('should handle whitespace in name', () => {
    render(<FormattedUsername name="  johndoe  " address={testAddress} />);
    
    expect(screen.getByText(/@johndoe/)).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <FormattedUsername 
        name="johndoe" 
        address={testAddress} 
        className="custom-class"
      />
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('should lowercase the address suffix', () => {
    const upperAddress = '0xA1B2c3d4e5f6789012345678901234567890ABCD';
    render(<FormattedUsername name="johndoe" address={upperAddress} />);
    
    // Suffix should be lowercase
    const { container } = render(
      <FormattedUsername name="johndoe" address={upperAddress} />
    );
    const suffixSpan = container.querySelector('.text-muted-foreground\\/70');
    expect(suffixSpan?.textContent).toBe('#a1b2');
  });
});
