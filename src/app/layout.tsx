import type { Metadata } from 'next';
// import { GeistSans } from 'geist/font/sans'; // Removed GeistSans import
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Happiness Hub',
  description: 'Visualizing Happiness and Social Determinants',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning={true}> {/* Removed GeistSans.variable */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
