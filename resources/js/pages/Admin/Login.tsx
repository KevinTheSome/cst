import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import LoginLayout from '../../Layouts/LoginLayout';

type LoginProps = {
    onSuccess?: (data: unknown) => void;
    apiEndpoint?: string;
};

const statCards = [
    { label: 'Sessions today', value: '148', hint: 'Last sync 2m ago' },
    { label: 'Systems status', value: 'Operational', hint: 'No incidents reported' },
    { label: 'Latency', value: '246ms', hint: 'Global average' },
];

export default function LoginPage({ onSuccess, apiEndpoint = '/admin/login' }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
    const [showPassword, setShowPassword] = useState(false);

    function validate() {
        const errors: { email?: string; password?: string } = {};

        if (!email.trim()) errors.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email address';

        if (!password) errors.password = 'Password is required';
        else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!validate()) return;

        setLoading(true);
        try {
            const payload = { email: email.trim(), password, remember };

            const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';

            const res = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    Accept: 'application/json',
                },
                body: JSON.stringify(payload),
                credentials: 'include',
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                if (data.errors) setFieldErrors(data.errors);
                setError(data.message || 'Login failed.');
                setLoading(false);
                return;
            }

            setLoading(false);
            if (onSuccess) onSuccess(data);

            if (data.redirect) window.location.href = data.redirect;
        } catch (err: unknown) {
            setLoading(false);
            const message = err instanceof Error ? err.message : 'Network error';
            setError(message);
        }
    }

    return (
        <>
            <Head title="Login" />
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_55%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(99,102,241,0.18),_transparent_55%)]" />
                <div className="relative z-10 grid w-full max-w-6xl gap-8 rounded-[32px] border border-white/10 bg-slate-950/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.6)] backdrop-blur-xl lg:grid-cols-2 lg:p-12">
                    <section className="flex flex-col justify-between space-y-10">
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Control surface</p>
                            <h1 className="mt-4 text-3xl font-semibold text-white">Admin authentication</h1>
                            <p className="mt-2 max-w-md text-sm text-white/70">
                                Access the command dashboard, review approvals, and keep everything in sync. Use your work email to sign in.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {statCards.map((stat) => (
                                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/10">
                                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">{stat.label}</p>
                                    <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                                    <p className="text-sm text-white/60">{stat.hint}</p>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-3xl border border-emerald-300/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                            <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Security pulse</p>
                            <p className="mt-2 font-semibold text-white">All systems shielded • MFA enforced</p>
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30 sm:p-8">
                        {error && (
                            <div className="mb-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate className="space-y-6">
                            <div>
                                <label htmlFor="email" className="text-xs uppercase tracking-[0.3em] text-white/60">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        autoComplete="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full rounded-2xl border bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 ${
                                            fieldErrors.email ? 'border-rose-400/50' : 'border-white/10'
                                        }`}
                                        placeholder="you@lab.io"
                                    />
                                    {fieldErrors.email && <p className="mt-2 text-xs text-rose-200">{fieldErrors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="text-xs uppercase tracking-[0.3em] text-white/60">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            autoComplete="current-password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`w-full rounded-2xl border bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 ${
                                                fieldErrors.password ? 'border-rose-400/50' : 'border-white/10'
                                            }`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((s) => !s)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-white/70 hover:text-white"
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    {fieldErrors.password && <p className="mt-2 text-xs text-rose-200">{fieldErrors.password}</p>}
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-white/70">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        className="h-4 w-4 rounded border-white/30 bg-transparent text-emerald-400 focus:ring-emerald-400/30"
                                    />
                                    Remember me
                                </label>
                                <span className="text-xs uppercase tracking-[0.3em] text-white/40">Need help?</span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-2xl border border-emerald-300/40 bg-gradient-to-r from-emerald-400/20 to-sky-500/20 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:translate-y-0.5 hover:border-emerald-200/70 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 disabled:opacity-60"
                            >
                                {loading ? 'Verifying access…' : 'Enter command center'}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

LoginPage.layout = (page: React.ReactNode) => <LoginLayout title="Login">{page}</LoginLayout>;
