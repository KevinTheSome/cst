import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Edit, ExternalLink, Globe, Trash2, XCircle } from 'lucide-react';
import React, { useState } from 'react';

// --- Icons for Modal ---
const IconWarning = () => (
    <svg className="h-12 w-12 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
    </svg>
);

type Training = {
    id: number;
    title: { lv?: string | null; en?: string | null };
    description?: string | null;
    url?: string | null;
    is_active?: boolean;
};

type PageProps = {
    training: Training;
};

const ShowApmaciba: React.FC = () => {
    const page = usePage<PageProps>();
    const t = page.props.training;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    function handleDeleteClick() {
        setShowDeleteModal(true);
    }

    function confirmDelete() {
        setIsDeleting(true);
        router.delete(`/admin/trainings/destroy/${t.id}`, {
            onFinish: () => setIsDeleting(false),
        });
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            {/* Header / Nav */}
            <div className="mb-8 flex items-center justify-between">
                <Link
                    href="/admin/trainings"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Trainings
                </Link>
            </div>

            {/* Main Content Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
                {/* Background decorative elements */}
                <div className="pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>

                <div className="relative z-10">
                    {/* Title Section */}
                    <div className="mb-8 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-start md:justify-between">
                        <div>
                            <div className="mb-3 flex items-center gap-3">
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-400">
                                    ID: #{t.id}
                                </span>
                                {t.is_active ? (
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                                        <CheckCircle className="h-3.5 w-3.5" /> Active
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-400">
                                        <XCircle className="h-3.5 w-3.5" /> Inactive
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">{t.title?.lv ?? t.title?.en ?? 'Untitled Training'}</h1>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Link
                                href={`/admin/trainings/edit/${t.id}`}
                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:bg-emerald-400"
                            >
                                <Edit className="h-4 w-4" /> Edit
                            </Link>
                            <button
                                onClick={handleDeleteClick}
                                className="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-sm font-bold text-rose-400 transition-all hover:bg-rose-500/20 hover:text-rose-300"
                            >
                                <Trash2 className="h-4 w-4" /> Delete
                            </button>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Description */}
                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-sm font-medium tracking-wider text-slate-500 uppercase">Description</h3>
                            <div className="prose-invert prose max-w-none rounded-2xl border border-white/5 bg-black/20 p-6 text-slate-300">
                                {t.description ? (
                                    <p className="leading-relaxed whitespace-pre-wrap">{t.description}</p>
                                ) : (
                                    <p className="text-slate-500 italic">No description provided for this training.</p>
                                )}
                            </div>
                        </div>

                        {/* Side Info */}
                        <div className="space-y-6">
                            {t.url && (
                                <div>
                                    <h3 className="mb-3 text-sm font-medium tracking-wider text-slate-500 uppercase">Resources</h3>
                                    <a
                                        href={t.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group block rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-blue-600/10 p-4 transition-all hover:border-blue-500/40"
                                    >
                                        <div className="flex items-center gap-3 text-blue-400 group-hover:text-blue-300">
                                            <Globe className="h-5 w-5" />
                                            <span className="text-sm font-bold">Open Meeting / URL</span>
                                            <ExternalLink className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100" />
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Delete Confirmation Modal --- */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => !isDeleting && setShowDeleteModal(false)}
                    />
                    <div className="animate-in fade-in zoom-in relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl duration-200">
                        <div className="p-6 text-center">
                            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800/50">
                                <IconWarning />
                            </div>

                            <h3 className="mb-2 text-xl font-bold text-white">Delete Training?</h3>

                            <p className="mb-6 text-sm text-slate-400">
                                Are you sure you want to permanently delete <strong>{t.title?.lv ?? t.title?.en}</strong>? This action cannot be
                                undone.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    disabled={isDeleting}
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 rounded-xl border border-white/10 bg-transparent py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={isDeleting}
                                    onClick={confirmDelete}
                                    className="flex-1 rounded-xl bg-rose-500 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02] hover:bg-rose-600"
                                >
                                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Wrap in AdminLayout
(ShowApmaciba as any).layout = (page: React.ReactNode) => <AdminLayout title="Training Details">{page}</AdminLayout>;

export default ShowApmaciba;
