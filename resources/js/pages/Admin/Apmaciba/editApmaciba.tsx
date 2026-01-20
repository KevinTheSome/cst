import { useLang } from '@/hooks/useLang';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { AlignLeft, ArrowLeft, Link as LinkIcon, Loader2, Save, Type } from 'lucide-react';
import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

const copy = {
    lv: {
        pageTitle: 'Rediģēt apmācību',
        pageSubtitle: 'Atjauniniet apmācības informāciju',
        back: 'Atpakaļ',
        basicInfo: 'Pamatinformācija',
        titleLv: 'Nosaukums (LV)',
        titleEn: 'Nosaukums (EN)',
        titleLvPlaceholder: 'Apmācības nosaukums',
        titleEnPlaceholder: 'Apmācības nosaukums angliski',
        description: 'Apraksts',
        descriptionPlaceholder: 'Ievadiet detalizētu aprakstu...',
        owner: 'Īpašnieks',
        ownerPlaceholder: 'Leniņš Ozols',
        externalResources: 'Ārējie resursi',
        externalUrl: 'Ārējais URL',
        activeStatus: 'Aktīvs statuss',
        activeHint: 'Redzams publiskajiem lietotājiem',
        cancel: 'Atcelt',
        saving: 'Saglabā...',
        save: 'Saglabāt',
        layoutTitle: 'Rediģēt apmācību',
    },
    en: {
        pageTitle: 'Edit Training',
        pageSubtitle: 'Update training details',
        back: 'Back',
        basicInfo: 'Basic Information',
        titleLv: 'Title (LV)',
        titleEn: 'Title (EN)',
        titleLvPlaceholder: 'Training title in Latvian',
        titleEnPlaceholder: 'Training Title',
        description: 'Description',
        descriptionPlaceholder: 'Enter detailed description...',
        owner: 'Owner',
        ownerPlaceholder: 'John Doe',
        externalResources: 'External Resources',
        externalUrl: 'External URL',
        activeStatus: 'Active Status',
        activeHint: 'Visible to public users',
        cancel: 'Cancel',
        saving: 'Saving...',
        save: 'Save',
        layoutTitle: 'Edit Training',
    },
} as const;

const EditApmaciba: React.FC = () => {
    const { locale } = useLang();
    const t = copy[locale === 'en' ? 'en' : 'lv'];

    const page = usePage<any>();
    const training = page.props.training ?? {};

    const { data, setData, put, processing, errors } = useForm<Record<string, any>>({
        title: {
            lv: training?.title?.lv ?? '',
            en: training?.title?.en ?? '',
        },
        owner: training?.owner ?? '',
        description: training?.description ?? '',
        url: training?.url ?? '',
        is_active: training?.is_active ?? true,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        router.post(`/admin/trainings/update/${training.id}`, data);
    }

    const inputClass =
        'w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all outline-none text-gray-100 placeholder-gray-400';
    const labelClass = 'block text-sm font-medium text-gray-300 mb-1.5';

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">{t.pageTitle}</h1>
                    <p className="mt-1 text-sm text-gray-400">{t.pageSubtitle}</p>
                </div>
                <Link
                    href="/admin/trainings"
                    className="group flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 shadow-sm transition-all hover:bg-gray-700 hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    {t.back}
                </Link>
            </div>

            {/* Card */}
            <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-sm">
                <form onSubmit={submit}>
                    <div className="space-y-8 p-8">
                        {/* Basic Info */}
                        <div>
                            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-200 uppercase">
                                <Type className="h-4 w-4 text-gray-500" />
                                {t.basicInfo}
                            </h3>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className={labelClass}>{t.titleLv}</label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="rounded bg-gray-600 px-1 text-xs font-bold text-gray-300">LV</span>
                                        </div>
                                        <input
                                            value={data.title.lv}
                                            onChange={(e) => setData((d: any) => ({ ...d, title: { ...d.title, lv: e.target.value } }))}
                                            className={inputClass}
                                            placeholder={t.titleLvPlaceholder}
                                        />
                                    </div>
                                    {errors['title.lv'] && <p className="mt-1 text-sm text-red-400">{errors['title.lv']}</p>}
                                </div>

                                <div>
                                    <label className={labelClass}>{t.titleEn}</label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="rounded bg-gray-600 px-1 text-xs font-bold text-gray-300">EN</span>
                                        </div>
                                        <input
                                            value={data.title.en}
                                            onChange={(e) => setData((d: any) => ({ ...d, title: { ...d.title, en: e.target.value } }))}
                                            className={inputClass}
                                            placeholder={t.titleEnPlaceholder}
                                        />
                                    </div>
                                    {errors['title.en'] && <p className="mt-1 text-sm text-red-400">{errors['title.en']}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className={labelClass}>{t.description}</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute top-3 left-3">
                                    <AlignLeft className="h-5 w-5 text-gray-500" />
                                </div>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData((d: any) => ({ ...d, description: e.target.value }))}
                                    className={`${inputClass} min-h-[120px] resize-y`}
                                    placeholder={t.descriptionPlaceholder}
                                />
                            </div>
                        </div>

                        {/* Owner */}
                                <div>
                                    <label className={labelClass}>
                                        {t.owner}
                                    </label>
                                    <textarea
                                        value={data.owner}
                                        onChange={(e) =>
                                            setData((d: any) => ({ ...d, owner: e.target.value }))
                                        }
                                        rows={1}
                                        className={`${inputClass} min-h-[20px] resize-y py-3`}
                                        placeholder={t.ownerPlaceholder}
                                    />
                                </div>

                        <hr className="border-gray-700" />

                        {/* Links */}
                        <div>
                            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-200 uppercase">
                                <LinkIcon className="h-4 w-4 text-gray-500" />
                                {t.externalResources}
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className={labelClass}>{t.externalUrl}</label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <LinkIcon className="h-4 w-4 text-gray-500" />
                                        </div>
                                        <input
                                            value={data.url}
                                            onChange={(e) => setData((d: any) => ({ ...d, url: e.target.value }))}
                                            className={inputClass}
                                            placeholder="https://example.com/training"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Active */}
                        <div className="flex items-center justify-between rounded-lg border border-gray-600 bg-gray-700/50 p-4">
                            <div>
                                <label htmlFor="is_active" className="font-medium text-gray-200">
                                    {t.activeStatus}
                                </label>
                                <p className="text-sm text-gray-400">{t.activeHint}</p>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={!!data.is_active}
                                    onChange={(e) => setData((d: any) => ({ ...d, is_active: e.target.checked }))}
                                    className="h-5 w-5 cursor-pointer rounded border-gray-500 bg-gray-700 text-green-600 focus:ring-green-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end border-t border-gray-700 bg-gray-800 px-8 py-5">
                        <Link href="/admin/trainings" className="mr-4 text-sm font-medium text-gray-400 transition-colors hover:text-gray-200">
                            {t.cancel}
                        </Link>
                        <button
                            disabled={processing}
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-green-700 focus:ring-4 focus:ring-green-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            {processing ? t.saving : t.save}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const { locale } = useLang();
    const t = copy[locale === 'en' ? 'en' : 'lv'];
    return <AdminLayout title={t.layoutTitle}>{children}</AdminLayout>;
};

(EditApmaciba as any).layout = (page: React.ReactNode) => <LayoutWrapper>{page}</LayoutWrapper>;

export default EditApmaciba;
