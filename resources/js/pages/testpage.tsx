import AppLayout from '@/Layouts/AppLayout';
import { useLang } from '@/hooks/useLang';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import type { ReactNode } from 'react';


type Props = {
    filename: string;
};


function LanguageSwitcher() {
    const { props } = usePage();
    const currentLocale = props.locale || 'lv';

    const switchLanguage = async (locale: string) => {
        if (currentLocale === locale) return;

        try {
            await axios.post('/locale', { locale });
            router.reload({ only: ['lang', 'locale'] });
        } catch (error) {
            console.error('Language switch failed:', error);
            alert('Failed to switch language. Please try again.');
        }
    };

    return (
        <div className="mb-6 flex gap-2">
            <button
                onClick={() => switchLanguage('lv')}
                className={`rounded px-4 py-2 transition disabled:opacity-50 ${currentLocale === 'lv' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'} hover:bg-green-200`}
            >
                🇱🇻 Latviešu
            </button>
            <button
                onClick={() => switchLanguage('en')}
                className={`rounded px-4 py-2 transition disabled:opacity-50 ${currentLocale === 'en' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'} hover:bg-green-200`}
            >
                🇬🇧 English
            </button>
        </div>
    );
}

export default function Testpage({filename }: Props) {
    const { trans, __ } = useLang();
    const handleDownload = async (filename: string) => {
    try {
        // Request a single-use temp link
        const response = await axios.post(`/generate-temp-link/${filename}`);
        const tempUrl = response.data.url;

        // Force browser to download
        window.location.href = tempUrl;
    } catch (error) {
        console.error('Failed to generate download link', error);
        alert('Could not generate download link');
    }
};

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex flex-col items-center justify-center bg-gray-100 py-20">
                <LanguageSwitcher />
                <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome to {__('test.message')}</h1>
                <p className="text-lg text-gray-600">{trans('test.description', { framework: 'Inertia.js' })}</p>
            </div>
            <button
                onClick={() => handleDownload(filename)}
                className="btn btn-primary"
            >
                Download this {filename}
            </button>



        </>
    );
}

Testpage.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
