import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import LoginLayout from '../../Layouts/LoginLayout';
import { useLang } from '@/hooks/useLang';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Globe,
    HelpCircle,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
} from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';

type LoginProps = {
    onSuccess?: (data: unknown) => void;
    apiEndpoint?: string;
};

export default function LoginPage({ onSuccess, apiEndpoint = '/admin/login' }: LoginProps) {
    const { trans, __ } = useLang();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const { props } = usePage<any>();
    const currentLocale = props?.locale || 'lv';

    function validate() {
        const errors: { email?: string; password?: string } = {};

        if (!email.trim()) errors.email = __('admin_login.errors.email_required');
        else if (!/^\S+@\S+\.\S+$/.test(email))
            errors.email = __('admin_login.errors.email_invalid');

        if (!password) errors.password = __('admin_login.errors.password_required');
        else if (password.length < 6)
            errors.password = __('admin_login.errors.password_min');

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const switchLanguage = async (locale: string) => {
        if (currentLocale === locale) return;

        try {
            await axios.post('/locale', { locale });
            router.reload({ only: ['lang', 'locale'] });
        } catch (error) {
            console.error('Language switch failed:', error);
        }
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!validate()) return;

        setLoading(true);
        try {
            const payload = { email: email.trim(), password, remember };
            const token =
                (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)
                    ?.content ?? '';

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
                setError(data.message || __('admin_login.errors.auth_failed'));
                setLoading(false);
                return;
            }

            setLoading(false);
            onSuccess?.(data);
            if (data.redirect) window.location.href = data.redirect;
        } catch {
            setLoading(false);
            setError(__('admin_login.errors.network'));
        }
    }

    return (
        <>

            <div className="fixed top-6 right-6 z-50">
                <div className="flex items-center rounded-full border border-white/10 bg-slate-900/70 p-1 backdrop-blur-xl shadow-lg">
                    <button
                        onClick={() => switchLanguage('lv')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                            currentLocale === 'lv'
                                ? 'bg-indigo-600 text-white shadow'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        LV
                    </button>

                    <button
                        onClick={() => switchLanguage('en')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                            currentLocale === 'en'
                                ? 'bg-indigo-600 text-white shadow'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        EN
                    </button>
                </div>
            </div>

            <Head title={trans('admin_login.title')} />

            <div className="fixed inset-0 -z-10 bg-slate-950" />

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 text-white">
                <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-900/60 p-8 backdrop-blur-2xl">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-white">
                            {trans('admin_login.title')}
                        </h1>
                        <p className="mt-2 text-base text-slate-400">
                            {trans('admin_login.subtitle')}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 flex gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-200">
                            <AlertCircle className="h-5 w-5 text-rose-400" />
                            <div className="text-sm font-medium">{error}</div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                                {trans('admin_login.email')}
                            </label>
                            <input
                                type="email"
                                value={email}
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white"
                                placeholder="name@company.com"
                            />
                            {fieldErrors.email && (
                                <p className="mt-1.5 text-xs text-rose-400">
                                    {fieldErrors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                                {trans('admin_login.password')}
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white pr-11"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                            {fieldErrors.password && (
                                <p className="mt-1.5 text-xs text-rose-400">
                                    {fieldErrors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember + Help */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-slate-400">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                {trans('admin_login.remember')}
                            </label>

                            <button
                                type="button"
                                onClick={() => setIsHelpOpen(true)}
                                className="flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300"
                            >
                                <HelpCircle className="h-3.5 w-3.5" />
                                {trans('admin_login.need_help')}
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    {trans('admin_login.verifying')}
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    {trans('admin_login.submit')}
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

LoginPage.layout = (page: React.ReactNode) => (
    <LoginLayout title="Admin Login">{page}</LoginLayout>
);
