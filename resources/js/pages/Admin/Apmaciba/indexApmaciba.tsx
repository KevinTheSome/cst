import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { Calendar, CheckCircle, Edit, ExternalLink, Eye, Plus, Search as SearchIcon, Trash2, XCircle } from 'lucide-react';
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
    starts_at?: string | null;
    ends_at?: string | null;
    is_active?: boolean;
};

type PageProps = {
    trainings: Training[];
    filters: { q?: string };
};

const IndexApmaciba: React.FC = () => {
    const page = usePage<PageProps>();
    const trainings = page.props.trainings ?? [];
    const filters = page.props.filters ?? { q: '' };

    // --- State for Delete Modal ---
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Trigger the modal
    function promptDelete(id: number) {
        setDeleteId(id);
    }

    // Execute the delete
    function confirmDelete() {
        if (deleteId === null) return;
        setIsDeleting(true);
        router.delete(`/admin/trainings/destroy/${deleteId}`, {
            onFinish: () => {
                setIsDeleting(false);
                setDeleteId(null);
            },
        });
    }

    // Format date helper (keeps UI nicer)
    const formatDate = (dateString?: string | null) => {
        if (!dateString) return 'Start not set';
        try {
            return new Date(dateString).toLocaleString('lv-LV', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return dateString;
        }
    };

            <button
              type="submit"
              className="inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-gray-800 border border-gray-700 text-sm font-medium text-gray-200 rounded-lg hover:bg-gray-700 hover:text-white transition-all shadow-sm"
            >
              Search
            </button>
          </form>

          <Link
            href="/admin/trainings/create"
            className="inline-flex justify-center items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-900/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Create
          </Link>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full">
        {trainings.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-700 bg-gray-800/50 p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 mb-4 text-gray-500">
               <SearchIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-300">No trainings found</h3>
            <p className="text-gray-500 mt-1 text-sm">Try adjusting your search query or create a new event.</p>
          </div>
        ) : (
          /* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainings.map((t: Training) => (
              <article
                key={t.id}
                className="group relative flex flex-col h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 shadow-lg hover:shadow-2xl hover:shadow-black/40 hover:border-gray-600 transition-all duration-300"
              >
                {/* Top: Badge & ID */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    {/* Initials Badge */}
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gray-700/80 border border-gray-600 flex items-center justify-center text-lg font-bold text-gray-200 shadow-inner">
                      {t.title?.lv ? t.title.lv.charAt(0).toUpperCase() : t.title?.en ? t.title.en.charAt(0).toUpperCase() : "#"}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {t.title?.lv ?? t.title?.en ?? "-"}
                      </h3>
                      <div className="font-mono text-xs text-gray-500 mt-1">ID #{t.id}</div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center md:w-auto">
                    <form method="GET" action="/admin/trainings" className="flex w-full items-center gap-2 md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <SearchIcon className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                name="q"
                                defaultValue={filters.q ?? ''}
                                placeholder="Search trainings..."
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2.5 pr-3 pl-10 text-gray-100 placeholder-gray-500 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none md:w-64"
                            />
                        </div>

                {/* Middle: Details */}
                <div className="flex-1 space-y-3 mb-6">
                   {/* Status */}
                   <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      {t.is_active ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          <CheckCircle className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                          <XCircle className="w-3.5 h-3.5" /> Inactive
                        </span>
                      )}
                   </div>

                   {/* Date */}
                   <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Start
                      </span>
                      <span className="text-gray-300 font-medium">
                        {formatDate(t.starts_at)}
                      </span>
                   </div>

                   {/* URL */}
                   {t.url && (
                    <div className="pt-2">
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {t.url.replace(/^https?:\/\//, '').substring(0, 25)}{t.url.length > 25 ? '...' : ''}
                      </a>
                    </div>
                  )}
                </div>

                {/* Footer: Actions */}
                <div className="pt-4 border-t border-gray-700/50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/trainings/show/${t.id}`}
                      className="inline-flex items-center justify-center w-9 h-9 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    <Link
                        href="/admin/trainings/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-500"
                    >
                        <Plus className="h-4 w-4" />
                        Create
                    </Link>
                </div>
            </div>

            {/* Content Container */}
            <div className="w-full">
                {trainings.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-700 bg-gray-800/50 p-12 text-center">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                            <SearchIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-300">No trainings found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search query or create a new event.</p>
                    </div>
                ) : (
                    /* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {trainings.map((t: Training) => (
                            <article
                                key={t.id}
                                className="group relative flex h-full flex-col rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-lg transition-all duration-300 hover:border-gray-600 hover:shadow-2xl hover:shadow-black/40"
                            >
                                {/* Top: Badge & ID */}
                                <div className="mb-4 flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        {/* Book Icon Badge */}
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/20 text-blue-400 shadow-inner">
                                            <BookIcon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="line-clamp-2 text-lg leading-tight font-bold text-white transition-colors group-hover:text-blue-400">
                                                {t.title?.lv ?? t.title?.en ?? '-'}
                                            </h3>
                                            <div className="mt-1 font-mono text-xs text-gray-500">ID #{t.id}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="mb-6 line-clamp-2 h-10 text-sm text-gray-400">
                                    {t.description ?? <span className="text-gray-600 italic">No description provided</span>}
                                </p>

                                {/* Middle: Details */}
                                <div className="mb-6 flex-1 space-y-3">
                                    {/* Status */}
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Status</span>
                                        {t.is_active ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
                                                <CheckCircle className="h-3.5 w-3.5" /> Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
                                                <XCircle className="h-3.5 w-3.5" /> Inactive
                                            </span>
                                        )}
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Rating</span>
                                        <StarRating rating={4} maxStars={5} />
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-2 text-gray-500">
                                            <Calendar className="h-4 w-4" /> Start
                                        </span>
                                        <span className="font-medium text-gray-300">{formatDate(t.starts_at)}</span>
                                    </div>

                                    {/* URL */}
                                    {t.url && (
                                        <div className="pt-2">
                                            <a
                                                href={t.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300 hover:underline"
                                            >
                                                <ExternalLink className="h-3.5 w-3.5" />
                                                {t.url.replace(/^https?:\/\//, '').substring(0, 25)}
                                                {t.url.length > 25 ? '...' : ''}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Footer: Actions */}
                                <div className="flex items-center justify-between gap-3 border-t border-gray-700/50 pt-4">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/trainings/show/${t.id}`}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-600 bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                                            title="View"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>

                                        <Link
                                            href={`/admin/trainings/edit/${t.id}`}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-800 bg-emerald-900/20 text-emerald-400 transition-colors hover:bg-emerald-900/40 hover:text-emerald-300"
                                            title="Edit"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </div>

                                    <button
                                        onClick={() => promptDelete(t.id)}
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {/* --- DELETE CONFIRMATION MODAL --- */}
            {deleteId !== null && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => !isDeleting && setDeleteId(null)}
                    />
                    <div className="animate-in fade-in zoom-in relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl duration-200">
                        <div className="p-6 text-center">
                            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800/50">
                                <IconWarning />
                            </div>

                            <h3 className="mb-2 text-xl font-bold text-white">Delete Training?</h3>

                            <p className="mb-6 text-sm text-slate-400">
                                Are you sure you want to delete this training? This action cannot be undone and will remove all associated data.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    disabled={isDeleting}
                                    onClick={() => setDeleteId(null)}
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
(IndexApmaciba as any).layout = (page: React.ReactNode) => <AdminLayout title="Online Trainings">{page}</AdminLayout>;

export default IndexApmaciba;
