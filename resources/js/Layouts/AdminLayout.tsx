import { Head } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';

interface AdminLayoutProps {
    title?: string;
}

export default function AdminLayout({ children, title = 'Admin Panel' }: PropsWithChildren<AdminLayoutProps>) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <Head title={title} />
            <main className="p-6">{children}</main>
        </>
    );
}
