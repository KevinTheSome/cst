// resources/js/pages/Admin/Apmaciba/editApmaciba.tsx
import React from "react";
import { usePage, useForm, Link } from "@inertiajs/react";
import AdminLayout from '../../../Layouts/AdminLayout';

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

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Edit Training</h1>

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
          <button disabled={processing} className="px-4 py-2 bg-green-600 text-white rounded">
            Save
          </button>
          <Link href="/admin/trainings" className="ml-3 text-sm text-gray-600">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

// Wrap in AdminLayout
(EditApmaciba as any).layout = (page: React.ReactNode) => (
  <AdminLayout title="Edit Training">{page}</AdminLayout>
);

export default EditApmaciba;
