import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import LoginLayout from '../../Layouts/LoginLayout';
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
    Loader2
} from 'lucide-react';

type LoginProps = {
    onSuccess?: (data: unknown) => void;
    apiEndpoint?: string;
};

export default function LoginPage({ onSuccess, apiEndpoint = '/admin/login' }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    
    // Modal State
    const [isHelpOpen, setIsHelpOpen] = useState(false);

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
                setError(data.message || 'Authentication failed. Please check your credentials.');
                setLoading(false);
                return;
            }

            setLoading(false);
            if (onSuccess) onSuccess(data);

            if (data.redirect) window.location.href = data.redirect;
        } catch (err: unknown) {
            setLoading(false);
            const message = err instanceof Error ? err.message : 'Network connection error';
            setError(message);
        }
    }

    return (
        <>
            <Head title="Login" />
            
            {/* Full Page Background Layer - Fixed to cover entire viewport */}
            <div className="fixed inset-0 -z-10 w-full h-full bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.1),_transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.15),_transparent_50%)]" />
            </div>

            <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-16 text-white sm:px-6 lg:px-8">
                
                {/* Main Login Card */}
                <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-900/60 p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-10">
                    
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-white tracking-tight">Admin Login</h1>
                        <p className="mt-2 text-base text-slate-400">
                            Enter your credentials to access the command dashboard.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-200">
                            <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
                            <div className="text-sm font-medium">{error}</div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        <div>
                            <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 pointer-events-none">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full rounded-xl border bg-black/20 pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 transition-all focus:border-indigo-500 focus:bg-slate-900/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                                        fieldErrors.email ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500' : 'border-white/10'
                                    }`}
                                    placeholder="name@company.com"
                                />
                            </div>
                            {fieldErrors.email && <p className="mt-1.5 text-xs text-rose-400">{fieldErrors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 pointer-events-none">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full rounded-xl border bg-black/20 pl-11 pr-11 py-3.5 text-sm text-white placeholder-slate-600 transition-all focus:border-indigo-500 focus:bg-slate-900/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                                        fieldErrors.password ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500' : 'border-white/10'
                                    }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {fieldErrors.password && <p className="mt-1.5 text-xs text-rose-400">{fieldErrors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white/30 bg-transparent transition-all checked:border-indigo-500 checked:bg-indigo-500 hover:border-white/50"
                                    />
                                    <CheckCircle2 className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 left-0.5" />
                                </div>
                                <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Remember me</span>
                            </label>
                            <button
                                type="button" 
                                onClick={() => setIsHelpOpen(true)}
                                className="flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                <HelpCircle className="h-3.5 w-3.5" />
                                Need help?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40 disabled:opacity-70 disabled:hover:scale-100"
                        >
                            <div className="flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Verifying credentials...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Enter Command Center</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>
                </div>
            </div>

            {/* --- Help Modal --- */}
            {isHelpOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
                        onClick={() => setIsHelpOpen(false)}
                    />
                    <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-slate-950/50">
                            <h3 className="font-bold text-white">Login Assistance</h3>
                            <button 
                                onClick={() => setIsHelpOpen(false)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-slate-400">
                                If you have forgotten your password or are experiencing issues with Multi-Factor Authentication (MFA), please contact the IT security team immediately.
                            </p>
                            
                            <div className="rounded-xl bg-white/5 border border-white/5 p-4 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-white">
                                    <Mail className="h-4 w-4 text-indigo-400" />
                                    <span>support@lab.io</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-white">
                                    <Globe className="h-4 w-4 text-indigo-400" />
                                    <span>Internal Wiki / Ops</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => setIsHelpOpen(false)}
                                className="w-full rounded-xl bg-slate-800 py-3 text-sm font-bold text-white hover:bg-slate-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

LoginPage.layout = (page: React.ReactNode) => <LoginLayout title="Login">{page}</LoginLayout>;