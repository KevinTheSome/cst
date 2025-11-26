import AppLayout from '@/Layouts/AppLayout';
import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function LabLife() {
    const { trans, __ } = useLang();

    return (
        <>
            <Head title="Laboratorijas dzīve" />

            <div className="bg-[#f4f4f2] py-16">
                <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-10">
                    <h1 className="text-3xl font-semibold text-[#1f513c] sm:text-4xl mb-10">
                        Laboratorijas dzīve
                    </h1>

                    <div className="rounded-2xl overflow-hidden w-full aspect-video">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/0WnkYZsxrU0"
                            title="Laboratorijas dzīve video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    );
}

LabLife.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
