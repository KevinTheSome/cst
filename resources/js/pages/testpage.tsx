import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';

export default function Testpage() {
    const { trans, __ } = useLang();

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800">{__('test.message')}</h1>
                <p className="text-lg text-gray-600">A React framework for single-page applications.</p>
            </div>
        </>
    );
}
