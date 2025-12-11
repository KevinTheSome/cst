import { useLang } from '@/hooks/useLang';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

type Tag = {
    id: number;
    name_lv: string;
    name_en: string;
    name: string; // fallback
};

type DocumentItem = {
    id: number;
    title_lv: string;
    title_en: string;
    file_size: number;
    mime_type: string;
    created_at: string;
    download_url: string;
    tags: Tag[];
};

type PageProps = {
    documents: DocumentItem[];
};

function formatFileSize(bytes: number) {
    if (!bytes || bytes <= 0) return '—';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export default function DatabaseIndex() {
    const { __, locale } = useLang();
    const { props } = usePage<PageProps>();
    const documents = props.documents || [];

    // Helper function to get localized title
    const getLocalizedTitle = (doc: DocumentItem) => {
        if (locale === 'en' && doc.title_en) return doc.title_en;
        return doc.title_lv || doc.title_en || '';
    };

    // Helper function to get localized tag name
    const getLocalizedTagName = (tag: Tag) => {
        if (locale === 'en' && tag.name_en) return tag.name_en;
        return tag.name_lv || tag.name_en || tag.name || '';
    };

    const [searchTitle, setSearchTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // All unique tags for the filter bar
    const allTags = useMemo(() => {
        const map = new Map<string, Tag>();
        documents.forEach((doc) => {
            doc.tags?.forEach((tag) => {
                const tagName = getLocalizedTagName(tag);
                if (tagName && !map.has(tagName)) {
                    map.set(tagName, tag);
                }
            });
        });
        return Array.from(map.values()).sort((a, b) => {
            const nameA = getLocalizedTagName(a);
            const nameB = getLocalizedTagName(b);
            return nameA.localeCompare(nameB, locale);
        });
    }, [documents, locale]);

    const toggleTag = (tagName: string) => {
        setSelectedTags((prev) => (prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]));
    };

    const filteredDocuments = useMemo(() => {
        const search = searchTitle.trim().toLowerCase();

        return documents.filter((doc) => {
            const title = getLocalizedTitle(doc).toLowerCase();
            const titleMatch = !search || title.includes(search);

            const tagMatch =
                selectedTags.length === 0 || selectedTags.every((selectedTag) => doc.tags?.some((tag) => getLocalizedTagName(tag) === selectedTag));

            return titleMatch && tagMatch;
        });
    }, [documents, searchTitle, selectedTags, locale]);

    return (
        <>
            <Head title={__('Dokumentu datubāze')} />

            <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
                {/* Background like Welcome page */}
                <div className="pointer-events-none fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute top-0 right-0 left-0 -z-10 m-auto h-[260px] w-[260px] rounded-full bg-emerald-400 opacity-20 blur-[100px]" />
                    <div className="absolute right-0 bottom-0 -z-10 h-[360px] w-[360px] rounded-full bg-sky-400 opacity-10 blur-[120px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
                    {/* Header */}
                    <header className="mb-8 lg:mb-10">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">{__('Dokumentu datubāze')}</h1>
                        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                            {__('Pārlūkojiet dokumentus, filtrējiet pēc nosaukuma vai birkām un lejupielādējiet nepieciešamos failus.')}
                        </p>
                    </header>

                    {/* Search + filters */}
                    <section className="mb-8 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            {/* Title search */}
                            <div className="flex-1">
                                <label htmlFor="title-search" className="mb-1 block text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                    {__('Meklēt pēc nosaukuma (LV / EN)')}
                                </label>
                                <div className="relative">
                                    <input
                                        id="title-search"
                                        type="text"
                                        value={searchTitle}
                                        onChange={(e) => setSearchTitle(e.target.value)}
                                        placeholder={__('Piemēram, "ATMP", "Psoriāze"')}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 shadow-sm transition outline-none focus:border-emerald-400 focus:ring focus:ring-emerald-100"
                                    />
                                    <svg
                                        className="pointer-events-none absolute top-2.5 right-3 h-5 w-5 text-slate-400"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <circle cx="11" cy="11" r="6" />
                                        <path d="m16 16 3.5 3.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Count + clear */}
                            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                                <p className="text-xs text-slate-500">
                                    {__('Atrasti dokumenti')}: <span className="font-semibold text-slate-800">{filteredDocuments.length}</span>
                                </p>
                                {(searchTitle || selectedTags.length > 0) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearchTitle('');
                                            setSelectedTags([]);
                                        }}
                                        className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-rose-300 hover:text-rose-600 hover:shadow"
                                    >
                                        {__('Notīrīt filtrus')}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Tag chips */}
                        {allTags.length > 0 && (
                            <div className="mt-4">
                                <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">{__('Filter by tags')}</p>
                                <div className="flex flex-wrap gap-2">
                                    {allTags.map((tag) => {
                                        const tagName = getLocalizedTagName(tag);
                                        const active = selectedTags.includes(tagName);
                                        return (
                                            <button
                                                key={tag.id}
                                                type="button"
                                                onClick={() => toggleTag(tagName)}
                                                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition ${
                                                    active
                                                        ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm'
                                                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50'
                                                }`}
                                            >
                                                {tagName}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Table */}
                    <section className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm">
                        {filteredDocuments.length === 0 ? (
                            <div className="px-6 py-10 text-center text-sm text-slate-500">
                                {__('Nav neviena dokumenta, kas atbilst izvēlētajiem filtriem.')}
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                                    <thead className="bg-slate-50/80">
                                        <tr>
                                            <th className="px-6 py-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                                {__('Nosaukums')}
                                            </th>
                                            <th className="px-6 py-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">{__('Tags')}</th>
                                            <th className="px-6 py-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                                {__('Faila tips / izmērs')}
                                            </th>
                                            <th className="px-6 py-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                                {__('Pievienots')}
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                                {__('Lejupielāde')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredDocuments.map((doc) => (
                                            <tr key={doc.id} className="transition hover:bg-emerald-50/40">
                                                {/* Titles */}
                                                <td className="px-6 py-4 align-top">
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="text-sm font-semibold text-slate-900">{getLocalizedTitle(doc) || '—'}</span>
                                                        {doc.title_lv && doc.title_en && (
                                                            <span className="text-xs text-slate-500">
                                                                {locale === 'en' ? doc.title_lv : doc.title_en}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Tags */}
                                                <td className="px-6 py-4 align-top">
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {doc.tags?.length ? (
                                                            doc.tags.map((tag) => (
                                                                <span
                                                                    key={tag.id}
                                                                    className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700"
                                                                >
                                                                    {getLocalizedTagName(tag)}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-xs text-slate-400">{__('No tags')}</span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Type / size */}
                                                <td className="px-6 py-4 align-top">
                                                    <div className="flex flex-col gap-0.5 text-xs text-slate-600">
                                                        <span>{doc.mime_type || '—'}</span>
                                                        <span className="text-slate-500">{formatFileSize(doc.file_size)}</span>
                                                    </div>
                                                </td>

                                                {/* Created at */}
                                                <td className="px-6 py-4 align-top text-xs text-slate-600">
                                                    {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : '—'}
                                                </td>

                                                {/* Download */}
                                                <td className="px-6 py-4 text-right align-top">
                                                    {doc.download_url ? (
                                                        <a
                                                            href={doc.download_url}
                                                            className="inline-flex items-center rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md"
                                                        >
                                                            {__('Lejupielādēt')}
                                                            <svg
                                                                className="ml-1.5 h-4 w-4"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                            >
                                                                <path d="M12 3v12m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M5 19h14" strokeLinecap="round" />
                                                            </svg>
                                                        </a>
                                                    ) : (
                                                        <span className="text-xs text-slate-400">{__('Nav pieejama saite')}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
}
