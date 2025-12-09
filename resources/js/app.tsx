import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import type { ComponentType, ReactElement, ReactNode } from 'react';

import AppLayout from './Layouts/AppLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// ✅ Grab everything from BOTH possible folders + all common extensions
const modules = {
    ...import.meta.glob('./pages/**/*.{tsx,ts,jsx,js}'),
    ...import.meta.glob('./Pages/**/*.{tsx,ts,jsx,js}'),
};

function resolveInertiaPage(name: string) {
    const candidates = [
        `./pages/${name}.tsx`,
        `./pages/${name}.ts`,
        `./pages/${name}.jsx`,
        `./pages/${name}.js`,

        `./Pages/${name}.tsx`,
        `./Pages/${name}.ts`,
        `./Pages/${name}.jsx`,
        `./Pages/${name}.js`,
    ];

    for (const path of candidates) {
        if (modules[path]) {
            return modules[path] as any;
        }
    }

    throw new Error(`Page not found: ${name}. Tried: ${candidates.join(', ')}`);
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: async (name) => {
        const importer = resolveInertiaPage(name);
        const page = await importer();

        const PageComponent =
            (page as {
                default: ComponentType & {
                    layout?: (page: ReactNode) => ReactElement;
                };
            }).default;

        if (!PageComponent.layout) {
            PageComponent.layout = (pageContent: ReactNode) => (
                <AppLayout>{pageContent}</AppLayout>
            );
        }

        return page;
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },

    progress: {
        color: '#4B5563',
    },
});
