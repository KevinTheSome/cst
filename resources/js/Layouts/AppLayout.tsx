import { router } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import BioChipLoader from '@/Components/BioChipLoader';
import CookieConsent from '@/Components/CookieConsent';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

export default function AppLayout({ children }: PropsWithChildren) {
    const [loaderVisible, setLoaderVisible] = useState(true);
    const initialDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        initialDelayRef.current = setTimeout(() => {
            setLoaderVisible(false);
            initialDelayRef.current = null;
        }, 1200);

        return () => {
            if (initialDelayRef.current) {
                clearTimeout(initialDelayRef.current);
            }

            if (hideDelayRef.current) {
                clearTimeout(hideDelayRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const clearHideDelay = () => {
            if (hideDelayRef.current) {
                clearTimeout(hideDelayRef.current);
                hideDelayRef.current = null;
            }
        };

        const showLoader = () => {
            clearHideDelay();
            setLoaderVisible(true);
        };

        const hideLoader = () => {
            clearHideDelay();
            hideDelayRef.current = setTimeout(() => {
                setLoaderVisible(false);
                hideDelayRef.current = null;
            }, 400);
        };

        const unsubscribeStart = router.on('start', () => {
            if (initialDelayRef.current) {
                clearTimeout(initialDelayRef.current);
                initialDelayRef.current = null;
            }

            showLoader();
        });

        const unsubscribeFinish = router.on('finish', hideLoader);
        const unsubscribeCancel = router.on('cancel', hideLoader);
        const unsubscribeError = router.on('error', hideLoader);

        return () => {
            unsubscribeStart();
            unsubscribeFinish();
            unsubscribeCancel();
            unsubscribeError();
        };
    }, []);

    return (
        <>
            <BioChipLoader visible={loaderVisible} />
            <div className="relative flex min-h-screen flex-col bg-[#fdfdfc] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#ededec]">
                <div
                    aria-busy={loaderVisible}
                    className={`flex flex-1 flex-col transition-opacity duration-500 ${
                        loaderVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
                    }`}
                >
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />

                    <CookieConsent />
                </div>
            </div>
        </>
    );
}
