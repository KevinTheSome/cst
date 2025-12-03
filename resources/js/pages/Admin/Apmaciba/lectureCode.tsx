import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useMemo, useState } from 'react';

type OnlineCode = {
  id: number;
  code: string;
  online_training_id?: number | null;
  max_uses: number;
  used_count: number;
  last_used_by?: string | null;
  valid_from?: string | null;
  valid_until?: string | null;
  last_used_at?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export default function LectureCode() {
  const { props } = usePage();
  const initialCodes: OnlineCode[] = (props as any).codes ?? [];

  const [codes, setCodes] = useState<OnlineCode[]>(initialCodes);
  const [loading, setLoading] = useState(false);

  // create form state
  const [creating, setCreating] = useState(false);
  const [newCodeData, setNewCodeData] = useState({
    code: '',
    online_training_id: '',
    max_uses: 0,
    valid_from: '',
    valid_until: '',
    is_active: true,
  });
  const [formError, setFormError] = useState<string | null>(null);

  // edit modal
  const [editing, setEditing] = useState<OnlineCode | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const refreshFromServer = async () => {
    try {
      const res = await axios.get('/admin/lecture/codes');
      // in our controller index returns Inertia so GET returns HTML — instead
      // we rely on local updates after create/update/destroy to keep list in sync.
      // Alternatively implement an API-only endpoint to return JSON listing.
    } catch (e) {
      // ignore for now
    }
  };

  const handleCreate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setFormError(null);

    // basic validation
    if (newCodeData.max_uses < 0) {
      setFormError('Max uses must be >= 0');
      return;
    }

    setCreating(true);
    try {
      const payload = {
        code: newCodeData.code || null,
        online_training_id: newCodeData.online_training_id ? Number(newCodeData.online_training_id) : null,
        max_uses: Number(newCodeData.max_uses) || 0,
        valid_from: newCodeData.valid_from || null,
        valid_until: newCodeData.valid_until || null,
        is_active: newCodeData.is_active,
      };

      const res = await axios.post('/admin/lecture/codes', payload);
      const created: OnlineCode = res.data.code;
      setCodes((prev) => [created, ...prev]);
      setNewCodeData({
        code: '',
        online_training_id: '',
        max_uses: 0,
        valid_from: '',
        valid_until: '',
        is_active: true,
      });
    } catch (err: any) {
      setFormError(err?.response?.data?.message || 'Neizdevās izveidot kodu.');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Dzēst šo piekļuves kodu?')) return;
    try {
      await axios.delete(`/admin/lecture/codes/${id}`);
      setCodes((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert('Neizdevās izdzēst');
    }
  };

  const handleRegenerate = async (id: number) => {
    if (!confirm('Ģenerēt jaunu kodu (esošais tiks aizvietots)?')) return;
    try {
      const res = await axios.post(`/admin/lecture/codes/${id}/regenerate`);
      const updated: OnlineCode = res.data.code;
      setCodes((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    } catch (err) {
      alert('Neizdevās pārģenerēt kodu');
    }
  };

  const openEdit = (c: OnlineCode) => {
    setEditing(c);
    setEditError(null);
  };

  const handleUpdate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!editing) return;
    setSubmitting(true);
    setEditError(null);

    try {
      const payload = {
        code: editing.code,
        online_training_id: editing.online_training_id ?? null,
        max_uses: editing.max_uses,
        valid_from: editing.valid_from,
        valid_until: editing.valid_until,
        is_active: editing.is_active,
      };
      const res = await axios.put(`/admin/lecture/codes/${editing.id}`, payload);
      const updated: OnlineCode = res.data.code;
      setCodes((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setEditing(null);
    } catch (err: any) {
      setEditError(err?.response?.data?.message || 'Neizdevās atjaunināt');
    } finally {
      setSubmitting(false);
    }
  };

  const humanDate = (s?: string | null) => (s ? new Date(s).toLocaleString() : '—');

  return (
    <>
      <Head title="Lecture codes" />

      <div className="min-h-screen px-6 py-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-white">Lecture codes</h1>
                <p className="mt-1 text-sm text-white/70">Create and manage access codes for online training.</p>
              </div>
            </div>
          </div>

          {/* Create form */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <form onSubmit={handleCreate} className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="text-xs text-white/60">Code (optional)</label>
                <input
                  value={newCodeData.code}
                  onChange={(e) => setNewCodeData((s) => ({ ...s, code: e.target.value }))}
                  placeholder="Leave blank to auto-generate"
                  className="mt-2 w-full rounded-2xl border bg-slate-900/50 px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-xs text-white/60">Max uses</label>
                <input
                  type="number"
                  value={newCodeData.max_uses}
                  onChange={(e) => setNewCodeData((s) => ({ ...s, max_uses: Number(e.target.value) }))}
                  className="mt-2 w-full rounded-2xl border bg-slate-900/50 px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  disabled={creating}
                  className={`w-full rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black ${creating ? 'opacity-70' : ''}`}
                >
                  {creating ? 'Creating…' : 'Create code'}
                </button>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-3 text-xs text-white/60">
                  <strong>Note:</strong> you can leave the code blank to auto-generate a unique 8-char code.
                </div>
                {formError && <div className="mt-2 text-sm text-rose-400">{formError}</div>}
              </div>
            </form>
          </div>

          {/* Codes table */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-semibold text-white">Existing codes</h2>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left text-xs text-white/60">
                    <th className="px-2 py-2">Code</th>
                    <th className="px-2 py-2">Training</th>
                    <th className="px-2 py-2">Uses</th>
                    <th className="px-2 py-2">Valid</th>
                    <th className="px-2 py-2">Active</th>
                    <th className="px-2 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((c) => (
                    <tr key={c.id} className="border-t border-white/6">
                      <td className="px-2 py-3">
                        <div className="text-sm text-white">{c.code}</div>
                        <div className="text-xs text-white/50">{humanDate(c.created_at)}</div>
                      </td>
                      <td className="px-2 py-3 text-sm text-white/70">{c.online_training_id ?? '—'}</td>
                      <td className="px-2 py-3 text-sm text-white/70">
                        {c.used_count} / {c.max_uses === 0 ? '∞' : c.max_uses}
                      </td>
                      <td className="px-2 py-3 text-sm text-white/70">
                        {c.valid_from ? new Date(c.valid_from).toLocaleDateString() : '—'} — {c.valid_until ? new Date(c.valid_until).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-2 py-3">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs ${c.is_active ? 'bg-emerald-500 text-black' : 'bg-slate-600 text-white/80'}`}>
                          {c.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex gap-2">
                          <button type="button" onClick={() => openEdit(c)} className="rounded-full border px-3 py-1 text-xs">Edit</button>
                          <button type="button" onClick={() => handleRegenerate(c.id)} className="rounded-full border px-3 py-1 text-xs">Regenerate</button>
                          <button type="button" onClick={() => handleDelete(c.id)} className="rounded-full border px-3 py-1 text-xs text-rose-400">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {codes.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-2 py-6 text-center text-sm text-white/60">No codes yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edit modal (simple) */}
          {editing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="w-full max-w-2xl rounded-2xl bg-slate-900 p-6">
                <h3 className="text-lg font-semibold text-white">Edit code</h3>

                <form onSubmit={handleUpdate} className="mt-4 grid gap-3">
                  <div>
                    <label className="text-xs text-white/60">Code</label>
                    <input
                      value={editing.code}
                      onChange={(e) => setEditing({ ...editing, code: e.target.value })}
                      className="mt-1 w-full rounded-2xl border bg-slate-800 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/60">Max uses</label>
                    <input
                      type="number"
                      value={editing.max_uses}
                      onChange={(e) => setEditing({ ...editing, max_uses: Number(e.target.value) })}
                      className="mt-1 w-full rounded-2xl border bg-slate-800 px-3 py-2 text-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button disabled={submitting} type="submit" className="rounded-2xl bg-emerald-500 px-4 py-2 font-semibold text-black">
                      Save
                    </button>
                    <button type="button" onClick={() => setEditing(null)} className="rounded-2xl border px-4 py-2 text-white">Cancel</button>
                  </div>

                  {editError && <div className="text-sm text-rose-400">{editError}</div>}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

(LectureCode as any).layout = (page: React.ReactNode) => <AdminLayout title="Lecture codes">{page}</AdminLayout>;
