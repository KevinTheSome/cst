import { usePage } from '@inertiajs/react';

type Replaces = Record<string, string | number>;

type LangValue = string | LangObject;
type LangObject = Record<string, LangValue>;

interface SharedProps {
    lang?: LangObject;
    locale?: string;
}

export function useLang() {
    const { lang: rawLang, locale: rawLocale } = usePage<SharedProps>().props;

    const dictionary: LangObject = rawLang || {};
    const locale: string = rawLocale || 'lv';

    // ✅ many of your pages expect `lang`
    const lang = locale;

    function replacePlaceholders(text: string, replaces: Replaces): string {
        return Object.entries(replaces).reduce((acc, [key, val]) => {
            const v = String(val);
            // support both "{key}" and ":key"
            return acc.replaceAll(`{${key}}`, v).replaceAll(`:${key}`, v);
        }, text);
    }

    function getValueFromKey(key: string): string | undefined {
        const segments = key.split('.');
        let current: LangValue | undefined = dictionary;

        for (const segment of segments) {
            if (typeof current !== 'object' || current === null) return undefined;
            current = current[segment] as LangValue | undefined;
        }

        return typeof current === 'string' ? current : undefined;
    }

    function trans(key: string, replaces: Replaces | string = {}): string {
        const raw = getValueFromKey(key);

        if (typeof raw !== 'string') return key; // helps debugging

        let translated = raw;

        if (typeof replaces === 'string') {
            translated += ' ' + replaces;
        } else if (typeof replaces === 'object') {
            translated = replacePlaceholders(translated, replaces);
        }

        return translated;
    }

    function __(key: string, replaces: Replaces | string = {}): string {
        return trans(key, replaces);
    }

    function has(key: string): boolean {
        return getValueFromKey(key) !== undefined;
    }

    return { trans, __, has, locale, lang };
}
