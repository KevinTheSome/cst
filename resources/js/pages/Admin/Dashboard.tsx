import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Dashboard() {
    return (
        <>
            <Head title="Admin Dashboard" />
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <AdminLayout title="Admin Dashboard">{page}</AdminLayout>;
