// resources/js/Pages/Admin/Anketa/indexAnketa.tsx

import { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface FormResultType {
    id: number;
    code: string;
    title: string;
    results: {
        title: string;
        fields: any[];
    };
}

interface FormsListProps {
    formResults: FormResultType[];
}

function FormsList({ formResults }: FormsListProps) {
    const [forms, setForms] = useState<FormResultType[]>([]);

    useEffect(() => {
        setForms(formResults || []);
    }, [formResults]);

    const handleDeleteClick = (form: FormResultType) => {
        if (!confirm(`Vai tiešām dzēst anketu "${form.title || form.results?.title}"?`)) {
            return;
        }

        router.delete(`/admin/anketa/destroy/${form.id}`, {
            onSuccess: () => {
                // Optimistically update UI
                setForms((prev) => prev.filter((f) => f.id !== form.id));
                alert('Anketa dzēsta veiksmīgi.');
            },
            onError: (errors) => {
                console.error('Delete error:', errors);
                alert('Kļūda dzēšot anketu.');
            },
        });
    };

    return (
        <>
            <Head title="Anketas" />

            <div className="space-y-6 text-white">
                {/* Header */}
                <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/10 px-6 py-5 shadow-inner shadow-black/20">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Anketas</p>
                            <h1 className="mt-1 text-2xl font-semibold text-white">Visas anketas</h1>
                            <p className="mt-1 text-sm text-white/70">
                                Pārskats par visām publiskajām un privātajām formām.
                            </p>
                        </div>

                        <a
                            href="/admin/anketa/create"
                            className="inline-flex items-center justify-center rounded-2xl border border-emerald-300/40 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-50 shadow-sm shadow-emerald-500/20 hover:bg-emerald-400/25"
                        >
                            + Izveidot jaunu anketu
                        </a>
                    </div>
                </div>

                {/* List */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Formu saraksts</p>
                            <p className="text-sm text-white/70">
                                Klikšķini uz skatīt, lai atvērtu formu, vai rediģē / dzēs.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        {forms.map((form) => (
                            <div
                                key={form.id}
                                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4 shadow-sm shadow-black/20"
                            >
                                <div>
                                    <p className="text-xs text-white/40">ID: {form.id}</p>
                                    <h2 className="mt-1 text-lg font-semibold text-white">
                                        {form.title || form.results?.title || 'Untitled form'}
                                    </h2>
                                    <p className="text-xs text-white/60">Code: {form.code}</p>
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                                    <a
                                        href={`/admin/anketa/show/${form.id}`}
                                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80 hover:bg-white/10"
                                    >
                                        Skatīt
                                    </a>
                                    <a
                                        href={`/admin/anketa/edit/${form.id}`}
                                        className="rounded-full border border-sky-300/40 bg-sky-400/15 px-3 py-1 text-sky-50 hover:bg-sky-400/25"
                                    >
                                        Rediģēt
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteClick(form)}
                                        className="rounded-full border border-rose-300/40 bg-rose-500/15 px-3 py-1 text-rose-50 hover:bg-rose-500/25"
                                    >
                                        Dzēst
                                    </button>
                                </div>
                            </div>
                        ))}

                        {forms.length === 0 && (
                            <p className="col-span-full py-8 text-center text-xs text-white/60">
                                Šobrīd nav nevienas anketas.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

(FormsList as any).layout = (page: React.ReactNode) => (
    <AdminLayout title="Anketas">{page}</AdminLayout>
);

export default FormsList;
