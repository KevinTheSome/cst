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

      // reset form
      setUses(1);
      setExpirationHours(24);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const resp = err.response;
        if (resp && resp.status === 422 && resp.data?.errors) {
          // validation errors from Laravel
          setErrors(resp.data.errors);
        } else {
          // generic error - you might want to toast this
          console.error('Submission error', resp?.data ?? err.message);
        }
      } else {
        console.error(err);
      }
    } finally {
      setSubmitting(false);
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
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Survey Codes</h1>
        <Link href="/admin" className="text-sm underline">Admin</Link>
      </div>

      <form onSubmit={submit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-semibold">Uses</label>
          <input
            type="number"
            value={uses}
            onChange={(e) => setUses(Number(e.target.value))}
            min={1}
            className="border p-2 rounded w-full"
            disabled={submitting}
          />
          {errors.uses && <p className="text-rose-300 text-sm mt-1">{errors.uses.join(', ')}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold">Expiration (hours)</label>

          <div className="flex gap-2 mb-2">
            {presetButtons.map((p) => (
              <button
                key={p.value}
                type="button"
                className={`text-sm px-3 py-1 rounded border ${expirationHours === p.value ? 'bg-white/10 border-white/30' : 'bg-white/0 border-white/5'}`}
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
            className="border p-2 rounded w-full"
            disabled={submitting}
          />
          <p className="text-xs text-gray-300 mt-1">Enter how many hours this code should be valid for (e.g., 24 = 1 day)</p>
          {errors.expiration_hours && <p className="text-rose-300 text-sm mt-1">{errors.expiration_hours.join(', ')}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
                Creating…
              </>
            ) : (
              'Create Code'
            )}
          </button>
        </div>
      </form>

      <h2 className="text-xl font-bold mb-2">Existing Codes</h2>

      <div className="overflow-x-auto">
        <table className="w-full mt-2 border text-left">
          <thead>
            <tr>
              <th className="border p-2">Code</th>
              <th className="border p-2">Uses</th>
              <th className="border p-2">Creator</th>
              <th className="border p-2">Expires</th>
              <th className="border p-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <tr key={code.id}>
                <td className="border p-2 font-mono">{code.code}</td>
                <td className="border p-2">{code.uses}</td>
                <td className="border p-2">{code.user_created}</td>
                <td className="border p-2">{new Date(code.expiration_date).toLocaleString()}</td>
                <td className="border p-2">{new Date(code.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Keep same Admin layout pattern you're using elsewhere
FormCodes.layout = (page: React.ReactNode) => <AdminLayout title="Form Codes">{page}</AdminLayout>;
