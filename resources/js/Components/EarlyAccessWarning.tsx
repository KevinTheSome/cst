import { useLang } from '@/hooks/useLang';

type EarlyAccessWarningProps = {
    text?: string;
};

export default function EarlyAccessWarning({ text }: EarlyAccessWarningProps) {
    const { __ } = useLang();
    const resolvedText = text ?? __('head.early_access');
    return (
        <div className="fixed right-4 bottom-4 z-50">
            <div className="text-md rounded-xl border border-slate-200/60 bg-yellow-200 px-4 py-2 font-semibold text-slate-800 shadow-lg backdrop-blur">
                {resolvedText}
            </div>
        </div>
    );
}
