import React from "react";
import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Download, Edit, Trash } from "lucide-react";

function formatBytes(bytes: number | null | undefined) {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatFileType(mime?: string | null) {
    if (!mime) return "Unknown";
    const map: Record<string, string> = {
        "application/pdf": "PDF Document",
        "application/msword": "Word Document (.doc)",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            "Word Document (.docx)",
        "application/vnd.ms-excel": "Excel Spreadsheet (.xls)",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            "Excel Spreadsheet (.xlsx)",
        "image/png": "PNG Image",
        "image/jpeg": "JPEG Image",
        "image/jpg": "JPEG Image",
        "image/webp": "WebP Image",
        "text/plain": "Text File",
        "application/zip": "ZIP Archive",
        "application/vnd.ms-powerpoint": "PowerPoint (.ppt)",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            "PowerPoint (.pptx)",
    };

    // return a friendly name if available, otherwise a nicer fallback (extension or raw mime)
    return map[mime] ?? (mime.split("/").pop() ? mime.split("/").pop()?.toUpperCase() : mime);
}

export default function showFiles() {
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
                        <div className="flex-1">
                            <p className="text-lg font-semibold text-white">LV: {file.title_lv}</p>
                            <p className="text-sm text-gray-400">EN: {file.title_en}</p>
                            <p className="text-xs text-gray-500 mt-1">ID: {file.id}</p>

                            <div className="mt-2 text-xs text-gray-400 space-y-0.5">
                                <div>
                                    <span className="font-medium text-gray-300">Type:</span>{" "}
                                    <span className="text-gray-200">{formatFileType(file.mime_type)}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-300">Size:</span>{" "}
                                    <span className="text-gray-200">{formatBytes(file.size)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-4 mt-4 sm:mt-0">
                            <a
                                href={`/admin/files/${file.id}/download`}
                                target="_blank"
                                rel="noopener noreferrer"
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

(showFiles as any).layout = (page: React.ReactNode) => (
    <AdminLayout title="All Files">{page}</AdminLayout>
);
