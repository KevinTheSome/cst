import { router, usePage } from '@inertiajs/react';
import axios from 'axios';

type LanguageSwitcherProps = {
    className?: string;
};

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
    const { props } = usePage<any>();
    const currentLocale = props?.locale || 'lv';

    const getCsrfToken = () =>
        (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';

    const switchLanguage = async (locale: string) => {
        if (currentLocale === locale) return;
        try {
            const csrf = getCsrfToken();
            await axios.post('/locale', { locale }, { headers: { 'X-CSRF-TOKEN': csrf } });
            router.reload({ only: ['lang', 'locale'] });
        } catch (error) {
            console.error('Language switch failed:', error);
        }
    };

    const baseBtn =
        'rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500';

    return (
        <div className={`inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm ${className || ''}`}>
            <button
                type="button"
                onClick={() => switchLanguage('lv')}
                aria-pressed={currentLocale === 'lv'}
                disabled={currentLocale === 'lv'}
                className={`${baseBtn} ${currentLocale === 'lv' ? 'bg-emerald-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
                Latviešu
            </button>
            <button
                type="button"
                onClick={() => switchLanguage('en')}
                aria-pressed={currentLocale === 'en'}
                disabled={currentLocale === 'en'}
                className={`${baseBtn} ${currentLocale === 'en' ? 'bg-emerald-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
                English
            </button>
        </div>
    );
}
