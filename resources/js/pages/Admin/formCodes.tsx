import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { useLang } from '@/hooks/useLang';
import { 
    Trash2, 
    Clock, 
    BarChart3, 
    FileText, 
    ArrowLeft, 
    Sparkles, 
    AlertTriangle, 
    CheckCircle,
    Copy,
    Plus
} from 'lucide-react';

type Form = {
  id: number;
  title: string;
};

type FormCode = {
  id: number;
  code: string;
  uses: number;
  user_created: number | string;
  form?: Form | null;
  admin?: { id: number; email: string } | null;
  expiration_date: string;
  created_at: string;
};

type Props = { codes: FormCode[]; forms: Form[] };

// --- Custom Modal Icon ---
const IconWarning = () => (
    <svg className="h-12 w-12 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

// CSRF helper
function getCsrfToken() {
  return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content ?? '';
}

export default function FormCodes({ codes: initialCodes, forms }: Props) {
  const { trans, __ } = useLang();

  const [codes, setCodes] = useState<FormCode[]>(initialCodes);
  const [selectedFormId, setSelectedFormId] = useState<number | ''>(forms[0]?.id ?? '');
  const [uses, setUses] = useState<number>(1);
  const [expirationHours, setExpirationHours] = useState<number>(24);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  
  // Modal States
  const [pendingDelete, setPendingDelete] = useState<FormCode | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [customCode, setCustomCode] = useState('');
  
  // Notification State
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    if (customCode) {
        if (customCode.length !== 12 || /\s/.test(customCode)) {
            setErrors({
            code: ['Custom code must be exactly 12 characters and contain no spaces'],
            });
            setSubmitting(false);
            return;
        }
    };

    if (!selectedFormId) {
      setErrors({ form_id: ['No survey selected'] });
      setSubmitting(false);
      return;
    }

    try {
      const csrf = getCsrfToken();
      const res = await axios.post('/admin/form-codes', {
        uses,
        expiration_hours: expirationHours,
        form_id: selectedFormId,
        code: customCode || null,
      }, {
        headers: { 'X-CSRF-TOKEN': csrf, Accept: 'application/json' }
      });

      const newCode = res.data?.code as FormCode | undefined;
      if (newCode?.id) {
          setCodes((prev) => [newCode, ...prev]);
          setNotification({ type: 'success', message: 'Code generated successfully!' });
          setTimeout(() => setNotification(null), 3000);

          setUses(1);
          setExpirationHours(24);
          setSelectedFormId(forms[0]?.id ?? '');
          setCustomCode('');
      }

      // reset inputs
      setUses(1);
      setExpirationHours(24);
      setSelectedFormId(forms[0]?.id ?? '');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const resp = err.response;
        if (resp?.status === 422 && resp.data?.errors) {
          setErrors(resp.data.errors);
        } else {
            setNotification({ type: 'error', message: 'Failed to generate code.' });
        }
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setIsDeleting(true);

    try {
      // Convert DELETE -> POST (server expects POST for destroy)
      const csrf = getCsrfToken();
      await axios.post(`/admin/form-codes/${pendingDelete.id}`, {}, { headers: { 'X-CSRF-TOKEN': csrf, Accept: 'application/json' } });

      setCodes((prev) => prev.filter((c) => c.id !== pendingDelete.id));
      setPendingDelete(null);
      setNotification({ type: 'success', message: 'Code deleted successfully.' });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
        setNotification({ type: 'error', message: 'Failed to delete code.' });
    } finally {
      setIsDeleting(false);
    }
  }

  const presetButtons = [
    { label: '1h', value: 1 },
    { label: '4h', value: 4 },
    { label: '12h', value: 12 },
    { label: '24h', value: 24 },
    { label: '48h', value: 48 },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setNotification({ type: 'success', message: 'Code copied to clipboard!' });
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* --- Header Card --- */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-5 w-5 text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Access Management</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">{trans('formcodes.title')}</h1>
                    <p className="mt-2 text-slate-400 max-w-lg">{trans('formcodes.subtitle')}</p>
                </div>
                <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {trans('formcodes.back')}
                </Link>
            </div>
        </div>

        {/* --- Notification Toast --- */}
        {notification && (
            <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-xl animate-in slide-in-from-right-10 fade-in duration-300 ${
                notification.type === 'success' 
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200' 
                : 'border-rose-500/20 bg-rose-500/10 text-rose-200'
            }`}>
                {notification.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                <span className="text-sm font-medium">{notification.message}</span>
            </div>
        )}

        {/* --- Main Grid --- */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            
            {/* Left Column: Create Form */}
            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                            <Plus className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">{__('formcodes.title')}</h2>
                            <p className="text-xs text-slate-400">{trans('formcodes.create_step')}</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Survey Select */}
                        <div>
                            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
                                {trans('formcodes.select_survey')}
                            </label>
                            {forms.length ? (
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                                    <select
                                        value={selectedFormId}
                                        disabled={submitting}
                                        onChange={(e) => setSelectedFormId(Number(e.target.value))}
                                        className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                                    >
                                        {forms.map((f) => (
                                            <option key={f.id} value={f.id} className="bg-slate-900">
                                                {f.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300">
                                    No surveys available.
                                </div>
                            )}
                            {errors.form_id && <p className="mt-1 text-xs text-rose-400">{errors.form_id[0]}</p>}
                        </div>

                        {/* Custom Code */}
                        <div>
                        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
                            Custom Code (optional)
                        </label>

                        <input
                            type="text"
                            value={customCode}
                            disabled={submitting}
                            onChange={(e) => {
                            const value = e.target.value.toUpperCase();
                            if (!value.includes(' ')) {
                                setCustomCode(value);
                            }
                            }}
                            maxLength={12}
                            placeholder="12 characters, no spaces"
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors font-mono"
                        />

                        {customCode && customCode.length !== 12 && (
                            <p className="mt-1 text-xs text-rose-400">
                            Code must be exactly 12 characters
                            </p>
                        )}

                        {errors.code && (
                            <p className="mt-1 text-xs text-rose-400">
                            {errors.code[0]}
                            </p>
                        )}
                        </div>

                        {/* Uses */}
                        <div>
                            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
                                {trans('formcodes.max_uses')}
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={uses}
                                disabled={submitting || !forms.length}
                                onChange={(e) => setUses(Number(e.target.value))}
                                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                        </div>

                        {/* Expiration */}
                        <div>
                            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
                                {trans('formcodes.valid_hours')}
                            </label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {presetButtons.map((p) => (
                                    <button
                                        key={p.value}
                                        type="button"
                                        onClick={() => setExpirationHours(p.value)}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                            expirationHours === p.value 
                                            ? 'bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20 scale-105' 
                                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                                <input
                                    type="number"
                                    min={1}
                                    value={expirationHours}
                                    disabled={submitting || !forms.length}
                                    onChange={(e) => setExpirationHours(Number(e.target.value))}
                                    className="w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting || !forms.length}
                            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/30 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {submitting ? trans('formcodes.generating') : trans('formcodes.generate_btn')}
                        </button>
                    </div>
                </div>

                {/* Stats Panel */}
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                            <BarChart3 className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{trans('formcodes.stats_title')}</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                            <p className="text-xs text-slate-400">{trans('formcodes.stats_avg_uses')}</p>
                            <p className="text-2xl font-bold text-white mt-1">
                                {codes.length ? Math.round(codes.reduce((a, c) => a + c.uses, 0) / codes.length) : 0}
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                            <p className="text-xs text-slate-400">Total Codes</p>
                            <p className="text-2xl font-bold text-white mt-1">{codes.length}</p>
                        </div>
                    </div>
                    
                    <div className="mt-4 flex items-start gap-3 rounded-xl bg-indigo-500/10 p-4 text-xs leading-relaxed text-indigo-200">
                        <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
                        <p>{trans('formcodes.stats_hint')}</p>
                    </div>
                </div>
            </form>

            {/* Right Column: Code List */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 flex flex-col shadow-2xl backdrop-blur-xl overflow-hidden h-fit">
                <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                    <h2 className="text-lg font-bold text-white">{trans('formcodes.table_title')}</h2>
                    <span className="text-xs font-mono text-slate-500 bg-black/30 px-2 py-1 rounded border border-white/5">
                        {codes.length} active
                    </span>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5 text-xs font-bold uppercase tracking-wider text-slate-400">
                                <th className="px-6 py-4">{trans('formcodes.col_code')}</th>
                                <th className="px-6 py-4">{trans('formcodes.col_survey')}</th>
                                <th className="px-6 py-4 text-center">{trans('formcodes.col_uses')}</th>
                                <th className="px-6 py-4 text-right">{trans('formcodes.col_action')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {codes.map((code) => (
                                <tr key={code.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-emerald-400 font-medium">{code.code}</span>
                                            <button 
                                                onClick={() => copyToClipboard(code.code)}
                                                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white transition-opacity"
                                                title="Copy Code"
                                            >
                                                <Copy className="h-3 w-3" />
                                            </button>
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {new Date(code.expiration_date).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-300 font-medium line-clamp-1">{code.form?.title ?? '—'}</div>
                                        <div className="text-xs text-slate-500 mt-0.5">By: {code.admin?.email ?? 'Unknown'}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center justify-center rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 border border-white/5">
                                            {code.uses}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setPendingDelete(code)}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                                            title={trans('formcodes.delete_btn')}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {codes.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        No codes generated yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>

      {/* --- Delete Confirmation Modal --- */}
      {pendingDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
            onClick={() => !isDeleting && setPendingDelete(null)}
          />
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800/50">
                <IconWarning />
              </div>
              
              <h3 className="mb-2 text-xl font-bold text-white">
                {trans('formcodes.delete_title')}
              </h3>
              
              <p className="mb-6 text-sm text-slate-400 leading-relaxed">
                {trans('formcodes.delete_desc')}{' '}
                <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1 rounded">{pendingDelete.code}</span>.
              </p>

              <div className="flex gap-3">
                <button
                  disabled={isDeleting}
                  onClick={() => setPendingDelete(null)}
                  className="flex-1 rounded-xl border border-white/10 bg-transparent py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  {trans('formcodes.delete_cancel')}
                </button>
                <button
                  disabled={isDeleting}
                  onClick={confirmDelete}
                  className="flex-1 rounded-xl bg-rose-500 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02] hover:bg-rose-600"
                >
                  {isDeleting ? trans('formcodes.delete_deleting') : trans('formcodes.delete_confirm')}
                </button>
              </div>
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
