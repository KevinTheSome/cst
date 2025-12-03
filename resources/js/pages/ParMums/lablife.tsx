import AppLayout from '@/Layouts/AppLayout';
import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

// --- ICONS ---
const Icons = {
    Camera: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
    ),
    Play: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>
    )
};

export default function LabLife() {
    const { __ } = useLang();

    return (
        <>
            <Head title="Laboratorijas dzīve" />

            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
                
                {/* BACKGROUND TECH GRID */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-400 opacity-10 blur-[120px]"></div>
                    <div className="absolute bottom-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                    
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 backdrop-blur px-3 py-1 text-xs font-semibold text-emerald-700 mb-6">
                            <Icons.Camera className="h-4 w-4" />
                            Video Tūre
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
                            Ieskats Laboratorijas <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
                                Ikdienas Darbā
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
                            Mūsu vide, tehnoloģijas un komanda darbībā. Skatieties, kā top nākotnes medicīna.
                        </p>
                    </div>

                    {/* Video Container */}
                    <div className="relative mx-auto w-full max-w-4xl">
                        
                        {/* Decorative glow behind video */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-100 rounded-full blur-xl opacity-60 animate-pulse"></div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-sky-100 rounded-full blur-xl opacity-60"></div>

                        <div className="relative rounded-3xl border border-slate-200 bg-white p-2 sm:p-4 shadow-2xl shadow-slate-200/50">
                            <div className="relative overflow-hidden rounded-2xl bg-slate-900 aspect-video shadow-inner group">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/0WnkYZsxrU0"
                                    title="Laboratorijas dzīve video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* Footer Caption */}
                        <div className="mt-8 flex justify-center">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-100 px-4 py-2 text-sm font-medium text-slate-500 shadow-sm">
                                <Icons.Play className="h-4 w-4 text-emerald-500" />
                                <span>Video materiāls no RTU Biočipu zinātniskās laboratorijas</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

LabLife.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;