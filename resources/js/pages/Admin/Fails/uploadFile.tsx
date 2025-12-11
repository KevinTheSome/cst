import React, { useState } from "react";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import AdminLayout from '../../../Layouts/AdminLayout';
import { ArrowLeft, Loader2, Upload, Plus, X } from "lucide-react";

type Tag = { lv: string; en: string };

function UploadFile() {
  const page = usePage<any>();
  // POST to admin-prefixed route
  const postUrl = '/admin/files';

  const { data, setData, post, processing, errors, reset } = useForm({
    title_lv: '',
    title_en: '',
    file: null as File | null,
    tags: [] as Tag[],
  });

  const [tagInput, setTagInput] = useState<Tag>({ lv: '', en: '' });

  function addTag(e?: React.FormEvent) {
    e?.preventDefault();
    const lv = (tagInput.lv || '').trim();
    const en = (tagInput.en || '').trim();
    if (!lv && !en) return;
    const newTags = [...data.tags, { lv, en }];
    setData('tags', newTags);
    setTagInput({ lv: '', en: '' });
  }

  function removeTag(idx: number) {
    const newTags = data.tags.filter((_, i) => i !== idx);
    setData('tags', newTags);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData('file', e.target.files?.[0] || null);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(postUrl, {
      forceFormData: true,
      onSuccess: () => {
        reset('file', 'title_lv', 'title_en', 'tags');
        setTagInput({ lv: '', en: '' });
        const el = document.getElementById('file-input') as HTMLInputElement | null;
        if (el) el.value = '';
      },
    });
  }

  const inputClass =
    "w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all outline-none text-gray-100 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <>
      <Head title="Upload File" />
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Upload File</h1>
            <p className="text-sm text-gray-400 mt-1">Upload CSV, TXT, PDF, images and tag them (LV/EN)</p>
          </div>

          <Link
            href="/admin/files/show"
            className="group flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Files
          </Link>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
          <form onSubmit={submit}>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Title (LV)</label>
                  <input
                    value={data.title_lv}
                    onChange={(e) => setData('title_lv', e.target.value)}
                    className={inputClass}
                    placeholder="Title in Latvian"
                  />
                  {errors.title_lv && <p className="mt-1 text-sm text-red-400">{errors.title_lv}</p>}
                </div>

                <div>
                  <label className={labelClass}>Title (EN)</label>
                  <input
                    value={data.title_en}
                    onChange={(e) => setData('title_en', e.target.value)}
                    className={inputClass}
                    placeholder="Title in English"
                  />
                  {errors.title_en && <p className="mt-1 text-sm text-red-400">{errors.title_en}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>File</label>
                <input
                  id="file-input"
                  type="file"
                  accept=".csv,.txt,.pdf,.jpg,.jpeg,.png,.zip,.xlsx,.xls,.doc,.docx"
                  onChange={onFileChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-100"
                />
                {errors.file && <p className="mt-1 text-sm text-red-400">{errors.file}</p>}
              </div>

              <div>
                <label className={labelClass}>Tags (LV / EN)</label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input
                    value={tagInput.lv}
                    onChange={(e) => setTagInput((t) => ({ ...t, lv: e.target.value }))}
                    placeholder="Tag (LV)"
                    className={inputClass}
                  />
                  <input
                    value={tagInput.en}
                    onChange={(e) => setTagInput((t) => ({ ...t, en: e.target.value }))}
                    placeholder="Tag (EN)"
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <button onClick={addTag} type="button" className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded">
                    <Plus className="w-4 h-4" /> Add Tag
                  </button>
                  <p className="text-sm text-gray-400">Add tag pairs — both LV and EN are recommended.</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {data.tags.length > 0 ? data.tags.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded border border-gray-600">
                      <div className="text-sm">
                        <div className="font-medium text-gray-100">{t.lv || <span className="text-gray-400">—</span>}</div>
                        <div className="text-xs text-gray-400">{t.en || <span className="text-gray-500">—</span>}</div>
                      </div>
                      <button type="button" onClick={() => removeTag(i)} className="p-1 rounded hover:bg-gray-600">
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  )) : <div className="text-sm text-gray-400">No tags added yet.</div>}
                </div>
              </div>
            </div>

            <div className="bg-gray-800 px-8 py-5 border-t border-gray-700 flex items-center justify-end">
              <Link href="/admin/files/show" className="mr-4 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors">
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
    </>
  );
}

(UploadFile as any).layout = (page: React.ReactNode) => (
  <AdminLayout title="Upload File">{page}</AdminLayout>
);

export default UploadFile;
