import { Head, router } from '@inertiajs/react';
import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

type Visibility = 'public' | 'private';

type Question = {
    id: number | string;
    title: string;
    type: string;
    updatedAt: string;
    responses: number;
    status: 'active' | 'draft';
};

interface QuestionsPageProps {
    visibility?: Visibility; // you can pass this from backend later
    questions?: Question[]; // replace mockData with this when ready
}

const mockPublicQuestions: Question[] = [
    {
        id: 1,
        title: 'Kā jūs uzzinājāt par mūsu laboratoriju?',
        type: 'Vienkārša izvēle',
        updatedAt: '2025-01-14',
        responses: 128,
        status: 'active',
    },
    {
        id: 2,
        title: 'Kā jūs vērtējat pieredzi ar mūsu pakalpojumiem?',
        type: 'Skala (1–10)',
        updatedAt: '2025-01-10',
        responses: 93,
        status: 'active',
    },
];

const mockPrivateQuestions: Question[] = [
    {
        id: 3,
        title: 'Iekšējās komandas apmierinātības novērtējums',
        type: 'Skala (1–5)',
        updatedAt: '2025-01-12',
        responses: 31,
        status: 'draft',
    },
    {
        id: 4,
        title: 'Komentāri par pašreizējiem projektiem',
        type: 'Atvērtā atbilde',
        updatedAt: '2025-01-08',
        responses: 18,
        status: 'active',
    },
];

function statusBadge(status: Question['status']) {
    if (status === 'active') {
        return (
            <span className="inline-flex items-center rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-100">
                Aktīvs
            </span>
        );
    }

    return (
        <span className="inline-flex items-center rounded-full border border-amber-300/40 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-100">
            Melnraksts
        </span>
    );
}

export default function QuestionsPage({ visibility = 'public', questions }: QuestionsPageProps) {
    const isPublic = visibility === 'public';

    const data = questions ?? (isPublic ? mockPublicQuestions : mockPrivateQuestions);

    return (
        <>
            <Head title="Anketu jautājumi" />
            <div className="space-y-6 text-white">
                {/* Header card */}
                <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/10 px-6 py-5 shadow-inner shadow-black/20">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs tracking-[0.3em] text-white/60 uppercase">Anketas</p>
                            <h1 className="mt-1 text-2xl font-semibold text-white">Jautājumu banka</h1>
                            <p className="mt-1 text-sm text-white/70">Pārvaldi publiskās un privātās anketu jautājumus vienuviet.</p>
                        </div>

                        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                            {/* Toggle public / private view */}
                            <div className="inline-flex rounded-2xl border border-white/15 bg-slate-900/60 p-1 text-xs">
                                <button
                                    type="button"
                                    onClick={() => router.visit('/admin/anketas/public')}
                                    className={`flex-1 rounded-xl px-3 py-1.5 font-semibold ${
                                        isPublic ? 'bg-white text-slate-900' : 'text-white/70 hover:bg-white/10'
                                    }`}
                                >
                                    Publiskās
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.visit('/admin/anketas/private')}
                                    className={`flex-1 rounded-xl px-3 py-1.5 font-semibold ${
                                        !isPublic ? 'bg-white text-slate-900' : 'text-white/70 hover:bg-white/10'
                                    }`}
                                >
                                    Privātās
                                </button>
                            </div>

                            {/* New question button */}
                            <button
                                type="button"
                                onClick={() =>
                                    router.visit(
                                        isPublic
                                            ? '/admin/anketas/questions/create?visibility=public'
                                            : '/admin/anketas/questions/create?visibility=private',
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-2xl border border-emerald-300/40 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-50 shadow-sm shadow-emerald-500/20 hover:bg-emerald-400/25"
                            >
                                + Jauns jautājums
                            </button>
                        </div>
                    </div>
                </div>

                {/* List card */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs tracking-[0.3em] text-white/60 uppercase">{isPublic ? 'Publiskās anketas' : 'Privātās anketas'}</p>
                            <p className="text-sm text-white/70">
                                {isPublic
                                    ? 'Rediģē jautājumus, ko redz visi respondenti.'
                                    : 'Iekšējie jautājumi, kas pieejami tikai privātām anketām.'}
                            </p>
                        </div>
                        {/* (Optional) search/filter UI placeholder */}
                        <div className="flex items-center gap-2 text-xs text-white/60">
                            <input
                                disabled
                                placeholder="Meklēt jautājumus (placeholder)"
                                className="w-48 rounded-2xl border border-white/15 bg-slate-950/40 px-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
                        <table className="min-w-full text-sm">
                            <thead className="bg-white/5 text-xs tracking-wide text-white/50 uppercase">
                                <tr>
                                    <th className="px-4 py-3 text-left">Jautājums</th>
                                    <th className="px-4 py-3 text-left">Tips</th>
                                    <th className="px-4 py-3 text-left">Atbildes</th>
                                    <th className="px-4 py-3 text-left">Statuss</th>
                                    <th className="px-4 py-3 text-left">Atjaunināts</th>
                                    <th className="px-4 py-3 text-right">Darbības</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((question, index) => (
                                    <tr
                                        key={question.id}
                                        className={`border-t border-white/5 ${
                                            index % 2 === 0 ? 'bg-slate-950/40' : 'bg-slate-950/20'
                                        } hover:bg-white/5`}
                                    >
                                        <td className="px-4 py-3 align-top">
                                            <p className="text-sm font-semibold text-white">{question.title}</p>
                                        </td>
                                        <td className="px-4 py-3 align-top text-xs text-white/70">{question.type}</td>
                                        <td className="px-4 py-3 align-top text-xs text-white/70">{question.responses}</td>
                                        <td className="px-4 py-3 align-top">{statusBadge(question.status)}</td>
                                        <td className="px-4 py-3 align-top text-xs text-white/60">{question.updatedAt}</td>
                                        <td className="px-4 py-3 align-top">
                                            <div className="flex justify-end gap-2 text-xs">
                                                <button
                                                    type="button"
                                                    // TODO: hook to show/preview route
                                                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80 hover:bg-white/10"
                                                >
                                                    Skatīt
                                                </button>
                                                <button
                                                    type="button"
                                                    // TODO: hook to edit route
                                                    className="rounded-full border border-sky-300/40 bg-sky-400/15 px-3 py-1 text-sky-50 hover:bg-sky-400/25"
                                                >
                                                    Rediģēt
                                                </button>
                                                <button
                                                    type="button"
                                                    // TODO: hook to delete route
                                                    className="rounded-full border border-rose-300/40 bg-rose-500/15 px-3 py-1 text-rose-50 hover:bg-rose-500/25"
                                                >
                                                    Dzēst
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-xs text-white/60">
                                            Šobrīd nav neviena jautājuma šajā sadaļā.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

QuestionsPage.layout = (page: React.ReactNode) => <AdminLayout title="Anketas">{page}</AdminLayout>;
