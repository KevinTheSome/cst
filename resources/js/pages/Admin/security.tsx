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
        editButton: { lv: 'Rediģēt', en: 'Edit' },
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
        editTitle: { lv: 'Rediģēt administratoru', en: 'Edit admin' },
        editSubtitle: {
            lv: 'Atlasiet administratoru sarakstā, lai atjauninātu e-pastu vai atiestatītu paroli.',
            en: 'Pick an admin from the list to refresh their email or reset password.',
        },
        editingFor: { lv: 'Rediģējat: {email}', en: 'Editing: {email}' },
        updateButton: { lv: 'Saglabāt izmaiņas', en: 'Save changes' },
        updatingButton: { lv: 'Saglabā...', en: 'Saving…' },
        cancelEdit: { lv: 'Atcelt', en: 'Cancel' },
        editHint: {
            lv: 'Ja lauks “Parole” netiek aizpildīts, pašreizējā parole paliks nemainīta.',
            en: 'Leave the password fields blank to keep the current password.',
        },
        selectPromptTitle: { lv: 'Izvēlieties administratoru', en: 'Select an admin' },
        selectPromptBody: {
            lv: 'Spiediet “Rediģēt” sarakstā, lai ielādētu informāciju šajā panelī.',
            en: 'Press “Edit” in the list to load their details into this panel.',
        },
    } as const;

    type CopyKey = keyof typeof copy;

    const t = (key: CopyKey, replacements: Record<string, string> = {}) => {
        const template = copy[key][lang] as string;
        return Object.entries(replacements).reduce<string>(
            (result, [placeholder, value]) => result.replace(`{${placeholder}}`, value),
            template,
        );
    };

    const {
        data: createData,
        setData: setCreateData,
        post: createPost,
        processing: createProcessing,
        errors: createErrors,
        reset: resetCreate,
    } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });
    const {
        data: editData,
        setData: setEditData,
        put: putEdit,
        processing: editProcessing,
        errors: editErrors,
        reset: resetEdit,
        clearErrors: clearEditErrors,
        transform: transformEdit,
    } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [showCreatePassword, setShowCreatePassword] = useState(false);
    const [showCreateConfirmPassword, setShowCreateConfirmPassword] = useState(false);
    const [showEditPassword, setShowEditPassword] = useState(false);
    const [showEditConfirmPassword, setShowEditConfirmPassword] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);

    const sortedAdmins = useMemo(
        () => [...admins].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
        [admins],
    );

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        createPost('/admin/security', {
            preserveScroll: true,
            onSuccess: () => resetCreate('email', 'password', 'password_confirmation'),
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

    const startEditing = (admin: AdminUser) => {
        setEditingAdmin(admin);
        setEditData('email', admin.email);
        setEditData('password', '');
        setEditData('password_confirmation', '');
        clearEditErrors();
        setShowEditPassword(false);
        setShowEditConfirmPassword(false);
    };

    const cancelEditing = () => {
        setEditingAdmin(null);
        resetEdit();
        clearEditErrors();
        setShowEditPassword(false);
        setShowEditConfirmPassword(false);
    };

    const handleUpdate = (event: React.FormEvent) => {
        event.preventDefault();
        if (!editingAdmin) return;

        transformEdit((formData) => ({
            email: formData.email,
            ...(formData.password
                ? {
                      password: formData.password,
                      password_confirmation: formData.password_confirmation,
                  }
                : {}),
        }));

        putEdit(`/admin/security/${editingAdmin.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                cancelEditing();
            },
            onError: () => {
                setEditData('password', '');
                setEditData('password_confirmation', '');
            },
            onFinish: () => {
                transformEdit((formData) => formData);
            },
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
                                        <div key={admin.id} className="py-4">
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="font-semibold text-white">{admin.email}</p>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                                                        {t('addedLabel', {
                                                            date: new Date(admin.created_at).toLocaleDateString(
                                                                lang === 'en' ? 'en-US' : 'lv-LV',
                                                            ),
                                                        })}
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => startEditing(admin)}
                                                        className="inline-flex items-center justify-center rounded-full border border-emerald-400/60 px-4 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/10"
                                                    >
                                                        {t('editButton')}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(admin)}
                                                        className="inline-flex items-center justify-center rounded-full border border-red-400/60 px-4 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/10"
                                                    >
                                                        {t('removeButton')}
                                                    </button>
                                                </div>
                                            </div>

                                            {editingAdmin?.id === admin.id && (
                                                <div className="mt-4 rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-5 shadow-lg shadow-emerald-500/10">
                                                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                        <div>
                                                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">
                                                                {t('editTitle')}
                                                            </p>
                                                            <p className="text-xs text-slate-300">
                                                                {t('editingFor', { email: admin.email })}
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={cancelEditing}
                                                            className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                                                        >
                                                            {t('cancelEdit')}
                                                        </button>
                                                    </div>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{t('editHint')}</p>

                                                    <form onSubmit={handleUpdate} className="mt-4 space-y-4">
                                                        <div>
                                                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                                                {t('emailLabel')}
                                                            </label>
                                                            <input
                                                                type="email"
                                                                required
                                                                value={editData.email}
                                                                onChange={(event) => setEditData('email', event.target.value)}
                                                                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-900/40"
                                                            />
                                                            {editErrors.email && (
                                                                <p className="mt-1 text-xs text-red-300">{editErrors.email}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                                                {t('passwordLabel')}
                                                            </label>
                                                            <div className="relative">
                                                                <input
                                                                    type={showEditPassword ? 'text' : 'password'}
                                                                    value={editData.password}
                                                                    onChange={(event) => setEditData('password', event.target.value)}
                                                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-900/40"
                                                                    placeholder="••••••••"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowEditPassword((prev) => !prev)}
                                                                    className="absolute inset-y-0 right-3 text-xs font-semibold text-slate-300 hover:text-white"
                                                                >
                                                                    {showEditPassword ? t('hide') : t('show')}
                                                                </button>
                                                            </div>
                                                            {editErrors.password && (
                                                                <p className="mt-1 text-xs text-red-300">{editErrors.password}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                                                {t('confirmPasswordLabel')}
                                                            </label>
                                                            <div className="relative">
                                                                <input
                                                                    type={showEditConfirmPassword ? 'text' : 'password'}
                                                                    value={editData.password_confirmation}
                                                                    onChange={(event) =>
                                                                        setEditData('password_confirmation', event.target.value)
                                                                    }
                                                                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-900/40"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowEditConfirmPassword((prev) => !prev)}
                                                                    className="absolute inset-y-0 right-3 text-xs font-semibold text-slate-300 hover:text-white"
                                                                >
                                                                    {showEditConfirmPassword ? t('hide') : t('show')}
                                                                </button>
                                                            </div>
                                                            {editErrors.password_confirmation && (
                                                                <p className="mt-1 text-xs text-red-300">
                                                                    {editErrors.password_confirmation}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <button
                                                            type="submit"
                                                            disabled={editProcessing}
                                                            className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                                        >
                                                            {editProcessing ? t('updatingButton') : t('updateButton')}
                                                        </button>
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="space-y-8">
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
                                            value={createData.email}
                                            onChange={(event) => setCreateData('email', event.target.value)}
                                            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-900/40"
                                            placeholder={t('emailPlaceholder')}
                                        />
                                        {createErrors.email && <p className="mt-1 text-xs text-red-400">{createErrors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                            {t('passwordLabel')}
                                        </label>
                                        <div className="relative">
                                            <input
                                            type={showCreatePassword ? 'text' : 'password'}
                                                required
                                                value={createData.password}
                                                onChange={(event) => setCreateData('password', event.target.value)}
                                                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-900/40"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCreatePassword((prev) => !prev)}
                                                className="absolute inset-y-0 right-3 text-xs font-semibold text-slate-300 hover:text-white"
                                            >
                                                {showCreatePassword ? t('hide') : t('show')}
                                            </button>
                                        </div>
                                        {createErrors.password && <p className="mt-1 text-xs text-red-400">{createErrors.password}</p>}
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                            {t('confirmPasswordLabel')}
                                        </label>
                                        <div className="relative">
                                            <input
                                            type={showCreateConfirmPassword ? 'text' : 'password'}
                                                required
                                                value={createData.password_confirmation}
                                                onChange={(event) => setCreateData('password_confirmation', event.target.value)}
                                                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-900/40"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCreateConfirmPassword((prev) => !prev)}
                                                className="absolute inset-y-0 right-3 text-xs font-semibold text-slate-300 hover:text-white"
                                            >
                                                {showCreateConfirmPassword ? t('hide') : t('show')}
                                            </button>
                                        </div>
                                        {createErrors.password_confirmation && (
                                            <p className="mt-1 text-xs text-red-400">{createErrors.password_confirmation}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={createProcessing}
                                        className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {createProcessing ? t('creatingButton') : t('createButton')}
                                    </button>
                                </form>
                            </div>

                            <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/50 p-6 text-sm text-slate-300 shadow-inner shadow-black/30">
                                <p className="text-base font-semibold text-white">{t('selectPromptTitle')}</p>
                                <p className="mt-1">{t('selectPromptBody')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Security.layout = (page: React.ReactNode) => <AdminLayout title="Security">{page}</AdminLayout>;
