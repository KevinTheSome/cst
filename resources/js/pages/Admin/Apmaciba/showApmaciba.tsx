// resources/js/pages/Admin/Apmaciba/showApmaciba.tsx
import React from "react";
import { usePage, Link, router } from "@inertiajs/react";
import AdminLayout from '../../../Layouts/AdminLayout';

type Training = {
  id: number;
  title: { lv?: string | null; en?: string | null };
  description?: string | null;
  url?: string | null;
  starts_at?: string | null;
  ends_at?: string | null;
  is_active?: boolean;
};

type PageProps = {
  training: Training;
};

const ShowApmaciba: React.FC = () => {
  const page = usePage<PageProps>();
  const t = page.props.training;

  function destroy() {
    if (!confirm("Delete this training?")) return;
    router.delete(`/admin/trainings/destroy/${t.id}`);
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">{t.title?.lv ?? t.title?.en}</h1>

      <p className="mb-2">{t.description}</p>

      <div className="mb-2">
        <strong>Starts:</strong> {t.starts_at ?? "-"}
      </div>
      <div className="mb-2">
        <strong>Ends:</strong> {t.ends_at ?? "-"}
      </div>
      <div className="mb-4">
        <strong>Active:</strong> {t.is_active ? "Yes" : "No"}
      </div>

      {t.url && (
        <a href={t.url} target="_blank" rel="noreferrer" className="text-blue-600 mb-4 block">
          Open URL
        </a>
      )}

      <div className="flex gap-3">
        <Link href={`/admin/trainings/edit/${t.id}`} className="px-4 py-2 bg-green-600 text-white rounded">
          Edit
        </Link>

        <button onClick={destroy} className="px-4 py-2 bg-red-600 text-white rounded">
          Delete
        </button>

        <Link href="/admin/trainings" className="px-4 py-2 bg-gray-200 text-black rounded">
          Back
        </Link>
      </div>
    </div>
  );
};

// Wrap in AdminLayout
(ShowApmaciba as any).layout = (page: React.ReactNode) => (
  <AdminLayout title="Training Details">{page}</AdminLayout>
);

export default ShowApmaciba;
