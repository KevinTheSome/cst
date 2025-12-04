// resources/js/pages/Admin/Apmaciba/createApmaciba.tsx
import React from "react";
import { useForm, Link } from "@inertiajs/react";
import AdminLayout from '../../../Layouts/AdminLayout';

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

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Create Training</h1>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block">Title (LV)</label>
          <input
            value={data.title.lv}
            onChange={(e) => setData((d: any) => ({ ...d, title: { ...d.title, lv: e.target.value } }))}
            className="border p-2 w-full"
          />
          {errors["title.lv"] && <div className="text-red-600">{errors["title.lv"]}</div>}
        </div>

        <div>
          <label className="block">Title (EN)</label>
          <input
            value={data.title.en}
            onChange={(e) => setData((d: any) => ({ ...d, title: { ...d.title, en: e.target.value } }))}
            className="border p-2 w-full"
          />
          {errors["title.en"] && <div className="text-red-600">{errors["title.en"]}</div>}
        </div>

        <div>
          <label className="block">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => setData((d: any) => ({ ...d, description: e.target.value }))}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block">URL</label>
          <input
            value={data.url}
            onChange={(e) => setData((d: any) => ({ ...d, url: e.target.value }))}
            className="border p-2 w-full"
          />
          {errors.url && <div className="text-red-600">{errors.url}</div>}
        </div>

        <div>
          <label className="block">Starts At</label>
          <input
            type="datetime-local"
            value={data.starts_at}
            onChange={(e) => setData((d: any) => ({ ...d, starts_at: e.target.value }))}
            className="border p-2"
          />
        </div>

        <div>
          <label className="block">Ends At</label>
          <input
            type="datetime-local"
            value={data.ends_at}
            onChange={(e) => setData((d: any) => ({ ...d, ends_at: e.target.value }))}
            className="border p-2"
          />
          {errors.ends_at && <div className="text-red-600">{errors.ends_at}</div>}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="is_active"
            type="checkbox"
            checked={!!data.is_active}
            onChange={(e) => setData((d: any) => ({ ...d, is_active: e.target.checked }))}
          />
          <label htmlFor="is_active">Active</label>
        </div>

        <div>
          <button disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded">
            Create
          </button>
          <Link href="/admin/trainings" className="ml-3 text-sm text-gray-600">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};


(CreateApmaciba as any).layout = (page: React.ReactNode) => (
  <AdminLayout title="Create Training">{page}</AdminLayout>
);

export default CreateApmaciba;
