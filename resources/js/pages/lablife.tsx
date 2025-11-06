import AppLayout from '@/Layouts/AppLayout';
import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function LabLife() {
    const { trans, __ } = useLang();

    return (
        <>
            <Head title="Lab dzīve">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex flex-col items-center justify-center bg-gray-100 py-20">
                <h1 className="text-4xl font-bold text-gray-800">Laboratorijas dzīve</h1>
                <p className="text-lg text-gray-600">"Laboratorijas dzīve" lapa ir progresā. Pašlaik tiek vākta un uzlabota informācija par laboratorijas dzīvi un laboratorijas izbraucieniem.</p>
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    <img
                        src="\IMG_3160-scaled.jpg"
                        alt="Ralfs Žagars"
                        className="w-96 h-auto rounded-lg shadow-lg mb-10 md:mb-0 md:mr-16"
                    />
                    <div className="text-center md:text-left max-w-2xl">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                        Ralfs Žagars
                        </h2>
                        <h3 className="text-green-800 text-lg font-medium mb-4">
                        “Biočipu zinātniskā laboratorija” mājaslapas dizainers
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed">
                        Ralfs Žagars ir Rīgas mākslas un mediju tehnikuma multimediju dizaina
                        specialitātes audzēknis, kurš izstrādāja šīs mājaslapas dizainu.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

LabLife.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
