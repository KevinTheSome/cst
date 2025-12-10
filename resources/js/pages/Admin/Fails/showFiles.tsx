import React from "react";
import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Download, Edit, Trash } from "lucide-react";

export default function AllFiles() {
    const { props } = usePage<any>();
    const files = props.files ?? [];

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold text-white mb-6">Stored Files</h1>

            <div className="space-y-4">
                {files.length === 0 && (
                    <div className="text-gray-400 text-center py-8 bg-gray-800 border border-gray-700 rounded-lg">
                        No files uploaded yet.
                    </div>
                )}

                {files.map((file: any) => (
                    <div
                        key={file.id}
                        className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-sm"
                    >
                        {/* File info */}
                        <div>
                            <p className="text-lg font-semibold text-white">LV: {file.title_lv}</p>
                            <p className="text-sm text-gray-400">EN: {file.title_en}</p>
                            <p className="text-xs text-gray-500 mt-1">ID: {file.id}</p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-4 mt-4 sm:mt-0">
                            <a
                                href={`/admin/files/${file.id}/download`}
                                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </a>

                            <Link
                                href={`/admin/files/${file.id}/edit`}
                                className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition"
                            >
                                <Edit className="w-4 h-4" />
                                Edit
                            </Link>

                            <Link
                                href={`/admin/files/${file.id}`}
                                method="delete"
                                as="button"
                                className="flex items-center gap-1 text-red-400 hover:text-red-300 transition"
                            >
                                <Trash className="w-4 h-4" />
                                Delete
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

(AllFiles as any).layout = (page: React.ReactNode) => (
    <AdminLayout title="All Files">{page}</AdminLayout>
);
