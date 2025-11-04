import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    const { trans, __ } = useLang();
    return (
        <>
            <Head title={__('head.title')}></Head>
            <div className="flex min-h-screen flex-col items-center justify-center py-2">
                <h1 className="text-4xl font-bold">{__('head.title')}</h1>
            </div>
        </>
    );
}
