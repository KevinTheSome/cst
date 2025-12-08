import React from "react";
import { usePage, useForm, Link } from "@inertiajs/react";
import AdminLayout from '../../../Layouts/AdminLayout';
import { ArrowLeft, Calendar, Save, Loader2, AlignLeft, Type, Link as LinkIcon } from "lucide-react";

const EditApmaciba: React.FC = () => {
  const page = usePage<any>();
  const training = page.props.training ?? {};

  const { data, setData, put, processing, errors } = useForm<Record<string, any>>({
    title: {
      lv: training?.title?.lv ?? "",
      en: training?.title?.en ?? "",
    },
    description: training?.description ?? "",
    url: training?.url ?? "",
    starts_at: training?.starts_at ?? "",
    ends_at: training?.ends_at ?? "",
    is_active: training?.is_active ?? true,
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    put(`/admin/trainings/update/${training.id}`);
  }

  const inputClass =
    "w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all outline-none text-gray-100 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Edit Training</h1>
          <p className="text-sm text-gray-400 mt-1">Update training details</p>
        </div>
        <Link
          href="/admin/trainings"
          className="group flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Link>
      </div>

      {/* Card */}
      <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
        <form onSubmit={submit}>
          <div className="p-8 space-y-8">

            {/* Basic Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Type className="w-4 h-4 text-gray-500" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Title (LV)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-xs font-bold text-gray-300 bg-gray-600 px-1 rounded">LV</span>
                    </div>
                    <input
                      value={data.title.lv}
                      onChange={(e) => setData((d: any) => ({ ...d, title: { ...d.title, lv: e.target.value } }))}
                      className={inputClass}
                      placeholder="Apmācības nosaukums"
                    />
                  </div>
                  {errors["title.lv"] && <p className="mt-1 text-sm text-red-400">{errors["title.lv"]}</p>}
                </div>

                <div>
                  <label className={labelClass}>Title (EN)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-xs font-bold text-gray-300 bg-gray-600 px-1 rounded">EN</span>
                    </div>
                    <input
                      value={data.title.en}
                      onChange={(e) => setData((d: any) => ({ ...d, title: { ...d.title, en: e.target.value } }))}
                      className={inputClass}
                      placeholder="Training Title"
                    />
                  </div>
                  {errors["title.en"] && <p className="mt-1 text-sm text-red-400">{errors["title.en"]}</p>}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Description</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <AlignLeft className="w-5 h-5 text-gray-500" />
                </div>
                <textarea
                  value={data.description}
                  onChange={(e) => setData((d: any) => ({ ...d, description: e.target.value }))}
                  className={`${inputClass} min-h-[120px] resize-y`}
                  placeholder="Enter detailed description..."
                />
              </div>
            </div>

            <hr className="border-gray-700" />

            {/* Schedule & Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                Schedule & Links
              </h3>

              <div className="space-y-6">
                <div>
                  <label className={labelClass}>External URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="w-4 h-4 text-gray-500" />
                    </div>
                    <input
                      value={data.url}
                      onChange={(e) => setData((d: any) => ({ ...d, url: e.target.value }))}
                      className={inputClass}
                      placeholder="https://example.com/training"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Starts At</label>
                    <input
                      type="datetime-local"
                      value={data.starts_at}
                      onChange={(e) => setData((d: any) => ({ ...d, starts_at: e.target.value }))}
                      className={`${inputClass} pl-4 [color-scheme:dark]`}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Ends At</label>
                    <input
                      type="datetime-local"
                      value={data.ends_at}
                      onChange={(e) => setData((d: any) => ({ ...d, ends_at: e.target.value }))}
                      className={`${inputClass} pl-4 [color-scheme:dark]`}
                    />
                    {errors.ends_at && <p className="mt-1 text-sm text-red-400">{errors.ends_at}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Active */}
            <div className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between border border-gray-600">
              <div>
                <label htmlFor="is_active" className="font-medium text-gray-200">Active Status</label>
                <p className="text-sm text-gray-400">Visible to public users</p>
              </div>
              <div className="flex items-center">
                <input
                  id="is_active"
                  type="checkbox"
                  checked={!!data.is_active}
                  onChange={(e) => setData((d: any) => ({ ...d, is_active: e.target.checked }))}
                  className="w-5 h-5 text-green-600 bg-gray-700 border-gray-500 rounded focus:ring-green-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-800 px-8 py-5 border-t border-gray-700 flex items-center justify-end">
            <Link href="/admin/trainings" className="mr-4 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors">
              Cancel
            </Link>
            <button
              disabled={processing}
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {processing ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

(EditApmaciba as any).layout = (page: React.ReactNode) => (
  <AdminLayout title="Edit Training">{page}</AdminLayout>
);

export default EditApmaciba;
