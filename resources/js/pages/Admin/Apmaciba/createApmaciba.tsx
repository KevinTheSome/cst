import React from "react";
import { useForm, Link } from "@inertiajs/react";
import AdminLayout from '../../../Layouts/AdminLayout';
import {
  ArrowLeft,
  Link as LinkIcon,
  Calendar,
  Save,
  Loader2,
  AlignLeft,
  Globe,
  Clock,
  CheckCircle2
} from "lucide-react";

const CreateApmaciba: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm<Record<string, any>>({
    title: { lv: "", en: "" },
    description: "",
    url: "",
    starts_at: "",
    ends_at: "",
    is_active: true,
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post("/admin/trainings/store");
  }

  // Modern Input Styles
  // Using slate-900/50 for inputs to be slightly darker than the card (slate-800)
  const baseInputClass = "w-full bg-slate-900/50 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 block p-2.5 pl-10 transition-all duration-200 placeholder-slate-500 shadow-sm";
  const labelClass = "block mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider";

  return (
    // Removed 'bg-slate-900' and 'min-h-screen' so it uses the AdminLayout's bg-slate-950
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Create Training</h1>
            <p className="text-slate-400 mt-1 text-sm">Configure the details for a new educational event.</p>
          </div>
          <Link
            href="/admin/trainings"
            className="group flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to List
          </Link>
        </div>

        <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Card: Basic Info */}
            <div className="bg-slate-800 rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-700/50 flex items-center gap-2 bg-slate-800/50">
                <Globe className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-semibold text-white">Content Details</h3>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Titles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title LV */}
                  <div className="relative group">
                    <label className={labelClass}>Title (Latvian)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded">LV</span>
                      </div>
                      <input
                        type="text"
                        value={data.title.lv}
                        onChange={(e) => setData((d: any) => ({ ...d, title: { ...d.title, lv: e.target.value } }))}
                        className={`${baseInputClass} pl-12`}
                        placeholder="Apmācības nosaukums"
                      />
                    </div>
                    {errors["title.lv"] && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">Required field</p>}
                  </div>

                  {/* Title EN */}
                  <div className="relative group">
                    <label className={labelClass}>Title (English)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-[10px] font-bold bg-slate-700 text-slate-300 border border-slate-600 px-1.5 py-0.5 rounded">EN</span>
                      </div>
                      <input
                        type="text"
                        value={data.title.en}
                        onChange={(e) => setData((d: any) => ({ ...d, title: { ...d.title, en: e.target.value } }))}
                        className={`${baseInputClass} pl-12`}
                        placeholder="Training Title"
                      />
                    </div>
                    {errors["title.en"] && <p className="mt-1.5 text-xs text-rose-400">Required field</p>}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={labelClass}>Description</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <AlignLeft className="w-5 h-5 text-slate-500" />
                    </div>
                    <textarea
                      value={data.description}
                      onChange={(e) => setData((d: any) => ({ ...d, description: e.target.value }))}
                      rows={5}
                      className={`${baseInputClass} py-3 min-h-[140px] resize-y`}
                      placeholder="Enter a detailed description of the training module..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card: Link */}
            <div className="bg-slate-800 rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-700/50 flex items-center gap-2 bg-slate-800/50">
                <LinkIcon className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">External Resources</h3>
              </div>
              <div className="p-6">
                <div>
                  <label className={labelClass}>Resource URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <LinkIcon className="w-4 h-4 text-slate-500" />
                    </div>
                    <input
                      type="url"
                      value={data.url}
                      onChange={(e) => setData((d: any) => ({ ...d, url: e.target.value }))}
                      className={baseInputClass}
                      placeholder="https://example.com/training-materials"
                    />
                  </div>
                  {errors.url && <p className="mt-1.5 text-xs text-rose-400">{errors.url}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (Schedule & Actions) */}
          <div className="space-y-6">
            
            {/* Schedule Card */}
            <div className="bg-slate-800 rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-700/50 flex items-center gap-2 bg-slate-800/50">
                <Calendar className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-white">Scheduling</h3>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className={labelClass}>Start Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Clock className="w-4 h-4 text-slate-500" />
                    </div>
                    <input
                      type="datetime-local"
                      value={data.starts_at}
                      onChange={(e) => setData((d: any) => ({ ...d, starts_at: e.target.value }))}
                      className={`${baseInputClass} [color-scheme:dark]`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>End Date</label>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Clock className="w-4 h-4 text-slate-500" />
                    </div>
                    <input
                      type="datetime-local"
                      value={data.ends_at}
                      onChange={(e) => setData((d: any) => ({ ...d, ends_at: e.target.value }))}
                      className={`${baseInputClass} [color-scheme:dark]`}
                    />
                  </div>
                  {errors.ends_at && <p className="mt-1.5 text-xs text-rose-400">{errors.ends_at}</p>}
                </div>
              </div>
            </div>

            {/* Publication Card */}
            <div className="bg-slate-800 rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-700/50 flex items-center gap-2 bg-slate-800/50">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Status</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-slate-200 block">Published</span>
                    <span className="text-xs text-slate-500">Visible to students</span>
                  </div>
                  
                  {/* Modern Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={!!data.is_active}
                      onChange={(e) => setData((d: any) => ({ ...d, is_active: e.target.checked }))}
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-slate-900/30 border-t border-slate-700/50">
                <button
                  disabled={processing}
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {processing ? "Saving..." : "Create Training"}
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

(CreateApmaciba as any).layout = (page: React.ReactNode) => (
  <AdminLayout title="Create Training">{page}</AdminLayout>
);

export default CreateApmaciba;