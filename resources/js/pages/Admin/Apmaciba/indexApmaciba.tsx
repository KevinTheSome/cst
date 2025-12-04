// resources/js/pages/Admin/Apmaciba/indexApmaciba.tsx
import React from "react";
import { Link, router, usePage } from "@inertiajs/react";
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
  trainings: Training[];
  filters: { q?: string };
};

const IndexApmaciba: React.FC = () => {
  const page = usePage<PageProps>();
  const trainings = page.props.trainings ?? [];
  const filters = page.props.filters ?? { q: "" };

  function handleDelete(id: number) {
    if (!confirm("Delete this training?")) return;
    router.delete(`/admin/trainings/destroy/${id}`);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Online Trainings</h1>
        <Link href="/admin/trainings/create" className="px-3 py-1 bg-blue-600 text-white rounded">
          Create
        </Link>
      </div>

      <form method="GET" action="/admin/trainings" className="mb-4">
        <input
          name="q"
          defaultValue={filters.q ?? ""}
          placeholder="Search..."
          className="border px-2 py-1 rounded w-64"
        />
        <button type="submit" className="ml-2 px-3 py-1 border rounded">
          Search
        </button>
      </form>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title (LV)</th>
            <th className="p-2 border">Starts</th>
            <th className="p-2 border">Active</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {trainings.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center">
                No trainings found.
              </td>
            </tr>
          ) : (
            trainings.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-2 border">{t.id}</td>
                <td className="p-2 border">{t.title?.lv ?? t.title?.en ?? "-"}</td>
                <td className="p-2 border">{t.starts_at ?? "-"}</td>
                <td className="p-2 border">{t.is_active ? "Yes" : "No"}</td>
                <td className="p-2 border">
                  <Link href={`/admin/trainings/show/${t.id}`} className="mr-3 text-blue-600">
                    View
                  </Link>
                  <Link href={`/admin/trainings/edit/${t.id}`} className="mr-3 text-green-600">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(t.id)} className="text-red-600" type="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Wrap in AdminLayout
(IndexApmaciba as any).layout = (page: React.ReactNode) => (
  <AdminLayout title="Online Trainings">{page}</AdminLayout>
);

export default IndexApmaciba;
