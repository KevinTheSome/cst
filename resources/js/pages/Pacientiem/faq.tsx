import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const faqItems = [
    {
        question: 'Kas ir hroniskas slimības cilmes šūnu terapija?',
        answer:
            'Tā ir personalizēta terapija, kuras mērķis ir stimulēt organisma šūnu atjaunošanu un uzlabot funkcionalitāti ilgstošu slimību gadījumos.',
    },
    {
        question: 'Kā tiek sagatavotas cilmes šūnas?',
        answer:
            'Šūnas tiek izolētas, analizētas un “trenētas” mikrofluidikā, lai tās būtu drošas un efektīvas terapijas nodrošināšanai.',
    },
    {
        question: 'Vai terapija ir droša?',
        answer:
            'Jā, terapija tiek veikta saskaņā ar klīniski pārbaudītiem protokoliem un ārstu uzraudzībā.',
    },
    {
        question: 'Cik ilgs ir terapijas kurss?',
        answer:
            'Terapijas ilgums ir individuāls, balstoties uz pacienta veselības stāvokli un slimības smagumu.',
    },
];

function FAQItem({ item }: { item: { question: string; answer: string } }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:shadow-md">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between text-left text-slate-900"
            >
                <span className="font-semibold">{item.question}</span>
                <span className="text-emerald-500">{open ? '−' : '+'}</span>
            </button>
            {open && <p className="mt-3 text-sm text-slate-600">{item.answer}</p>}
        </div>
    );
}

export default function ChronicFAQ() {
    const { __ } = useLang();

    return (
        <>
            <Head title={__('Bieži uzdotie jautājumi')} />

            <section className="relative mx-auto max-w-4xl px-4 py-16 sm:px-8">
                <h2 className="text-3xl font-semibold text-slate-900 mb-6">Bieži uzdotie jautājumi par hronisku slimību terapiju</h2>
                <p className="text-slate-600 mb-10">
                    Šeit atradīsiet atbildes uz biežāk uzdotajiem jautājumiem par kronu cilmes šūnu terapiju.
                </p>

                <div className="grid gap-4">
                    {faqItems.map((item) => (
                        <FAQItem key={item.question} item={item} />
                    ))}
                </div>
            </section>
        </>
    );
}
