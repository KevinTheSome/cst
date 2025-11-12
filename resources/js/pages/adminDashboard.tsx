import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout';

interface StatCard {
    title: string;
    value: string | number;
    change?: string;
    changeType?: 'increase' | 'decrease';
    icon: React.ReactNode;
}

interface ActivityItem {
    id: number;
    action: string;
    user: string;
    time: string;
}

interface QuickAction {
    label: string;
    href: string;
    color: string;
}

export default function AdminDashboard() {
    const [data, setData] = useState({
        stats: [] as StatCard[],
        recentActivity: [] as ActivityItem[],
        quickActions: [
            { label: 'Add New User', href: '/admin/users/create', color: 'bg-blue-500' },
            { label: 'Create Project', href: '/admin/projects/create', color: 'bg-green-500' },
            { label: 'View Contacts', href: '/admin/contacts', color: 'bg-purple-500' },
            { label: 'Manage Settings', href: '/admin/settings', color: 'bg-gray-500' },
        ] as QuickAction[],
    });

    useEffect(() => {
        // Mock data - replace with actual API calls
        setData({
            stats: [
                {
                    title: 'Total Users',
                    value: '1,234',
                    change: '+12%',
                    changeType: 'increase',
                    icon: (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    ),
                },
                {
                    title: 'Active Projects',
                    value: '42',
                    change: '+5%',
                    changeType: 'increase',
                    icon: (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                        </svg>
                    ),
                },
                {
                    title: 'New Contacts',
                    value: '89',
                    change: '-3%',
                    changeType: 'decrease',
                    icon: (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    ),
                },
                {
                    title: 'Publications',
                    value: '156',
                    change: '+18%',
                    changeType: 'increase',
                    icon: (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                    ),
                },
            ],
            recentActivity: [
                { id: 1, action: 'New user registration', user: 'John Doe', time: '2 hours ago' },
                { id: 2, action: 'Project updated', user: 'Jane Smith', time: '4 hours ago' },
                { id: 3, action: 'New contact message', user: 'Bob Johnson', time: '6 hours ago' },
                { id: 4, action: 'Publication added', user: 'Alice Brown', time: '1 day ago' },
            ],
            quickActions: [
                { label: 'Add New User', href: '/admin/users/create', color: 'bg-blue-500' },
                { label: 'Create Project', href: '/admin/projects/create', color: 'bg-green-500' },
                { label: 'View Contacts', href: '/admin/contacts', color: 'bg-purple-500' },
                { label: 'Manage Settings', href: '/admin/settings', color: 'bg-gray-500' },
            ],
        });
    }, []);

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Welcome to your admin dashboard. Here's what's happening with your site today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {data.stats.map((stat, index) => (
                        <div key={index} className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                    {stat.change && (
                                        <p className={`mt-2 text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                            {stat.change} from last month
                                        </p>
                                    )}
                                </div>
                                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                                    <div className="text-blue-600 dark:text-blue-400">{stat.icon}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {data.quickActions.map((action, index) => (
                            <a
                                key={index}
                                href={action.href}
                                className={`${action.color} flex items-center justify-center rounded-lg px-4 py-3 text-center text-white transition-colors duration-200 hover:opacity-90`}
                            >
                                {action.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
                    <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.recentActivity.map((activity) => (
                            <div key={activity.id} className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">by {activity.user}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Status */}
                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">System Status</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-center space-x-3">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">API Server</span>
                            <span className="text-sm text-green-600">Operational</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Database</span>
                            <span className="text-sm text-green-600">Operational</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Storage</span>
                            <span className="text-sm text-yellow-600">Warning</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = (page: React.ReactNode) => <AdminLayout title="Admin Dashboard">{page}</AdminLayout>;
