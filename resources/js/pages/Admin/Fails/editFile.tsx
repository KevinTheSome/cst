import React, { useState, useEffect } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { ArrowLeft, Loader2, Upload, Plus, X } from "lucide-react";
import { useLang } from "@/hooks/useLang";

type Tag = { lv: string; en: string };

export default function EditFile() {
  const { __ } = useLang();

  const { props } = usePage<any>();
  const file = props.file;

  const [titleLv, setTitleLv] = useState(file.title_lv ?? "");
  const [titleEn, setTitleEn] = useState(file.title_en ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [tags, setTags] = useState<Tag[]>(Array.isArray(file.tags) ? file.tags : []);
  const [tagInput, setTagInput] = useState<Tag>({ lv: "", en: "" });

  useEffect(() => {
    if (Array.isArray(file.tags)) setTags(file.tags);
  }, [file.tags]);

  function addTag(e?: React.FormEvent) {
    e?.preventDefault();
    const lv = (tagInput.lv || "").trim();
    const en = (tagInput.en || "").trim();
    if (!lv && !en) return;
    setTags((t) => [...t, { lv, en }]);
    setTagInput({ lv: "", en: "" });
  }

  function removeTag(idx: number) {
    setTags((t) => t.filter((_, i) => i !== idx));
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedFile(e.target.files?.[0] || null);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    const formData = new FormData();
    formData.append("title_lv", titleLv);
    formData.append("title_en", titleEn);

    if (selectedFile) formData.append("file", selectedFile);

    tags.forEach((t, i) => {
      formData.append(`tags[${i}][lv]`, t.lv);
      formData.append(`tags[${i}][en]`, t.en);
    });

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

  const inputClass =
    "w-full pl-4 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all outline-none text-gray-100 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <Head title={__("files.edit.page_title") ?? "Edit File"} />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {__("files.edit.heading") ?? "Edit File"}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {__("files.edit.subheading") ?? "Modify titles, replace file or update tags"}
          </p>
        </div>

        <Link
          href="/admin/files/show"
          className="group flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {__("files.actions.back") ?? "Back"}
        </Link>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
        <form onSubmit={submit}>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>{__("files.fields.title_lv") ?? "Title (LV)"}</label>
                <input
                  name="title_lv"
                  value={titleLv}
                  onChange={(e) => setTitleLv(e.target.value)}
                  className={inputClass}
                  placeholder={__("files.placeholders.title_lv") ?? "Title in Latvian"}
                />
                {errors.title_lv && <p className="mt-1 text-sm text-red-400">{String(errors.title_lv)}</p>}
              </div>

              <div>
                <label className={labelClass}>{__("files.fields.title_en") ?? "Title (EN)"}</label>
                <input
                  name="title_en"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className={inputClass}
                  placeholder={__("files.placeholders.title_en") ?? "Title in English"}
                />
                {errors.title_en && <p className="mt-1 text-sm text-red-400">{String(errors.title_en)}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>{__("files.edit.replace_file") ?? "Replace File (optional)"}</label>
              <input
                name="file"
                type="file"
                accept=".csv,.txt,.pdf,.jpg,.jpeg,.png,.zip,.xlsx,.xls,.doc,.docx"
                onChange={onFileChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-100"
              />
              {errors.file && <p className="mt-1 text-sm text-red-400">{String(errors.file)}</p>}
            </div>

            <div>
              <label className={labelClass}>{__("files.fields.tags") ?? "Tags (LV / EN)"}</label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  value={tagInput.lv}
                  onChange={(e) => setTagInput((t) => ({ ...t, lv: e.target.value }))}
                  placeholder={__("files.placeholders.tag_lv") ?? "Tag (LV)"}
                  className={inputClass}
                />
                <input
                  value={tagInput.en}
                  onChange={(e) => setTagInput((t) => ({ ...t, en: e.target.value }))}
                  placeholder={__("files.placeholders.tag_en") ?? "Tag (EN)"}
                  className={inputClass}
                />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <button onClick={addTag} type="button" className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded">
                  <Plus className="w-4 h-4" /> {__("files.actions.add_tag") ?? "Add Tag"}
                </button>
                <p className="text-sm text-gray-400">{__("files.edit.tags_hint") ?? "Add tag pairs — both LV and EN recommended."}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.length > 0 ? (
                  tags.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded border border-gray-600">
                      <div className="text-sm">
                        <div className="font-medium text-gray-100">{t.lv || <span className="text-gray-400">—</span>}</div>
                        <div className="text-xs text-gray-400">{t.en || <span className="text-gray-500">—</span>}</div>
                      </div>
                      <button type="button" onClick={() => removeTag(i)} className="p-1 rounded hover:bg-gray-600" aria-label={__("files.actions.remove_tag") ?? "Remove tag"}>
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-400">{__("files.edit.no_tags") ?? "No tags yet."}</div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 px-8 py-5 border-t border-gray-700 flex items-center justify-end">
            <Link href="/admin/files/show" className="mr-4 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors">
              {__("files.actions.cancel") ?? "Cancel"}
            </Link>
            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {processing ? __("files.edit.updating") ?? "Updating..." : __("files.edit.submit") ?? "Update File"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

(EditFile as any).layout = (page: any) => {
  const t =
    page?.props?.lang?.files?.edit?.layout_title ||
    page?.props?.lang?.files?.edit?.page_title ||
    "Edit File";
  return <AdminLayout title={t}>{page}</AdminLayout>;
};
