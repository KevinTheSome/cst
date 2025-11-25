import { Head, Link } from '@inertiajs/react';

const buttons = [
    {
        label: 'Speciālistiem',
        subtitle: 'Dalieties pieredzē un saņemiet piekļuvi protokoliem',
        href: '/questions?audience=specialist',
    },
    {
        label: 'Klientiem',
        subtitle: 'Sāciet ceļu uz personalizētu terapiju',
        href: '/questions?audience=client',
    },
];

export default function PostDockanketa() {
    return (
        <>
            <Head title="PostDock anketa" />

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eef5ff] via-white to-[#e8fbf3] text-slate-900">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-24 left-4 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
                    <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-sky-200/50 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#0f172a0a_1px,transparent_1px)] [background-size:18px_18px]" />
                </div>

                <section className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-10 px-4 py-16 text-center sm:px-8">
                    <div className="space-y-5">
                        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.35em] text-emerald-600 shadow-sm">
                            PostDock anketa
                        </p>
                        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                            Izvēlieties pieredzei atbilstošu PostDock anketu
                        </h1>
                        <p className="max-w-3xl text-base text-slate-600 sm:text-lg">
                            Mēs strādājam gan ar speciālistiem, gan pacientiem. Klikšķiniet uz atbilstošās anketas, lai turpinātu sarunu un
                            saņemtu personalizētu informāciju par cilmes šūnu risinājumiem.
                        </p>
                    </div>

                    <div className="grid w-full gap-6 sm:grid-cols-2">
                        {buttons.map((btn) => (
                            <div
                                key={btn.label}
                                className="rounded-[28px] border border-white/70 bg-white/80 p-6 text-left shadow-lg shadow-slate-200/60 backdrop-blur transition hover:-translate-y-1 hover:shadow-slate-300"
                            >
                                <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">{btn.label}</p>
                                <p className="mt-2 text-base font-semibold text-slate-900">{btn.subtitle}</p>
                                <Link
                                    href={btn.href}
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-700 hover:to-sky-600"
                                >
                                    Atvērt {btn.label.toLowerCase()}
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
