import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

type FAQItemType = {
    question: string;
    answer: string;
};

const faqItems: FAQItemType[] = [
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

function FAQItem({ item, index }: { item: FAQItemType; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="group rounded-2xl border border-slate-100 bg-white/80 p-4 sm:p-5 shadow-sm shadow-slate-200/70 backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={open}
            >
                <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-600 shadow-sm">
                        {index + 1}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900 sm:text-base">
                            {item.question}
                        </p>
                    </div>
                </div>

                <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-sm font-bold text-emerald-600 transition-transform ${
                        open ? 'rotate-180' : ''
                    }`}
                >
                    ⌃
                </span>
            </button>

            {open && (
                <div className="mt-3 pl-10 text-sm text-slate-600 sm:text-[0.95rem]">
                    {item.answer}
                </div>
            )}
        </div>
    );
}

export default function ChronicFAQ() {
    const { __ } = useLang();

    return (
        <>
            <Head title={__('Bieži uzdotie jautājumi')} />

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-white to-[#e7f7f1]">
                {/* Soft background orbs & grid */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 left-[-40px] h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
                    <div className="absolute top-1/3 right-[-60px] h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
                    <div className="absolute bottom-[-80px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-100/40 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#0f172a0d_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
                </div>

                <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    {/* Header */}
                    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-emerald-500 shadow-sm shadow-emerald-100/60">
                            FAQ
                            <span className="h-1 w-1 rounded-full bg-emerald-400" />
                            Cilmes šūnu terapija
                        </span>

                        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            Bieži uzdotie jautājumi
                        </h2>
                        <p className="mt-3 text-sm text-slate-600 sm:text-base">
                            Īsas un saprotamas atbildes par cilmes šūnu terapiju hronisku saslimšanu gadījumā –
                            lai Jūs justos droši un informēti.
                        </p>
                    </div>

                    {/* FAQ card wrapper */}
                    <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-xl shadow-slate-200/70 backdrop-blur-md sm:p-7 lg:p-8">
                        <div className="mb-4 flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Jautājumi par terapiju
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Ja Jums rodas vēl kādi jautājumi, konsultējieties ar savu ārstu vai mūsu
                                    speciālistiem.
                                </p>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Atbildēm ir informatīvs raksturs
                            </div>
                        </div>

                        <div className="space-y-3">
                            {faqItems.map((item, index) => (
                                <FAQItem key={item.question} item={item} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Small footer note */}
                    <p className="mt-6 text-center text-xs text-slate-400">
                        Šī informācija neaizstāj ārsta konsultāciju un individuālu medicīnisku izvērtējumu.
                    </p>
                </section>
            </div>
        </>
    );
}
