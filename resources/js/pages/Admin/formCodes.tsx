// resources/js/pages/Admin/formCodes.tsx
import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

type FormCode = {
  id: number;
  code: string;
  uses: number;
  user_created: number | string;
  admin?: { id: number; email: string } | null;
  expiration_date: string;
  created_at: string;
};


type Props = {
  codes: FormCode[]; // initial props from the server
};

export default function FormCodes({ codes: initialCodes }: Props) {
  const [codes, setCodes] = useState<FormCode[]>(initialCodes);
  const [uses, setUses] = useState<number>(1);
  const [expirationHours, setExpirationHours] = useState<number>(24); // default 24 hours (1 day)
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

      // backend returns { success: true, code: <FormCode> }
      const newCode = res.data?.code as FormCode | undefined;

      if (newCode && newCode.id) {
        setCodes((prev) => [newCode, ...prev]);
      } else {
        // fallback: refresh list if backend didn't return code object
        // optionally you could reload via Inertia.visit or fetch a fresh list
      }
      setUses(1);
      setExpirationHours(24);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const resp = err.response;
        if (resp && resp.status === 422 && resp.data?.errors) {
          setErrors(resp.data.errors);
        } else {
          console.error('Submission error', resp?.data ?? err.message);
        }
      } else {
        console.error(err);
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete || deletingId) return;

    try {
      setDeletingId(pendingDelete.id);
      await axios.delete(`/admin/form-codes/${pendingDelete.id}`);
      setCodes((prev) => prev.filter((codeItem) => codeItem.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (error) {
      console.error('Unable to delete code', error);
    } finally {
      setDeletingId(null);
    }
  }

  const presetButtons = [
    { label: '1 hour', value: 1 },
    { label: '4 hours', value: 4 },
    { label: '12 hours', value: 12 },
    { label: '1 day', value: 24 },
    { label: '2 days', value: 48 },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 py-10 text-white">
      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-900/30 p-8 shadow-2xl shadow-black/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Code vault</p>
            <h1 className="mt-2 text-3xl font-semibold">Piekļuves kodi anketai</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/70">
              Ģenerējiet un pārraugiet laika ierobežotus piekļuves kodus, lai kontrolētu, kurš var redzēt pacientu anketu.
            </p>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            ← Atpakaļ uz paneli
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <form onSubmit={submit} className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Izveidot jaunu kodu</h2>
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">1. solis</span>
            </div>
            <p className="mt-2 text-sm text-white/70">Norādiet maksimālo izmantošanas reižu skaitu un derīguma ilgumu.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/80">Maksimālās izmantošanas reizes</label>
            <input
              type="number"
              value={uses}
              onChange={(e) => setUses(Number(e.target.value))}
              min={1}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              disabled={submitting}
            />
            {errors.uses && <p className="text-sm text-rose-300">{errors.uses.join(', ')}</p>}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/80">Derīgums stundās</label>
            <div className="flex flex-wrap gap-2">
              {presetButtons.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                    expirationHours === p.value ? 'bg-emerald-500/20 text-emerald-200 ring-2 ring-emerald-400/50' : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                  onClick={() => setExpirationHours(p.value)}
                  disabled={submitting}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={expirationHours}
              onChange={(e) => setExpirationHours(Number(e.target.value))}
              min={1}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              disabled={submitting}
            />
            <p className="text-xs text-white/60">Piemēram, 24 = 24 stundas, 48 = 2 dienas.</p>
            {errors.expiration_hours && <p className="text-sm text-rose-300">{errors.expiration_hours.join(', ')}</p>}
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
                Veido kodu…
              </>
            ) : (
              'Ģenerēt kodu'
            )}
          </button>
        </form>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Statistika</p>
              <p className="text-lg font-semibold text-white">Visu kodu kopskats</p>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">{codes.length} kodi</span>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>Vidējais atļauto izmantošanas reižu skaits: {codes.length ? Math.round(codes.reduce((sum, c) => sum + c.uses, 0) / codes.length) : 0}</p>
            <p>Pēdējais izveidotais kods: {codes[0] ? new Date(codes[0].created_at).toLocaleString() : '—'}</p>
          </div>
          <p className="rounded-2xl border border-white/10 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100">
            Kodus var kopīgot ar pacientiem, lai viņi aizpildītu anketu noteiktā laika periodā.
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Eksistējošie kodi</p>
            <h2 className="text-2xl font-semibold text-white">Aktīvo kodu saraksts</h2>
          </div>
          <p className="text-sm text-white/60">Sakārtots pēc jaunākā</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-950/50 text-xs uppercase tracking-[0.25em] text-white/50">
                <th className="px-4 py-3 text-left font-semibold">Kods</th>
                <th className="px-4 py-3 text-left font-semibold">Izmantošanas reizes</th>
                <th className="px-4 py-3 text-left font-semibold">Izveidoja</th>
                <th className="px-4 py-3 text-left font-semibold">Derīgs līdz</th>
                <th className="px-4 py-3 text-left font-semibold">Izveidots</th>
                <th className="px-4 py-3 text-right font-semibold">Darbība</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((code, index) => (
                <tr key={code.id} className={`text-sm ${index % 2 === 0 ? 'bg-white/5' : 'bg-white/[0.02]'}`}>
                  <td className="px-4 py-3 font-mono text-base text-white">{code.code}</td>
                  <td className="px-4 py-3 text-white/80">{code.uses}</td>
                  <td className="px-4 py-3 text-white/80">{code.admin?.email ?? '—'}</td>
                  <td className="px-4 py-3 text-white/80">{new Date(code.expiration_date).toLocaleString()}</td>
                  <td className="px-4 py-3 text-white/80">{new Date(code.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setPendingDelete(code)}
                      disabled={deletingId === code.id}
                      className="inline-flex items-center rounded-full border border-red-400/40 px-3 py-1 text-xs font-semibold text-red-200 transition hover:bg-red-500/10 disabled:opacity-60"
                    >
                      Dzēst
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pendingDelete && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/90 p-6 text-white shadow-2xl shadow-black/50">
            <h3 className="text-xl font-semibold">Dzēst kodu?</h3>
            <p className="mt-2 text-sm text-white/70">
              Jūs gatavojaties neatgriezeniski dzēst kodu <span className="font-mono text-white">{pendingDelete.code}</span>. Lietotāji ar šo kodu
              vairs nevarēs piekļūt anketei.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                disabled={deletingId === pendingDelete.id}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Atcelt
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deletingId === pendingDelete.id}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/40 transition hover:bg-red-400 disabled:opacity-60"
              >
                {deletingId === pendingDelete.id ? 'Dzēš…' : 'Apstiprināt dzēšanu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Keep same Admin layout pattern you're using elsewhere
FormCodes.layout = (page: React.ReactNode) => <AdminLayout title="Form Codes">{page}</AdminLayout>;
