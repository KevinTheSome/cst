import AppLayout from '@/Layouts/AppLayout';
import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function LabLife() {
    const { trans, __ } = useLang();

    return (
        <>
            <Head title="Laboratorijas dzīve"/>

            <div className="bg-[#f4f4f2] py-16">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 text-center sm:px-10">
                    <div className="flex flex-col gap-6 text-[#2f3c37]">
                        <h1 className="text-3xl font-semibold text-[#1f513c] sm:text-4xl">Laboratorijas dzīve</h1>
                        <p className="text-lg leading-relaxed text-[#3d4b43]">
                            "Laboratorijas dzīve" lapa ir progresā. Pašlaik tiek vākta un uzlabota informācija par laboratorijas
                            dzīvi un laboratorijas izbraucieniem.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-12 text-left text-[#3d4b43]">
                        <div className="w-full overflow-hidden rounded-2xl">
                            <img
                                alt="Komanda laboratorijā"
                                className="h-full w-full object-cover"
                                src="/bzl-7.jpg"
                            />
                        </div>
                        <br/>
                        <div className="w-full overflow-hidden rounded-2xl">
                            <img
                                alt="Erasmus Plus Studenti"
                                className="h-full w-full object-cover"
                                src="/cst-rumanijas-studenti.jpeg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

LabLife.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
