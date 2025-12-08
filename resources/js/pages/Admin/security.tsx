import { Head, router, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    Shield, 
    UserPlus, 
    Trash2, 
    Edit2, 
    X, 
    Check, 
    Eye, 
    EyeOff, 
    Mail, 
    Lock,
    AlertTriangle,
    ShieldCheck
} from 'lucide-react';

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

// --- Custom Modal Icon ---
const IconWarning = () => (
    <svg className="h-12 w-12 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

export default function Security({ admins, flash }: SecurityProps) {
    const { locale } = useLang();
    const lang = locale === 'en' ? 'en' : 'lv';
    const copy = {
        eyebrow: { lv: 'Drošība', en: 'Security' },
        title: { lv: 'Administratori', en: 'Administrators' },
        description: {
            lv: 'Pārvaldiet komandas piekļuvi un drošības uzstādījumus.',
            en: 'Manage team access and security credentials.',
        },
        existingTitle: { lv: 'Esošie administratori', en: 'Existing admins' },
        existingSubtitle: {
            lv: 'Aktīvie konti ar piekļuvi sistēmai.',
            en: 'Active accounts with system access.',
        },
        totalLabel: { lv: 'kopā', en: 'total' },
        emptyState: {
            lv: 'Vēl nav administratoru. Uzaiciniet pirmo kolēģi.',
            en: 'No admins yet. Invite your first teammate.',
        },
        addedLabel: { lv: 'Pievienots', en: 'Added' },
        addTitle: { lv: 'Pievienot administratoru', en: 'Add admin' },
        addSubtitle: {
            lv: 'Izveidojiet jaunu kontu.',
            en: 'Create a new account.',
        },
        emailLabel: { lv: 'E-pasts', en: 'Email' },
        emailPlaceholder: { lv: 'admin@postdock.com', en: 'admin@postdock.com' },
        passwordLabel: { lv: 'Parole', en: 'Password' },
        confirmPasswordLabel: { lv: 'Apstiprināt paroli', en: 'Confirm password' },
        createButton: { lv: 'Izveidot administratoru', en: 'Create admin' },
        creatingButton: { lv: 'Izveido...', en: 'Creating…' },
        deleteTitle: { lv: 'Dzēst administratoru?', en: 'Delete Admin?' },
        deleteBody: { 
            lv: 'Vai esat pārliecināts, ka vēlaties dzēst administratoru {email}? Šo darbību nevar atsaukt.', 
            en: 'Are you sure you want to delete admin {email}? This action cannot be undone.' 
        },
        editTitle: { lv: 'Rediģēt piekļuvi', en: 'Edit Access' },
        editSubtitle: {
            lv: 'Atjaunot e-pastu vai paroli.',
            en: 'Update email or rotate password.',
        },
        updateButton: { lv: 'Saglabāt izmaiņas', en: 'Save changes' },
        updatingButton: { lv: 'Saglabā...', en: 'Saving…' },
        cancelEdit: { lv: 'Atcelt', en: 'Cancel' },
        editHint: {
            lv: 'Atstājiet paroli tukšu, lai to nemainītu.',
            en: 'Leave password blank to keep current one.',
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

    // --- State & Forms ---
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
    
    // Editing State
    const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
    
    // Delete Modal State
    const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const sortedAdmins = useMemo(
        () => [...admins].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
        [admins],
    );

    // --- Handlers ---

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createPost('/admin/security', {
            preserveScroll: true,
            onSuccess: () => resetCreate('email', 'password', 'password_confirmation'),
        });
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        router.delete(`/admin/security/${deleteTarget.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setIsDeleting(false);
                setDeleteTarget(null);
            },
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
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <Head title="Security" />
            
            {/* --- Main Container --- */}
            <div className="mx-auto max-w-7xl space-y-8">
                
                {/* --- Header Card --- */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
                    <div className="relative z-10 flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{t('eyebrow')}</span>
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">{t('title')}</h1>
                            <p className="mt-2 text-slate-400 max-w-lg">{t('description')}</p>
                        </div>
                    </div>
                </div>

                {/* --- Flash Messages --- */}
                {(flash?.success || flash?.error) && (
                    <div className={`flex items-center gap-3 rounded-2xl border p-4 shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-top-4 ${
                        flash?.error 
                        ? 'border-red-500/30 bg-red-500/10 text-red-200' 
                        : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                    }`}>
                        {flash?.error ? <AlertTriangle className="h-5 w-5" /> : <Check className="h-5 w-5" />}
                        <span className="font-medium text-sm">{flash?.error ?? flash?.success}</span>
                    </div>
                )}

                {/* --- Content Grid --- */}
                <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
                    
                    {/* --- Left Column: Admin List --- */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <div>
                                <h2 className="text-xl font-bold text-white">{t('existingTitle')}</h2>
                                <p className="text-sm text-slate-400">{t('existingSubtitle')}</p>
                            </div>
                            <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-200 border border-white/10">
                                {admins.length} {t('totalLabel')}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {sortedAdmins.length === 0 ? (
                                <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/30 p-12 text-center text-slate-400">
                                    <Shield className="mx-auto h-12 w-12 opacity-20 mb-3" />
                                    <p>{t('emptyState')}</p>
                                </div>
                            ) : (
                                sortedAdmins.map((admin) => (
                                    <div 
                                        key={admin.id} 
                                        className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                                            editingAdmin?.id === admin.id
                                            ? 'border-emerald-500/50 bg-slate-900/80 shadow-emerald-500/10 shadow-lg'
                                            : 'border-white/5 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/60'
                                        }`}
                                    >
                                        {/* Normal State */}
                                        {editingAdmin?.id !== admin.id && (
                                            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-white font-bold shadow-inner">
                                                        {admin.email.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-white">{admin.email}</p>
                                                        <p className="text-xs text-slate-500 flex items-center gap-1">
                                                            {t('addedLabel')} {new Date(admin.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'lv-LV')}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
                                                    <button
                                                        onClick={() => startEditing(admin)}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                                                        title={t('editTitle')}
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteTarget(admin)}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                                                        title="Remove"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Edit State */}
                                        {editingAdmin?.id === admin.id && (
                                            <div className="p-6">
                                                <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                                                    <div className="flex items-center gap-2 text-emerald-400">
                                                        <Edit2 className="h-4 w-4" />
                                                        <h3 className="text-sm font-bold uppercase tracking-wider">{t('editTitle')}</h3>
                                                    </div>
                                                    <button onClick={cancelEditing} className="text-slate-400 hover:text-white transition-colors">
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </div>

                                                <form onSubmit={handleUpdate} className="space-y-5">
                                                    <div className="grid gap-5 sm:grid-cols-2">
                                                        <div>
                                                            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">{t('emailLabel')}</label>
                                                            <div className="relative">
                                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                                                <input
                                                                    type="email"
                                                                    required
                                                                    value={editData.email}
                                                                    onChange={(e) => setEditData('email', e.target.value)}
                                                                    className="w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 py-2.5 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                                                />
                                                            </div>
                                                            {editErrors.email && <p className="mt-1 text-xs text-rose-400">{editErrors.email}</p>}
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <div className="flex items-center justify-between">
                                                                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">{t('passwordLabel')}</label>
                                                                <span className="text-[10px] text-slate-500 italic">{t('editHint')}</span>
                                                            </div>
                                                            <div className="grid gap-3 sm:grid-cols-2">
                                                                <div className="relative">
                                                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                                                    <input
                                                                        type={showEditPassword ? 'text' : 'password'}
                                                                        value={editData.password}
                                                                        onChange={(e) => setEditData('password', e.target.value)}
                                                                        placeholder="New Password"
                                                                        className="w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-10 py-2.5 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                                                    />
                                                                    <button type="button" onClick={() => setShowEditPassword(!showEditPassword)} className="absolute right-3 top-3 text-slate-500 hover:text-white">
                                                                        {showEditPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                                    </button>
                                                                </div>
                                                                <div className="relative">
                                                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                                                    <input
                                                                        type={showEditConfirmPassword ? 'text' : 'password'}
                                                                        value={editData.password_confirmation}
                                                                        onChange={(e) => setEditData('password_confirmation', e.target.value)}
                                                                        placeholder="Confirm"
                                                                        className="w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-10 py-2.5 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                                                    />
                                                                </div>
                                                            </div>
                                                            {editErrors.password && <p className="mt-1 text-xs text-rose-400">{editErrors.password}</p>}
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-3 pt-2">
                                                        <button
                                                            type="submit"
                                                            disabled={editProcessing}
                                                            className="flex-1 rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-slate-900 hover:bg-emerald-400 disabled:opacity-50"
                                                        >
                                                            {editProcessing ? t('updatingButton') : t('updateButton')}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={cancelEditing}
                                                            className="rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                                                        >
                                                            {t('cancelEdit')}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* --- Right Column: Create Form --- */}
                    <div className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                                    <UserPlus className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">{t('addTitle')}</h2>
                                    <p className="text-xs text-slate-400">{t('addSubtitle')}</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">{t('emailLabel')}</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                        <input
                                            type="email"
                                            required
                                            value={createData.email}
                                            onChange={(e) => setCreateData('email', e.target.value)}
                                            placeholder={t('emailPlaceholder')}
                                            className="w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                        />
                                    </div>
                                    {createErrors.email && <p className="mt-1 text-xs text-rose-400">{createErrors.email}</p>}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">{t('passwordLabel')}</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                        <input
                                            type={showCreatePassword ? 'text' : 'password'}
                                            required
                                            value={createData.password}
                                            onChange={(e) => setCreateData('password', e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-10 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCreatePassword(!showCreatePassword)}
                                            className="absolute right-3 top-3 text-slate-500 hover:text-white"
                                        >
                                            {showCreatePassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {createErrors.password && <p className="mt-1 text-xs text-rose-400">{createErrors.password}</p>}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">{t('confirmPasswordLabel')}</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                        <input
                                            type={showCreateConfirmPassword ? 'text' : 'password'}
                                            required
                                            value={createData.password_confirmation}
                                            onChange={(e) => setCreateData('password_confirmation', e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-black/20 pl-10 pr-10 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCreateConfirmPassword(!showCreateConfirmPassword)}
                                            className="absolute right-3 top-3 text-slate-500 hover:text-white"
                                        >
                                            {showCreateConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={createProcessing}
                                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] hover:shadow-blue-500/30 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {createProcessing ? t('creatingButton') : t('createButton')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Delete Confirmation Modal --- */}
            {deleteTarget && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
                        onClick={() => !isDeleting && setDeleteTarget(null)}
                    />
                    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800/50">
                                <IconWarning />
                            </div>
                            
                            <h3 className="mb-2 text-xl font-bold text-white">
                                {t('deleteTitle')}
                            </h3>
                            
                            <p className="mb-6 text-sm text-slate-400 leading-relaxed">
                                {t('deleteBody', { email: deleteTarget.email })}
                            </p>

                            <div className="flex gap-3">
                                <button
                                    disabled={isDeleting}
                                    onClick={() => setDeleteTarget(null)}
                                    className="flex-1 rounded-xl border border-white/10 bg-transparent py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                                >
                                    {t('cancelEdit')}
                                </button>
                                <button
                                    disabled={isDeleting}
                                    onClick={confirmDelete}
                                    className="flex-1 rounded-xl bg-rose-500 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02] hover:bg-rose-600"
                                >
                                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Security.layout = (page: React.ReactNode) => <AdminLayout title="Security">{page}</AdminLayout>;