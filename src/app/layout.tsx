import './globals.css';
import { LazorProvider } from '@/providers/LazorProvider';

export const metadata = {
  title: 'Lazorkit Nexus Starter',
  description: '10x Solana UX with Passkeys',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Everything inside this provider can now use Passkeys! */}
        <LazorProvider>
          {children}
        </LazorProvider>
      </body>
    </html>
  );
}