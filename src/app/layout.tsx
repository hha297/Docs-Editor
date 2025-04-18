import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { League_Spartan } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const leagueSpartan = League_Spartan({
        subsets: ['latin'],
        variable: '--font-league-spartan',
});
export const metadata: Metadata = {
        title: 'Docs Editor',
        description: 'Docs Editor',
};

export default function RootLayout({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {
        return (
                <html lang="en">
                        <body className={cn(leagueSpartan.className, 'antialiased min-h-screen')}>
                                <Toaster />
                                <NuqsAdapter>{children}</NuqsAdapter>
                        </body>
                </html>
        );
}
