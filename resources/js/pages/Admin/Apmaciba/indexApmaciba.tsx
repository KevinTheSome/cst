import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Head, Link, router } from '@inertiajs/react';
import React from 'react';

type MultilingualTitle = { lv?: string; en?: string; [key: string]: string | undefined };

type Training = {
  id: number;
  title: string | MultilingualTitle;
  description?: string | null;
  owner?: string | null;
  url?: string | null;
  starts_at?: string | null;
  ends_at?: string | null;
  is_active?: boolean;
};

export default function IndexApmaciba({ trainings = [] as Training[] }: { trainings: Training[] }) {
  const { __, locale } = useLang();

  const renderTitle = (title: string | MultilingualTitle) =>
    typeof title === 'string'
      ? title
      : title?.[locale] || title?.lv || title?.en || Object.values(title || {})[0] || __('common.untitled') || 'Untitled';

  const onDelete = (id: number) => {
    const ok = confirm(__('common.delete_confirm') || 'Are you sure you want to delete?');
    if (!ok) return;

    // ✅ your route is POST /admin/trainings/destroy/{id}
    router.post(`/admin/trainings/destroy/${id}`, {}, { preserveScroll: true });
  };

  return (
    <>
      <Head title={__('admin.nav.trainings.label')} />

      <div className="min-h-screen pb-24 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {__('admin.nav.trainings.label')}
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                {__('admin.trainings.index.subtitle') || 'View / edit / delete trainings.'}
              </p>
            </div>

            <Link
              href="/admin/trainings/create"
              className="w-full rounded-2xl bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-400 sm:w-auto"
            >
              {__('common.create') || 'Create'}
            </Link>
          </div>

          {/* Empty */}
          {trainings.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-10 text-center shadow-xl">
              <h2 className="text-lg font-semibold text-white">
                {__('admin.trainings.index.empty') || 'No trainings found.'}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {__('admin.trainings.index.empty_hint') || 'Click “Create” to add your first training.'}
              </p>
            </div>
          ) : (
            <>
              {/* ✅ MOBILE: cards */}
              <div className="grid gap-4 sm:hidden">
                {trainings.map((t) => (
                  <div key={t.id} className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl">
                    <div className="min-w-0">
                      <div className="truncate text-base font-semibold text-white">
                        {renderTitle(t.title)}
                      </div>

                      {t.description ? (
                        <div className="mt-1 line-clamp-2 text-xs text-slate-400">
                          {t.description}
                        </div>
                      ) : null}

                      <div className="mt-3 space-y-1 text-xs text-slate-300">
                        <div>
                          <span className="text-slate-500">{__('training.create.owner') || 'Owner'}:</span>{' '}
                          {t.owner || '—'}
                        </div>

                        <div>
                          <span className="text-slate-500">{__('common.status') || 'Status'}:</span>{' '}
                          <span
                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                              t.is_active
                                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                : 'border-slate-700 bg-slate-800 text-slate-400'
                            }`}
                          >
                            {t.is_active ? __('common.active') || 'Active' : __('common.inactive') || 'Inactive'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Link
                          href={`/admin/trainings/show/${t.id}`}
                          className="flex-1 rounded-2xl bg-white/5 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-white/10"
                        >
                          {__('common.view') || 'View'}
                        </Link>

                        <Link
                          href={`/admin/trainings/edit/${t.id}`}
                          className="flex-1 rounded-2xl bg-amber-500/20 px-3 py-2 text-center text-xs font-semibold text-amber-200 hover:bg-amber-500/30"
                        >
                          {__('common.edit') || 'Edit'}
                        </Link>

                        <button
                          type="button"
                          onClick={() => onDelete(t.id)}
                          className="flex-1 rounded-2xl bg-rose-500/20 px-3 py-2 text-center text-xs font-semibold text-rose-200 hover:bg-rose-500/30"
                        >
                          {__('common.delete') || 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ✅ DESKTOP: table */}
              <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl sm:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5 text-left text-xs uppercase text-slate-400">
                      <tr>
                        <th className="px-5 py-4">{__('common.title') || 'Title'}</th>
                        <th className="px-5 py-4">{__('training.create.owner') || 'Owner'}</th>
                        <th className="px-5 py-4">{__('common.status') || 'Status'}</th>
                        <th className="px-5 py-4 text-right">{__('common.actions') || 'Actions'}</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-white/10">
                      {trainings.map((t) => (
                        <tr key={t.id} className="text-sm text-slate-200">
                          <td className="px-5 py-4 font-semibold text-white">
                            {renderTitle(t.title)}
                            {t.description ? (
                              <div className="mt-1 line-clamp-1 text-xs font-normal text-slate-400">
                                {t.description}
                              </div>
                            ) : null}
                          </td>

                          <td className="px-5 py-4 text-slate-300">{t.owner || '—'}</td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
                                t.is_active
                                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                  : 'border-slate-700 bg-slate-800 text-slate-400'
                              }`}
                            >
                              {t.is_active ? __('common.active') || 'Active' : __('common.inactive') || 'Inactive'}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/admin/trainings/show/${t.id}`}
                                className="rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
                              >
                                {__('common.view') || 'View'}
                              </Link>

                              <Link
                                href={`/admin/trainings/edit/${t.id}`}
                                className="rounded-xl bg-amber-500/20 px-3 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-500/30"
                              >
                                {__('common.edit') || 'Edit'}
                              </Link>

                              <button
                                type="button"
                                onClick={() => onDelete(t.id)}
                                className="rounded-xl bg-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-500/30"
                              >
                                {__('common.delete') || 'Delete'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}

(IndexApmaciba as any).layout = (page: React.ReactNode) => {
  return <AdminLayout title="Apmācības">{page}</AdminLayout>;
};
