import { Head, router, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import AdminLayout from '@/Layouts/AdminLayout';

interface AdminUser {
    id: number;
    email: string;
    created_at: string;
}

interface FlashBag {
    success?: string | null;
    error?: string | null;
}

interface SecurityProps {
    admins: AdminUser[];
    flash?: FlashBag;
}

export default function Security({ admins, flash }: SecurityProps) {
    const { locale } = useLang();
    const lang = locale === 'en' ? 'en' : 'lv';
    const copy = {
        eyebrow: { lv: 'Drošība', en: 'Security' },
        title: { lv: 'Administratori', en: 'Administrators' },
        description: {
            lv: 'Ielūdziet uzticamus kolēģus, ātri atjaunojiet paroles un atceļiet piekļuvi, kad tas ir nepieciešams.',
            en: 'Invite trusted teammates, rotate credentials quickly, and revoke access whenever needed.',
        },
        existingTitle: { lv: 'Esošie administratori', en: 'Existing admins' },
        existingSubtitle: {
            lv: 'Regulāri noņemiet kontus, kuri vairs netiek izmantoti.',
            en: 'Remove access for unused accounts regularly.',
        },
        totalLabel: { lv: 'kopā', en: 'total' },
        emptyState: {
            lv: 'Vēl nav administratoru. Uzaiciniet pirmo kolēģi.',
            en: 'No admins yet. Invite your first teammate.',
        },
        addedLabel: { lv: 'Pievienots {date}', en: 'Added {date}' },
        removeButton: { lv: 'Dzēst', en: 'Remove' },
        addTitle: { lv: 'Pievienot administratoru', en: 'Add admin' },
        addSubtitle: {
            lv: 'Izveidojiet piekļuves datus jaunam administratoram.',
            en: 'Create login credentials for a new admin user.',
        },
        emailLabel: { lv: 'E-pasts', en: 'Email' },
        emailPlaceholder: { lv: 'admin@postdock.com', en: 'admin@postdock.com' },
        passwordLabel: { lv: 'Parole', en: 'Password' },
        confirmPasswordLabel: { lv: 'Apstipriniet paroli', en: 'Confirm password' },
        createButton: { lv: 'Izveidot administratoru', en: 'Create admin' },
        creatingButton: { lv: 'Izveido...', en: 'Creating…' },
        deleteConfirm: { lv: 'Dzēst administratoru {email}?', en: 'Delete admin {email}?' },
        show: { lv: 'Rādīt', en: 'Show' },
        hide: { lv: 'Slēpt', en: 'Hide' },
    } as const;

    type CopyKey = keyof typeof copy;

    const t = (key: CopyKey, replacements: Record<string, string> = {}) => {
        const template = copy[key][lang] as string;
        return Object.entries(replacements).reduce<string>(
            (result, [placeholder, value]) => result.replace(`{${placeholder}}`, value),
            template,
        );
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const sortedAdmins = useMemo(
        () => [...admins].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
        [admins],
    );

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        post('/admin/security', {
            preserveScroll: true,
            onSuccess: () => reset('email', 'password', 'password_confirmation'),
        });
    };

    const handleDelete = (admin: AdminUser) => {
        if (!confirm(t('deleteConfirm', { email: admin.email }))) {
            return;
        }

        router.delete(`/admin/security/${admin.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Security" />
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-slate-100 sm:px-8">
                <div className="mx-auto w-full max-w-5xl space-y-8">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/60 backdrop-blur">
                        <p className="text-xs uppercase tracking-[0.4em] text-emerald-400">{t('eyebrow')}</p>
                        <h1 className="mt-2 text-3xl font-semibold text-white">{t('title')}</h1>
                        <p className="mt-3 text-sm text-slate-300">{t('description')}</p>
                    </div>

                    {(flash?.success || flash?.error) && (
                        <div
                            className={`rounded-2xl border p-4 text-sm ${flash?.error ? 'border-red-500/50 bg-red-500/10 text-red-200' : 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'}`}
                        >
                            {flash?.error ?? flash?.success}
                        </div>
                    )}

                    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
                        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">{t('existingTitle')}</h2>
                                    <p className="text-sm text-slate-400">{t('existingSubtitle')}</p>
                                </div>
                                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                                    {admins.length} {t('totalLabel')}
                                </span>
                            </div>

                            <div className="mt-6 divide-y divide-white/5">
                                {sortedAdmins.length === 0 ? (
                                    <p className="py-6 text-sm text-slate-400">{t('emptyState')}</p>
                                ) : (
                                    sortedAdmins.map((admin) => (
                                        <div
                                            key={admin.id}
                                            className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div>
                                                <p className="font-semibold text-white">{admin.email}</p>
                                                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                                                    {t('addedLabel', {
                                                        date: new Date(admin.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'lv-LV'),
                                                    })}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(admin)}
                                                className="inline-flex items-center justify-center rounded-full border border-red-400/60 px-4 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/10"
                                            >
                                                {t('removeButton')}
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/50">
                            <h2 className="text-lg font-semibold text-white">{t('addTitle')}</h2>
                            <p className="text-sm text-slate-400">{t('addSubtitle')}</p>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        {t('emailLabel')}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(event) => setData('email', event.target.value)}
                                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-900/40"
                                        placeholder={t('emailPlaceholder')}
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        {t('passwordLabel')}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={data.password}
                                            onChange={(event) => setData('password', event.target.value)}
                                            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-900/40"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute inset-y-0 right-3 text-xs font-semibold text-slate-300 hover:text-white"
                                        >
                                            {showPassword ? t('hide') : t('show')}
                                        </button>
                                    </div>
                                    {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        {t('confirmPasswordLabel')}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            required
                                            value={data.password_confirmation}
                                            onChange={(event) => setData('password_confirmation', event.target.value)}
                                            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-900/40"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            className="absolute inset-y-0 right-3 text-xs font-semibold text-slate-300 hover:text-white"
                                        >
                                            {showConfirmPassword ? t('hide') : t('show')}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? t('creatingButton') : t('createButton')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Security.layout = (page: React.ReactNode) => <AdminLayout title="Security">{page}</AdminLayout>;
