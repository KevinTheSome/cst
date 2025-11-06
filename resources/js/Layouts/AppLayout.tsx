import type { PropsWithChildren } from 'react';

import Footer from '@/Components/Footer';
import CookieConsent from '@/Components/CookieConsent';

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col bg-[#fdfdfc] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#ededec]">
            <main className="flex-1">
                {children}
            </main>

            {/* Cookie banner on every page */}
            <CookieConsent />

            <Footer />
        </div>
    );
}
