import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

type ProductionFacility = {
    id: string;
    name: string;
    country: string;
    type: string;
    capacity: string;
    established: string;
    description?: string;
};

const MOCK_FACILITIES: ProductionFacility[] = [
    {
        id: 'f1',
        name: 'Milānas Bioterhnoloģiju Centrs',
        country: 'Itālija',
        type: 'GMP ražošana',
        capacity: '500+ pacienti/gadā',
        established: '2018',
        description: 'Viena no lielākajām ATMP ražotnēm Eiropā, specializējusies somatiskās šūnu terapijās.',
    },
    {
        id: 'f2',
        name: 'Berlīnes Medicīnas Tehnoloģiju Parks',
        country: 'Vācija',
        type: 'Klīniskā ražošana',
        capacity: '300+ pacienti/gadā',
        established: '2016',
        description: 'Vadošais centrs gēnu terapiju un CAR-T šūnu izstrādē.',
    },
    {
        id: 'f3',
        name: 'Parīzes Regeneratīvās Medicīnas Institūts',
        country: 'Francija',
        type: 'Pētniecība un ražošana',
        capacity: '200+ pacienti/gadā',
        established: '2019',
        description: 'Inovatīvi risinājumi iPSC un MSC šūnu terapijām.',
    },
    {
        id: 'f4',
        name: 'Londonas Biovesels Ražotne',
        country: 'Lielbritānija',
        type: 'Komerciālā ražošana',
        capacity: '400+ pacienti/gadā',
        established: '2017',
        description: 'Specializējas autoimūno slimību ārstēšanai ar ATMP.',
    },
];

export default function ATMPProduction() {
    const { __ } = useLang();

    const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const facilities = useMemo(() => MOCK_FACILITIES, []);

    const selectedFacilityData = facilities.find((f) => f.id === selectedFacility);

    return (
        <>
            <Head title={__('ATMP Ražotnes Eiropā')} />

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-white to-[#e7f7f1]">
                {/* Soft background orbs & grid */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 left-[-40px] h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
                    <div className="absolute top-1/3 right-[-60px] h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
                    <div className="absolute bottom-[-80px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-100/40 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#0f172a0d_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
                </div>

                <section className="relative mx-auto min-h-screen max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    {/* Header */}
                    <div className="mx-auto mb-8 max-w-2xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.3em] text-emerald-500 uppercase shadow-sm shadow-emerald-100/60">
                            ATMP
                            <span className="h-1 w-1 rounded-full bg-emerald-400" />
                            Ražotnes Eiropā
                        </span>

                        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">ATMP Ražotnes Eiropā</h1>
                        <p className="mt-3 text-sm text-slate-600 sm:text-base">
                            Apskats Eiropas vadošajām Advanced Therapy Medicinal Products (ATMP) ražotnēm un to ieguldījumiem regeneratīvajā medicīnā.
                        </p>
                    </div>

                    {/* Main content */}
                    <div className="mx-auto w-full max-w-4xl space-y-6">
                        {/* Overview section */}
                        <div className="rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-xl shadow-slate-200/70 backdrop-blur-md sm:p-7 lg:p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-slate-900">Eiropas ATMP ražošanas apskats</h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Eiropa ir vadošais ATMP ražošanas centrs pasaulē, ar vairāk nekā 50 GMP sertificētām ražotnēm 15 valstīs. Šīs
                                    ražotnes nodrošina kritiskās terapijas pacientiem ar retām slimībām un onkoloģiskiem saslimšanām.
                                </p>
                            </div>

                            {/* Key statistics */}
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                                    <div className="text-2xl font-bold text-emerald-700">50+</div>
                                    <div className="text-xs text-emerald-600">GMP ražotnes</div>
                                </div>
                                <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                                    <div className="text-2xl font-bold text-blue-700">15</div>
                                    <div className="text-xs text-blue-600">Eiropas valstis</div>
                                </div>
                                <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-4">
                                    <div className="text-2xl font-bold text-purple-700">2000+</div>
                                    <div className="text-xs text-purple-600">Pacienti gadā</div>
                                </div>
                            </div>
                        </div>

                        {/* Facilities grid */}
                        <div className="rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-xl shadow-slate-200/70 backdrop-blur-md sm:p-7 lg:p-8">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-slate-900">Vadošās ražotnes</h2>
                                <p className="mt-2 text-sm text-slate-600">Izvēlieties ražotni, lai iegūtu detalizētu informāciju par tās darbību.</p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {facilities.map((facility) => (
                                    <div
                                        key={facility.id}
                                        className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                                            selectedFacility === facility.id
                                                ? 'border-emerald-500 bg-emerald-50/30'
                                                : 'border-slate-200 bg-white hover:border-emerald-300'
                                        }`}
                                        onClick={() => setSelectedFacility(facility.id)}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <h3 className="text-sm font-semibold text-slate-900">{facility.name}</h3>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                                                        {facility.country}
                                                    </span>
                                                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                                                        {facility.type}
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-xs text-slate-500">{facility.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Selected facility details */}
                            {selectedFacilityData && (
                                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-slate-900">{selectedFacilityData.name}</h3>
                                        <button
                                            onClick={() => setSelectedFacility(null)}
                                            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                                        >
                                            Aizvērt
                                        </button>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div>
                                            <span className="text-xs font-medium text-slate-500">Valsts:</span>
                                            <p className="text-sm text-slate-900">{selectedFacilityData.country}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-slate-500">Tips:</span>
                                            <p className="text-sm text-slate-900">{selectedFacilityData.type}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-slate-500">Kapacitāte:</span>
                                            <p className="text-sm text-slate-900">{selectedFacilityData.capacity}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-slate-500">Dibināta:</span>
                                            <p className="text-sm text-slate-900">{selectedFacilityData.established}</p>
                                        </div>
                                    </div>

                                    <div className="mt-3 border-t border-emerald-200 pt-3">
                                        <p className="text-sm text-slate-700">{selectedFacilityData.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Regulatory information */}
                        <div className="rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-xl shadow-slate-200/70 backdrop-blur-md sm:p-7 lg:p-8">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-slate-900">Regulatīvais ietvars</h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Eiropas ATMP ražošana tiek regulēta stingri noteikumi, lai nodrošinātu pacientu drošību un zāļu kvalitāti.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                                    <h4 className="text-sm font-semibold text-slate-900">EMA Regulācija</h4>
                                    <p className="mt-1 text-xs text-slate-600">
                                        Eiropas Medicīnas aģentūra (EMA) ir atbildīga par ATMP centralizētu apstiprināšanu visā Eiropas Savienībā.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                                    <h4 className="text-sm font-semibold text-slate-900">GMP Sertifikācija</h4>
                                    <p className="mt-1 text-xs text-slate-600">
                                        Visām ražotnēm jābūt saskaņā ar Good Manufacturing Practice (GMP) standartiem.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                                    <h4 className="text-sm font-semibold text-slate-900">Nacionālie regulatori</h4>
                                    <p className="mt-1 text-xs text-slate-600">
                                        Katra valsts ir izveidojusi savus nacionālos regulatorus ATMP uzraudzībai.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer note */}
                        <p className="mt-6 text-center text-xs text-slate-400">
                            Informācija par ATMP ražotnēm ir paredzēta izglītošanas nolūkiem un var mainīties. Kontaktējiet ar vietējiem regulatoriem
                            jaunākai informācijai.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
