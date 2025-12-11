import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Download, Edit, FileText, FolderOpen, Plus, Search, Trash } from 'lucide-react';
import AdminLayout from '../../../Layouts/AdminLayout';

type FileItem = {
  id: number;
  title_lv?: string | null;
  title_en?: string | null;
  path?: string | null;
  mime_type?: string | null;
  size?: number | null;
  tags?: Array<{ lv?: string; en?: string }>;
};

function formatBytes(bytes?: number | null) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatFileType(mime?: string | null) {
  if (!mime) return 'Unknown';
  const map: Record<string, string> = {
    'application/pdf': 'PDF Document',
    'application/msword': 'Word Document (.doc)',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document (.docx)',
    'application/vnd.ms-excel': 'Excel Spreadsheet (.xls)',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel Spreadsheet (.xlsx)',
    'image/png': 'PNG Image',
    'image/jpeg': 'JPEG Image',
    'image/jpg': 'JPEG Image',
    'image/webp': 'WebP Image',
    'text/plain': 'Text File',
    'application/zip': 'ZIP Archive',
    'application/vnd.ms-powerpoint': 'PowerPoint (.ppt)',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PowerPoint (.pptx)',
  };
  return map[mime] ?? (mime.split('/').pop()?.toUpperCase() || 'Unknown');
}

const AllFiles: React.FC = () => {
  const { props } = usePage<any>();
  const files: FileItem[] = props.files ?? [];

  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchFocused, setSearchFocused] = React.useState(false);

  const filteredFiles = React.useMemo(() => {
    const q = searchTerm.toLowerCase();
    return files.filter(
      (file) =>
        (file.title_lv ?? '').toLowerCase().includes(q) ||
        (file.title_en ?? '').toLowerCase().includes(q) ||
        (file.id?.toString() ?? '').includes(q)
    );
  }, [files, searchTerm]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-white">
              <FolderOpen className="h-8 w-8 text-emerald-400" />
              File Management
            </h1>
            <p className="mt-2 text-gray-400">Upload, organize and manage your stored files</p>
          </div>

          <Link
            href="/admin/files/upload"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2.5 font-medium text-white shadow-lg transition-all hover:from-emerald-700 hover:to-green-700 hover:shadow-emerald-500/25"
          >
            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
            Create New File
          </Link>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors ${
              searchFocused ? 'text-emerald-400' : 'text-gray-500'
            }`}
          >
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search files by title or ID..."
            className={`w-full rounded-lg border bg-gray-800 py-2.5 pr-4 pl-10 text-gray-100 placeholder-gray-500 transition-all outline-none ${
              searchFocused ? 'border-emerald-500/50 ring-2 ring-emerald-500/20' : 'border-gray-700 hover:border-gray-600'
            }`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-white"
            >
              <span className="text-sm leading-none">×</span>
            </button>
          )}
        </div>
      </div>

      {/* Files Grid */}
      <div className="space-y-4">
        {filteredFiles.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-700 bg-gray-800/50">
              <FileText className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              {searchTerm ? 'No files found' : 'No files uploaded yet'}
            </h3>
            <p className="mb-6 text-gray-400">
              {searchTerm
                ? `No files match "${searchTerm}". Try a different search term.`
                : 'Get started by uploading your first file.'}
            </p>
            {!searchTerm && (
              <Link
                href="/admin/files/upload"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2.5 font-medium text-white shadow-lg transition-all hover:from-emerald-700 hover:to-green-700 hover:shadow-emerald-500/25"
              >
                <Plus className="h-4 w-4" />
                Upload Your First File
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {searchTerm && (
              <div className="px-1 text-sm text-gray-400">
                Found {filteredFiles.length} {filteredFiles.length === 1 ? 'file' : 'files'} matching "
                {searchTerm}"
              </div>
            )}

            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="group rounded-xl border border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-800/30 p-6 transition-all hover:border-gray-600/50 hover:shadow-lg hover:shadow-black/20"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                        <FileText className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="space-y-1">
                          <p className="truncate text-lg font-semibold text-white">{file.title_lv || 'Untitled'}</p>
                          {file.title_en && <p className="truncate text-sm text-gray-400">{file.title_en}</p>}

                          {Array.isArray(file.tags) && file.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {file.tags.map((t, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-2 rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-200 border border-gray-600"
                                >
                                  <span className="font-medium">{t.lv ?? <span className="text-gray-400">—</span>}</span>
                                  <span className="text-gray-400">·</span>
                                  <span className="text-gray-300">{t.en ?? <span className="text-gray-500">—</span>}</span>
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                            <span className="rounded border border-gray-700/50 bg-gray-800/50 px-2 py-0.5 font-mono">
                              ID: {file.id}
                            </span>
                            <span className="rounded border border-gray-700/50 bg-gray-800/50 px-2 py-0.5 font-mono">
                              Type: {formatFileType(file.mime_type)}
                            </span>
                            <span className="rounded border border-gray-700/50 bg-gray-800/50 px-2 py-0.5 font-mono">
                              Size: {formatBytes(file.size)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 items-center gap-2">
                    {/* FIXED DOWNLOAD LINK */}
                    <a
                      href={`/admin/files/${file.id}/download`}
                      className="flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-400 transition-all hover:bg-blue-500/20 hover:text-blue-300"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download</span>
                    </a>

                    <Link
                      href={`/admin/files/${file.id}/edit`}
                      className="flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-2 text-sm font-medium text-yellow-400 transition-all hover:bg-yellow-500/20 hover:text-yellow-300"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </Link>

                    <Link
                      href={`/admin/files/${file.id}`}
                      method="delete"
                      as="button"
                      className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20 hover:text-red-300"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

(AllFiles as any).layout = (page: React.ReactNode) => <AdminLayout title="All Files">{page}</AdminLayout>;

export default AllFiles;
