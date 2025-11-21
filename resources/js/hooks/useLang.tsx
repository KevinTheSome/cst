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

    // Safe fallbacks
    const lang: LangObject = rawLang || {};
    const locale: string = rawLocale || 'lv';

    function trans(key: string, replaces: Replaces | string = {}): string {
        const raw = getValueFromKey(key);

        // If key is missing, just return the key (helps debugging)
        if (typeof raw !== 'string') return key;

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

    function replacePlaceholders(text: string, replaces: Replaces): string {
        return Object.entries(replaces).reduce(
            (acc, [key, val]) => acc.replaceAll(`{${key}}`, String(val)),
            text,
        );
    }

    function getValueFromKey(key: string): string | undefined {
        const segments = key.split('.');
        let current: LangValue | undefined = lang;

        for (const segment of segments) {
            if (typeof current !== 'object' || current === null) return undefined;
            current = current[segment] as LangValue | undefined;
        }

        return typeof current === 'string' ? current : undefined;
    }

    return { trans, __, has, locale };
}
