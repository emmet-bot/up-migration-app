'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';

/**
 * App header with logo that disconnects wallet when navigating home.
 * This prevents stale wallet state when clicking the logo from any page.
 */
export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { disconnect, isConnected } = useWallet();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Disconnect wallet when navigating home from any sub-page
    if (pathname !== '/' && isConnected) {
      disconnect();
    }
    router.push('/');
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="./logo-square.png"
            alt="UP Authorize Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <span className="font-bold text-lg">UP Authorize</span>
        </a>
        <nav className="flex items-center gap-4">
          <a
            href="https://docs.lukso.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </a>
          <a
            href="https://universalprofile.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            UP Cloud
          </a>
        </nav>
      </div>
    </header>
  );
}
