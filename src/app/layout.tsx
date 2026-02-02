import type { Metadata } from 'next';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import { WalletProvider } from '@/components/providers/WalletProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'UP Migration | Universal Profile Controller Migration',
  description: 'Migrate your Universal Profile between apps and wallets. Securely authorize new controllers for your LUKSO Universal Profile.',
  keywords: ['LUKSO', 'Universal Profile', 'UP', 'migration', 'wallet', 'blockchain'],
  openGraph: {
    title: 'UP Migration | Universal Profile Controller Migration',
    description: 'Migrate your Universal Profile between apps and wallets',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UP Migration',
    description: 'Migrate your Universal Profile between apps and wallets',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <WalletProvider>
          <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="border-b">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <svg
                    className="w-8 h-8 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span className="font-bold text-lg">UP Migration</span>
                </Link>
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

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="border-t py-6">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>Built for the LUKSO ecosystem</p>
                <p className="mt-1 text-xs opacity-50">v13 - Fixed IPFS Image URLs</p>
              </div>
            </footer>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
