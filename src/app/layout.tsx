import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { WalletProvider } from '@/components/providers/WalletProvider';
import { AppHeader } from '@/components/shared/AppHeader';
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
  title: 'Universal Profile Authorize',
  description: 'Authorize new controllers for your Universal Profile. Securely authorize new controllers for your LUKSO Universal Profile.',
  keywords: ['LUKSO', 'Universal Profile', 'UP', 'import', 'wallet', 'blockchain', 'migration'],
  openGraph: {
    title: 'Universal Profile Authorize',
    description: 'Authorize new controllers for your Universal Profile',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universal Profile Authorize',
    description: 'Authorize new controllers for your Universal Profile',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-touch-icon.png',
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
            <AppHeader />

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="border-t py-6">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>Universal Profile Authorize — Built for the LUKSO ecosystem</p>
                <p className="mt-1 text-xs opacity-50">v{process.env.NEXT_PUBLIC_APP_VERSION}</p>
              </div>
            </footer>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
