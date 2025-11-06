import type { ReactNode } from 'react';

import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

const Contacts = () => {
    return (
        <>
            <Head title="Kontakti" />
            <section className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12 text-[#1b4a37]">
                <header>
                    <h1 className="text-4xl font-semibold tracking-tight">Sazinies ar mums</h1>
                    <p className="mt-2 text-lg text-[#2c7c5a]">
                        Esam pieejami, lai atbildētu uz visiem jautājumiem par Biočipu zinātnisko laboratoriju.
                    </p>
                </header>
                <dl className="grid gap-8 rounded-3xl border border-[#dfe9e3] bg-[#f7faf8] p-8 shadow-sm lg:grid-cols-2">
                    <div className="space-y-2">
                        <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1b4a37]">
                            Telefona numuri
                        </dt>
                        <dd className="space-y-1 text-lg leading-relaxed">
                            <a className="block text-[#2c7c5a] hover:text-[#1b4a37]" href="tel:+37167089383">
                                +371 67089383
                            </a>
                            <a className="block text-[#2c7c5a] hover:text-[#1b4a37]" href="tel:+37129252975">
                                +371 29252975
                            </a>
                        </dd>
                    </div>
                    <div className="space-y-2">
                        <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1b4a37]">E-pasts</dt>
                        <dd className="text-lg leading-relaxed">
                            <a className="text-[#2c7c5a] hover:text-[#1b4a37]" href="mailto:uldis.berzins_4@rtu.lv">
                                uldis.berzins_4@rtu.lv
                            </a>
                        </dd>
                    </div>
                    <div className="space-y-2 lg:col-span-2">
                        <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1b4a37]">Adrese</dt>
                        <dd className="text-lg leading-relaxed text-[#205741]">
                            Ķīpsalas iela 6B–316, Rīga, LV-1064, Latvija
                        </dd>
                    </div>
                </dl>
            </section>
        </>
    );
};

Contacts.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;

export default Contacts;
