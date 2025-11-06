import React from 'react';
import { Head } from '@inertiajs/react';

const Contacts: React.FC = () => {
    return (
        <>
            <Head title="Kontakti" />

            {/* Full-page light background */}
            <div className="min-h-screen w-full bg-[#f7faf8] text-[#1b4a37]">
                <section className="mx-auto w-full max-w-5xl px-6 py-16">
                    <header className="mb-10 text-center">
                        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                            Kontakti
                        </h1>
                        <p className="mt-3 text-sm md:text-base text-[#9fb5aa]">
                            Sazinies ar mums par Biočipu zinātnisko laboratoriju.
                        </p>
                    </header>

                    {/* White card in the middle */}
                    <div className="mx-auto max-w-3xl rounded-[32px] bg-white px-8 py-10 shadow-md ring-1 ring-[#dfe9e3] md:px-12 md:py-12">
                        <dl className="space-y-8">
                            {/* Phone */}
                            <div className="flex items-start gap-5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7faf8] ring-1 ring-[#dfe9e3]">
                                    <img
                                        src="/telefona-ikona-03.svg"
                                        alt="Telefona ikona"
                                        className="h-6 w-6"
                                    />
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1b4a37]">
                                        Telefona numuri
                                    </dt>
                                    <dd className="mt-3 space-y-1 text-lg leading-relaxed">
                                        <a
                                            className="block text-[#2c7c5a] transition-colors hover:text-[#1b4a37]"
                                            href="tel:+37167089383"
                                        >
                                            +371 67089383
                                        </a>
                                        <a
                                            className="block text-[#2c7c5a] transition-colors hover:text-[#1b4a37]"
                                            href="tel:+37129252975"
                                        >
                                            +371 29252975
                                        </a>
                                    </dd>
                                </div>
                            </div>

                            <div className="h-px bg-[#e3efe8]" />

                            {/* Email */}
                            <div className="flex items-start gap-5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7faf8] ring-1 ring-[#dfe9e3]">
                                    <img
                                        src="/epasts-ikona-cerams-ka-ista-2-01.svg"
                                        alt="E-pasta ikona"
                                        className="h-6 w-6"
                                    />
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1b4a37]">
                                        E-pasts
                                    </dt>
                                    <dd className="mt-3 text-lg leading-relaxed">
                                        <a
                                            className="text-[#2c7c5a] transition-colors hover:text-[#1b4a37]"
                                            href="mailto:uldis.berzins_4@rtu.lv"
                                        >
                                            uldis.berzins_4@rtu.lv
                                        </a>
                                    </dd>
                                </div>
                            </div>

                            <div className="h-px bg-[#e3efe8]" />

                            {/* Address */}
                            <div className="flex items-start gap-5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7faf8] ring-1 ring-[#dfe9e3]">
                                    <img
                                        src="/adreses-ikona.svg"
                                        alt="Adreses ikona"
                                        className="h-6 w-6"
                                    />
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1b4a37]">
                                        Adrese
                                    </dt>
                                    <dd className="mt-3 text-lg leading-relaxed text-[#205741]">
                                        Ķīpsalas iela 6B–316, Rīga, LV-1064, Latvija
                                    </dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Contacts;
