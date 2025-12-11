import React from "react";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import AdminLayout from '../../../Layouts/AdminLayout';
import { ArrowLeft, Loader2, Upload } from "lucide-react";

function UploadFile() {
  const page = usePage<any>();

  // <-- IMPORTANT: your backend route lives under /admin (see routes/web.php)
  const postUrl = '/admin/files';

  const { data, setData, post, processing, errors, reset } = useForm({
    title_lv: '',
    title_en: '',
    file: null as File | null,
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title_lv', data.title_lv ?? '');
    formData.append('title_en', data.title_en ?? '');
    if (data.file) formData.append('file', data.file);

    post(postUrl, {
      forceFormData: true,
      onSuccess: () => {
        reset('file');
        const el = document.getElementById('file-input') as HTMLInputElement | null;
        if (el) el.value = '';
      },
    });
  }

  const inputClass =
    "w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all outline-none text-gray-100 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <Head title="Upload File" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Upload File</h1>
          <p className="text-sm text-gray-400 mt-1">Upload CSV, TXT, PDF, images and more</p>
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
            <div>
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Upload className="w-4 h-4 text-gray-500" />
                File Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Title (LV)</label>
                  <input
                    value={data.title_lv}
                    onChange={(e) => setData((d: any) => ({ ...d, title_lv: e.target.value }))}
                    className={inputClass}
                    placeholder="Title in Latvian"
                  />
                  {errors.title_lv && <p className="mt-1 text-sm text-red-400">{errors.title_lv}</p>}
                </div>

                <div>
                  <label className={labelClass}>Title (EN)</label>
                  <input
                    value={data.title_en}
                    onChange={(e) => setData((d: any) => ({ ...d, title_en: e.target.value }))}
                    className={inputClass}
                    placeholder="Title in English"
                  />
                  {errors.title_en && <p className="mt-1 text-sm text-red-400">{errors.title_en}</p>}
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>File</label>
              <div className="relative">
                <input
                  id="file-input"
                  type="file"
                  accept=".csv,.txt,.pdf,.jpg,.jpeg,.png,.zip,.xlsx,.xls,.doc,.docx"
                  onChange={(e) => setData('file', e.target.files?.[0] || null)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-100"
                />
              </div>
              {errors.file && <p className="mt-1 text-sm text-red-400">{errors.file}</p>}
              <p className="text-sm text-gray-400 mt-2">Allowed types: csv, txt, pdf, jpg, png, zip, xlsx, docx. Max 10 MB.</p>
            </div>
          </div>

          <div className="bg-gray-800 px-8 py-5 border-t border-gray-700 flex items-center justify-end">
            <Link href="/admin/files" className="mr-4 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors">
              Cancel
            </Link>

            <button
              disabled={processing}
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {processing ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// attach AdminLayout exactly like your example
(UploadFile as any).layout = (page: React.ReactNode) => (
  <AdminLayout title="Upload File">{page}</AdminLayout>
);

export default UploadFile;
