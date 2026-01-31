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

export default function ATMPProduction() {
  const { __ } = useLang();

  // Facilities array with translated fields
  const facilities: ProductionFacility[] = useMemo(() => [
    {
      id: 'f1',
      name: __('specialistiem.atmp.facilities.f1.name'),
      country: __('specialistiem.atmp.facilities.f1.country'),
      type: __('specialistiem.atmp.facilities.f1.type'),
      capacity: '500+ pacienti/gadā',
      established: '2018',
      description: __('specialistiem.atmp.facilities.f1.description'),
    },
    {
      id: 'f2',
      name: __('specialistiem.atmp.facilities.f2.name'),
      country: __('specialistiem.atmp.facilities.f2.country'),
      type: __('specialistiem.atmp.facilities.f2.type'),
      capacity: '300+ pacienti/gadā',
      established: '2016',
      description: __('specialistiem.atmp.facilities.f2.description'),
    },
    {
      id: 'f3',
      name: __('specialistiem.atmp.facilities.f3.name'),
      country: __('specialistiem.atmp.facilities.f3.country'),
      type: __('specialistiem.atmp.facilities.f3.type'),
      capacity: '200+ pacienti/gadā',
      established: '2019',
      description: __('specialistiem.atmp.facilities.f3.description'),
    },
    {
      id: 'f4',
      name: __('specialistiem.atmp.facilities.f4.name'),
      country: __('specialistiem.atmp.facilities.f4.country'),
      type: __('specialistiem.atmp.facilities.f4.type'),
      capacity: '400+ pacienti/gadā',
      established: '2017',
      description: __('specialistiem.atmp.facilities.f4.description'),
    },
  ], [__]);

  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const selectedFacilityData = facilities.find(f => f.id === selectedFacility);

    return (
        <>
            <Head title={__('specialistiem.atmp.meta.title')} />

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-white to-[#e7f7f1]">
                {/* Soft background orbs & grid */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 left-[-40px] h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
                    <div className="absolute top-1/3 right-[-60px] h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
                    <div className="absolute bottom-[-80px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-100/40 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#0f172a0d_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
                </div>

                <section className="relative mx-auto min-h-screen max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    {/* Header */}
                    <div className="mx-auto mb-8 max-w-2xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/80 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.3em] text-cyan-500 uppercase shadow-sm shadow-cyan-100/60">
                            {__('specialistiem.atmp.hero.title1')}
                            <span className="h-1 w-1 rounded-full bg-cyan-400" />
                            {__('specialistiem.atmp.hero.title2')}
                        </span>

                        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{__('specialistiem.atmp.hero.title')}</h1>
                        <p className="mt-3 text-sm text-slate-600 sm:text-base">
                            {__('specialistiem.atmp.hero.text')}
                        </p>
                    </div>

                    {/* Main content */}
                    <div className="mx-auto w-full max-w-4xl space-y-6">
                        {/* Overview section */}
                        <div className="rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-xl shadow-slate-200/70 backdrop-blur-md sm:p-7 lg:p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-slate-900">{__('specialistiem.atmp.overview.title')}</h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    {__('specialistiem.atmp.overview.text')}
                                </p>
                            </div>

                            {/* Key statistics */}
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-cyan-100 bg-cyan-50/50 p-4">
                                    <div className="text-2xl font-bold text-cyan-700">50+</div>
                                    <div className="text-xs text-cyan-600">{__('specialistiem.atmp.stats.facilities')}</div>
                                </div>
                                <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                                    <div className="text-2xl font-bold text-blue-700">15</div>
                                    <div className="text-xs text-blue-600">{__('specialistiem.atmp.stats.countries')}</div>
                                </div>
                                <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-4">
                                    <div className="text-2xl font-bold text-purple-700">2000+</div>
                                    <div className="text-xs text-purple-600">{__('specialistiem.atmp.stats.patients')}</div>
                                </div>
                            </div>
                        </div>

                        {/* Facilities grid */}
                        <div className="rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-xl shadow-slate-200/70 backdrop-blur-md sm:p-7 lg:p-8">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-slate-900">{__('specialistiem.atmp.facilities.title')}</h2>
                                <p className="mt-2 text-sm text-slate-600">{__('specialistiem.atmp.facilities.text')}</p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {facilities.map((facility) => (
                                    <div
                                        key={facility.id}
                                        className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                                            selectedFacility === facility.id
                                                ? 'border-cyan-500 bg-cyan-50/30'
                                                : 'border-slate-200 bg-white hover:border-cyan-300'
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
                                                    <span className="inline-flex items-center rounded-full bg-cyan-100 px-2 py-1 text-xs font-medium text-cyan-700">
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
                                <div className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50/30 p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-slate-900">{selectedFacilityData.name}</h3>
                                        <button
                                            onClick={() => setSelectedFacility(null)}
                                            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                                        >
                                            {__('specialistiem.atmp.details.close')}
                                        </button>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div>
                                            <span className="text-xs font-medium text-slate-500">{__('specialistiem.atmp.details.country')}:</span>
                                            <p className="text-sm text-slate-900">{selectedFacilityData.country}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-slate-500">{__('specialistiem.atmp.details.type')}:</span>
                                            <p className="text-sm text-slate-900">{selectedFacilityData.type}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-slate-500">{__('specialistiem.atmp.details.capacity')}:</span>
                                            <p className="text-sm text-slate-900">{selectedFacilityData.capacity}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-slate-500">{__('specialistiem.atmp.details.established')}:</span>
                                            <p className="text-sm text-slate-900">{selectedFacilityData.established}</p>
                                        </div>
                                    </div>

                                    <div className="mt-3 border-t border-cyan-200 pt-3">
                                        <p className="text-sm text-slate-700">{selectedFacilityData.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Regulatory information */}
                        <div className="rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-xl shadow-slate-200/70 backdrop-blur-md sm:p-7 lg:p-8">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-slate-900">{__('specialistiem.atmp.regulatory.title')}</h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    {__('specialistiem.atmp.regulatory.text')}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                                    <h4 className="text-sm font-semibold text-slate-900">{__('specialistiem.atmp.regulatory.ema.title')}</h4>
                                    <p className="mt-1 text-xs text-slate-600">
                                        {__('specialistiem.atmp.regulatory.ema.text')}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                                    <h4 className="text-sm font-semibold text-slate-900">{__('specialistiem.atmp.regulatory.gmp.title')}</h4>
                                    <p className="mt-1 text-xs text-slate-600">
                                        {__('specialistiem.atmp.regulatory.gmp.text')}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                                    <h4 className="text-sm font-semibold text-slate-900">{__('specialistiem.atmp.regulatory.national.title')}</h4>
                                    <p className="mt-1 text-xs text-slate-600">
                                        {__('specialistiem.atmp.regulatory.national.text')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer note */}
                        <p className="mt-6 text-center text-xs text-slate-400">
                            {__('specialistiem.atmp.footer')}
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
