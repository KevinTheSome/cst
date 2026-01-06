import { useLang } from '@/hooks/useLang';
import { Link, useForm } from '@inertiajs/react';
import { AlignLeft, ArrowLeft, CheckCircle2, Globe, Link as LinkIcon, Loader2, Save } from 'lucide-react';
import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

const CreateApmaciba: React.FC = () => {
    const { __ } = useLang();

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

    const baseInputClass =
        'w-full bg-slate-900/50 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 block p-2.5 pl-10 transition-all duration-200 placeholder-slate-500 shadow-sm';

    const labelClass = 'block mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider';

    return (
        <div className="w-full px-4 py-8 font-sans text-slate-200 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            {__('training.create.pageTitle')}
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            {__('training.create.pageSubtitle')}
                        </p>
                    </div>

                    <Link
                        href="/admin/trainings"
                        className="group flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-700"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        {__('training.create.back')}
                    </Link>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* LEFT */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Content */}
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800 shadow-xl">
                            <div className="flex items-center gap-2 border-b border-slate-700/50 px-6 py-4">
                                <Globe className="h-4 w-4 text-indigo-400" />
                                <h3 className="text-sm font-semibold text-white">
                                    {__('training.create.contentDetails')}
                                </h3>
                            </div>

                            <div className="space-y-6 p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* LV */}
                                    <div>
                                        <label className={labelClass}>
                                            {__('training.create.titleLv')}
                                        </label>
                                        <input
                                            value={data.title.lv}
                                            onChange={(e) =>
                                                setData((d: any) => ({
                                                    ...d,
                                                    title: { ...d.title, lv: e.target.value },
                                                }))
                                            }
                                            className={`${baseInputClass} pl-12`}
                                            placeholder={__('training.create.titleLvPlaceholder')}
                                        />
                                        {errors['title.lv'] && (
                                            <p className="mt-1 text-xs text-rose-400">
                                                {__('training.create.required')}
                                            </p>
                                        )}
                                    </div>

                                    {/* EN */}
                                    <div>
                                        <label className={labelClass}>
                                            {__('training.create.titleEn')}
                                        </label>
                                        <input
                                            value={data.title.en}
                                            onChange={(e) =>
                                                setData((d: any) => ({
                                                    ...d,
                                                    title: { ...d.title, en: e.target.value },
                                                }))
                                            }
                                            className={`${baseInputClass} pl-12`}
                                            placeholder={__('training.create.titleEnPlaceholder')}
                                        />
                                        {errors['title.en'] && (
                                            <p className="mt-1 text-xs text-rose-400">
                                                {__('training.create.required')}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className={labelClass}>
                                        {__('training.create.description')}
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData((d: any) => ({ ...d, description: e.target.value }))
                                        }
                                        rows={5}
                                        className={`${baseInputClass} min-h-[140px] resize-y py-3`}
                                        placeholder={__('training.create.descriptionPlaceholder')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* URL */}
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800 shadow-xl">
                            <div className="flex items-center gap-2 border-b border-slate-700/50 px-6 py-4">
                                <LinkIcon className="h-4 w-4 text-emerald-400" />
                                <h3 className="text-sm font-semibold text-white">
                                    {__('training.create.externalResources')}
                                </h3>
                            </div>

                            <div className="p-6">
                                <label className={labelClass}>
                                    {__('training.create.resourceUrl')}
                                </label>
                                <input
                                    type="url"
                                    value={data.url}
                                    onChange={(e) =>
                                        setData((d: any) => ({ ...d, url: e.target.value }))
                                    }
                                    className={baseInputClass}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div>
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800 shadow-xl">
                            <div className="flex items-center gap-2 border-b border-slate-700/50 px-6 py-4">
                                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                                <h3 className="text-sm font-semibold text-white">
                                    {__('training.create.status')}
                                </h3>
                            </div>

                            <div className="p-6">
                                <span className="block text-sm">
                                    {__('training.create.published')}
                                </span>
                                <span className="text-xs text-slate-500">
                                    {__('training.create.publishedHint')}
                                </span>
                            </div>

                            <div className="border-t border-slate-700/50 p-4">
                                <button
                                    disabled={processing}
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-500"
                                >
                                    {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                    {processing
                                        ? __('training.create.saving')
                                        : __('training.create.create')}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
    <AdminLayout title={('training.create.layoutTitle')}>
        {children}
    </AdminLayout>
);

(CreateApmaciba as any).layout = (page: React.ReactNode) => <LayoutWrapper>{page}</LayoutWrapper>;

export default CreateApmaciba;
