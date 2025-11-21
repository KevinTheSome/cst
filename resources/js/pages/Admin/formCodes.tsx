import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { useLang } from '@/hooks/useLang';

type FormCode = {
  id: number;
  code: string;
  uses: number;
  user_created: number | string;
  admin?: { id: number; email: string } | null;
  expiration_date: string;
  created_at: string;
};

type Props = { codes: FormCode[] };

export default function FormCodes({ codes: initialCodes }: Props) {
  const { trans, __ } = useLang();

  const [codes, setCodes] = useState<FormCode[]>(initialCodes);
  const [uses, setUses] = useState<number>(1);
  const [expirationHours, setExpirationHours] = useState<number>(24);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [pendingDelete, setPendingDelete] = useState<FormCode | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      const res = await axios.post('/admin/form-codes', {
        uses,
        expiration_hours: expirationHours,
      });

      const newCode = res.data?.code as FormCode | undefined;

      if (newCode?.id) setCodes((prev) => [newCode, ...prev]);

      setUses(1);
      setExpirationHours(24);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const resp = err.response;
        if (resp?.status === 422 && resp.data?.errors) {
          setErrors(resp.data.errors);
        }
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;

    try {
      setDeletingId(pendingDelete.id);
      await axios.delete(`/admin/form-codes/${pendingDelete.id}`);
      setCodes((prev) => prev.filter((c) => c.id !== pendingDelete.id));
      setPendingDelete(null);
    } finally {
      setDeletingId(null);
    }
  }

  const presetButtons = [
    { label: '1h', value: 1 },
    { label: '4h', value: 4 },
    { label: '12h', value: 12 },
    { label: '24h', value: 24 },
    { label: '48h', value: 48 },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 py-10 text-white">
      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-900/30 p-8 shadow-2xl shadow-black/40">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">
              {trans('formcodes.title')}
            </h1>
            <p className="mt-3 text-white/70">
              {trans('formcodes.subtitle')}
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white"
          >
            {trans('formcodes.back')}
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <form onSubmit={submit} className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">{__('formcodes.title')}</h2>
            <span className="text-xs">{trans('formcodes.create_step')}</span>
          </div>
          <p className="text-sm text-white/70">{trans('formcodes.create_description')}</p>

          <div>
            <label className="text-sm font-semibold">{trans('formcodes.max_uses')}</label>
            <input
              type="number"
              min={1}
              value={uses}
              disabled={submitting}
              onChange={(e) => setUses(Number(e.target.value))}
              className="w-full rounded-xl bg-slate-800 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">{trans('formcodes.valid_hours')}</label>

            <div className="flex gap-2 mt-2">
              {presetButtons.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setExpirationHours(p.value)}
                  className={`rounded-full px-3 py-2 text-sm ${
                    expirationHours === p.value ? 'bg-emerald-500/20 ring-2 ring-emerald-400' : 'bg-white/10'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <input
              type="number"
              min={1}
              value={expirationHours}
              disabled={submitting}
              onChange={(e) => setExpirationHours(Number(e.target.value))}
              className="w-full rounded-xl bg-slate-800 px-4 py-3 mt-3 text-white"
            />
            <p className="text-xs text-white/60">{trans('formcodes.preset_hint')}</p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-emerald-500 px-6 py-3 font-semibold"
          >
            {submitting ? trans('formcodes.generating') : trans('formcodes.generate_btn')}
          </button>
        </form>

        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <h3 className="text-lg font-semibold">{trans('formcodes.stats_title')}</h3>

          <p className="text-white/70 mt-3">
            {trans('formcodes.stats_avg_uses')}: {codes.length ? Math.round(codes.reduce((a, c) => a + c.uses, 0) / codes.length) : 0}
          </p>
          <p className="text-white/70">
            {trans('formcodes.stats_last_created')}: {codes[0] ? new Date(codes[0].created_at).toLocaleString() : '—'}
          </p>

          <p className="mt-4 text-xs text-emerald-100 bg-emerald-500/10 px-4 py-3 rounded-xl">
            {trans('formcodes.stats_hint')}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold">{trans('formcodes.table_title')}</h2>

        <table className="w-full mt-4 text-sm">
          <thead>
            <tr className="text-white/50 uppercase text-xs">
              <th>{trans('formcodes.col_code')}</th>
              <th>{trans('formcodes.col_uses')}</th>
              <th>{trans('formcodes.col_created_by')}</th>
              <th>{trans('formcodes.col_expiration')}</th>
              <th>{trans('formcodes.col_created')}</th>
              <th className="text-right">{trans('formcodes.col_action')}</th>
            </tr>
          </thead>

          <tbody>
            {codes.map((code) => (
              <tr key={code.id}>
                <td>{code.code}</td>
                <td>{code.uses}</td>
                <td>{code.admin?.email ?? '—'}</td>
                <td>{new Date(code.expiration_date).toLocaleString()}</td>
                <td>{new Date(code.created_at).toLocaleString()}</td>
                <td className="text-right">
                  <button
                    onClick={() => setPendingDelete(code)}
                    className="text-red-300 underline"
                  >
                    {trans('formcodes.delete_btn')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {pendingDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-xl text-white max-w-md w-full">
            <h3 className="text-xl font-semibold">{trans('formcodes.delete_title')}</h3>

            <p className="mt-2">
              {trans('formcodes.delete_desc')} <span className="font-mono">{pendingDelete.code}</span>.
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setPendingDelete(null)}
                className="flex-1 border px-4 py-2 rounded-xl"
              >
                {trans('formcodes.delete_cancel')}
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 px-4 py-2 rounded-xl"
              >
                {deletingId === pendingDelete.id
                  ? trans('formcodes.delete_deleting')
                  : trans('formcodes.delete_confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

FormCodes.layout = (page: React.ReactNode) => (
  <AdminLayout title="Form Codes">{page}</AdminLayout>
);
