import { Link, useForm } from '@inertiajs/react';
import { AlignLeft, ArrowLeft, CheckCircle2, Globe, Link as LinkIcon, Loader2, Save } from 'lucide-react';
import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

const CreateApmaciba: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm<Record<string, any>>({
        title: { lv: '', en: '' },
        description: '',
        url: '',
        is_active: true,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/trainings/store');
    }

    // Modern Input Styles
    // Using slate-900/50 for inputs to be slightly darker than the card (slate-800)
    const baseInputClass =
        'w-full bg-slate-900/50 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 block p-2.5 pl-10 transition-all duration-200 placeholder-slate-500 shadow-sm';
    const labelClass = 'block mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider';

    return (
        // Removed 'bg-slate-900' and 'min-h-screen' so it uses the AdminLayout's bg-slate-950
        <div className="w-full px-4 py-8 font-sans text-slate-200 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                {/* Page Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Create Training</h1>
                        <p className="mt-1 text-sm text-slate-400">Configure the details for a new educational event.</p>
                    </div>
                    <Link
                        href="/admin/trainings"
                        className="group flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-700"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to List
                    </Link>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* LEFT COLUMN: Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Card: Basic Info */}
                        <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800 shadow-xl">
                            <div className="flex items-center gap-2 border-b border-slate-700/50 bg-slate-800/50 px-6 py-4">
                                <Globe className="h-4 w-4 text-indigo-400" />
                                <h3 className="text-sm font-semibold text-white">Content Details</h3>
                            </div>

                            <div className="space-y-6 p-6">
                                {/* Titles Grid */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Title LV */}
                                    <div className="group relative">
                                        <label className={labelClass}>Title (Latvian)</label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="rounded border border-indigo-500/20 bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-bold text-indigo-400">
                                                    LV
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                value={data.title.lv}
                                                onChange={(e) => setData((d: any) => ({ ...d, title: { ...d.title, lv: e.target.value } }))}
                                                className={`${baseInputClass} pl-12`}
                                                placeholder="Apmācības nosaukums"
                                            />
                                        </div>
                                        {errors['title.lv'] && <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">Required field</p>}
                                    </div>

                                    {/* Title EN */}
                                    <div className="group relative">
                                        <label className={labelClass}>Title (English)</label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="rounded border border-slate-600 bg-slate-700 px-1.5 py-0.5 text-[10px] font-bold text-slate-300">
                                                    EN
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                value={data.title.en}
                                                onChange={(e) => setData((d: any) => ({ ...d, title: { ...d.title, en: e.target.value } }))}
                                                className={`${baseInputClass} pl-12`}
                                                placeholder="Training Title"
                                            />
                                        </div>
                                        {errors['title.en'] && <p className="mt-1.5 text-xs text-rose-400">Required field</p>}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className={labelClass}>Description</label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute top-3 left-3">
                                            <AlignLeft className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData((d: any) => ({ ...d, description: e.target.value }))}
                                            rows={5}
                                            className={`${baseInputClass} min-h-[140px] resize-y py-3`}
                                            placeholder="Enter a detailed description of the training module..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card: Link */}
                        <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800 shadow-xl">
                            <div className="flex items-center gap-2 border-b border-slate-700/50 bg-slate-800/50 px-6 py-4">
                                <LinkIcon className="h-4 w-4 text-emerald-400" />
                                <h3 className="text-sm font-semibold text-white">External Resources</h3>
                            </div>
                            <div className="p-6">
                                <div>
                                    <label className={labelClass}>Resource URL</label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <LinkIcon className="h-4 w-4 text-slate-500" />
                                        </div>
                                        <input
                                            type="url"
                                            value={data.url}
                                            onChange={(e) => setData((d: any) => ({ ...d, url: e.target.value }))}
                                            className={baseInputClass}
                                            placeholder="https://example.com/training-materials"
                                        />
                                    </div>
                                    {errors.url && <p className="mt-1.5 text-xs text-rose-400">{errors.url}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Actions */}
                    <div className="space-y-6">
                        {/* Publication Card */}
                        <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800 shadow-xl">
                            <div className="flex items-center gap-2 border-b border-slate-700/50 bg-slate-800/50 px-6 py-4">
                                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                                <h3 className="text-sm font-semibold text-white">Status</h3>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="block text-sm font-medium text-slate-200">Published</span>
                                        <span className="text-xs text-slate-500">Visible to students</span>
                                    </div>

                                    {/* Modern Toggle Switch */}
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={!!data.is_active}
                                            onChange={(e) => setData((d: any) => ({ ...d, is_active: e.target.checked }))}
                                        />
                                        <div className="peer h-6 w-11 rounded-full bg-slate-700 peer-checked:bg-indigo-600 peer-focus:ring-4 peer-focus:ring-indigo-800 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="border-t border-slate-700/50 bg-slate-900/30 p-4">
                                <button
                                    disabled={processing}
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                    {processing ? 'Saving...' : 'Create Training'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

(CreateApmaciba as any).layout = (page: React.ReactNode) => <AdminLayout title="Create Training">{page}</AdminLayout>;

export default CreateApmaciba;
