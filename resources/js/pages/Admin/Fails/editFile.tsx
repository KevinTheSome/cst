import React, { useState } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import AdminLayout from '../../../Layouts/AdminLayout';
import { ArrowLeft, Loader2, Upload } from "lucide-react";

export default function EditFile() {
    const { props } = usePage<any>();
    const file = props.file;

    // Local state for form fields
    const [titleLv, setTitleLv] = useState(file.title_lv ?? "");
    const [titleEn, setTitleEn] = useState(file.title_en ?? "");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const inputClass =
        "w-full pl-4 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all outline-none text-gray-100 placeholder-gray-400";
    const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

    function submit(e: React.FormEvent) {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append("title_lv", titleLv);
        formData.append("title_en", titleEn);

        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        // Method spoofing to allow PUT
        formData.append("_method", "PUT");

        router.post(`/admin/files/update/${file.id}`, formData, {
            preserveScroll: true,
            onSuccess: () => setProcessing(false),
            onError: (errs: any) => {
                setProcessing(false);
                setErrors(errs);
            },
        });
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
            <Head title="Edit File" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Edit File</h1>
                    <p className="text-sm text-gray-400 mt-1">Modify titles or replace the file</p>
                </div>

                <Link
                    href="/admin/files/show"
                    className="group flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back
                </Link>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
                <form onSubmit={submit}>
                    <div className="p-8 space-y-8">
                        {/* File Information */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Upload className="w-4 h-4 text-gray-500" />
                                File Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title LV */}
                                <div>
                                    <label className={labelClass}>Title (LV)</label>
                                    <input
                                        name="title_lv"
                                        value={titleLv}
                                        onChange={(e) => setTitleLv(e.target.value)}
                                        className={inputClass}
                                        placeholder="Title in Latvian"
                                    />
                                    {errors.title_lv && <p className="mt-1 text-sm text-red-400">{errors.title_lv}</p>}
                                </div>

                                {/* Title EN */}
                                <div>
                                    <label className={labelClass}>Title (EN)</label>
                                    <input
                                        name="title_en"
                                        value={titleEn}
                                        onChange={(e) => setTitleEn(e.target.value)}
                                        className={inputClass}
                                        placeholder="Title in English"
                                    />
                                    {errors.title_en && <p className="mt-1 text-sm text-red-400">{errors.title_en}</p>}
                                </div>
                            </div>
                        </div>

                        {/* File Upload (optional) */}
                        <div>
                            <label className={labelClass}>Replace File (optional)</label>
                            <input
                                name="file"
                                type="file"
                                accept=".csv,.txt,.pdf,.jpg,.jpeg,.png,.zip,.xlsx,.xls,.doc,.docx"
                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-100"
                            />
                            {errors.file && <p className="mt-1 text-sm text-red-400">{errors.file}</p>}
                            <p className="text-sm text-gray-400 mt-2">
                                Leave empty if you don't want to replace the file.
                            </p>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="bg-gray-800 px-8 py-5 border-t border-gray-700 flex items-center justify-end">
                        <Link
                            href="/admin/files"
                            className="mr-4 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            {processing ? "Updating..." : "Update File"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

(EditFile as any).layout = (page: React.ReactNode) => (
    <AdminLayout title="Edit File">{page}</AdminLayout>
);
