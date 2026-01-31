import { useLang } from '@/hooks/useLang';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// --- ICONS ---
const Icons = {
    Plus: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
    ),
    Minus: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>
    ),
    Chat: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
    )
};

type FAQItemType = {
    question: string;
    answer: string;
};

const copy = {
    lv: {
        metaTitle: 'Bieži uzdotie jautājumi',
        badge: 'Atbalsta Centrs',
        title: 'Bieži uzdotie',
        titleHighlight: 'jautājumi',
        intro:
            'Atbildes uz populārākajiem jautājumiem par cilmes šūnu terapijas procesu, drošību un rezultātiem.',
        contactTitle: 'Neatradāt atbildi?',
        contactText: 'Mūsu speciālisti ir gatavi palīdzēt jums individuāli.',
        contactLink: 'Sazināties ar mums →',
        disclaimer: '* Šī informācija ir informatīva un neaizstāj ārsta konsultāciju.',
        items: [
            {
                question: 'Kas ir hroniskas slimības cilmes šūnu terapija?',
                answer:
                    'Tā ir personalizēta terapija, kuras mērķis ir stimulēt organisma šūnu atjaunošanu un uzlabot funkcionalitāti ilgstošu slimību gadījumos. Mēs izmantojam pacienta paša šūnas, lai mazinātu atgrūšanas risku.',
            },
            {
                question: 'Kā tiek sagatavotas cilmes šūnas?',
                answer:
                    'Šūnas tiek izolētas, analizētas un “trenētas” mikrofluidikā. Šis process notiek ISO klases tīrtelpās, nodrošinot augstāko drošības un efektivitātes līmeni pirms terapijas uzsākšanas.',
            },
            {
                question: 'Vai terapija ir droša?',
                answer:
                    'Jā, terapija tiek veikta saskaņā ar klīniski pārbaudītiem protokoliem un ārstu uzraudzībā. Pirms procedūras tiek veikta rūpīga pacienta veselības pārbaude.',
            },
            {
                question: 'Cik ilgs ir terapijas kurss?',
                answer:
                    'Terapijas ilgums ir individuāls, balstoties uz pacienta veselības stāvokli un slimības smagumu. Parasti tas ietver vienu procedūru un sekojošu uzraudzības periodu 3-6 mēnešu garumā.',
            },
        ] as FAQItemType[],
    },
    en: {
        metaTitle: 'Frequently Asked Questions',
        badge: 'Support Center',
        title: 'Frequently asked',
        titleHighlight: 'questions',
        intro:
            'Answers to the most common questions about the stem cell therapy process, safety, and results.',
        contactTitle: "Didn't find an answer?",
        contactText: 'Our specialists are ready to help you individually.',
        contactLink: 'Contact us →',
        disclaimer: "* This information is for informational purposes and does not replace a doctor's consultation.",
        items: [
            {
                question: 'What is stem cell therapy for chronic diseases?',
                answer:
                    "It is a personalized therapy aimed at stimulating the body's cell regeneration and improving function in long-term illnesses. We use the patient's own cells to reduce the risk of rejection.",
            },
            {
                question: 'How are stem cells prepared?',
                answer:
                    "Cells are isolated, analyzed, and 'trained' in microfluidics. This process takes place in ISO-class cleanrooms, ensuring the highest level of safety and effectiveness before therapy begins.",
            },
            {
                question: 'Is the therapy safe?',
                answer:
                    'Yes, the therapy is carried out under clinically validated protocols and physician supervision. A thorough health assessment is performed before the procedure.',
            },
            {
                question: 'How long is the course of therapy?',
                answer:
                    "The therapy duration is individual, based on the patient's health status and disease severity. Typically, it includes one procedure and a follow-up monitoring period of 3-6 months.",
            },
        ] as FAQItemType[],
    },
} as const;

function FAQItem({ item, index }: { item: FAQItemType; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <div 
            className={`group rounded-2xl border bg-white transition-all duration-300 ${
                open 
                ? 'border-violet-500 shadow-md ring-1 ring-violet-500/20' 
                : 'border-slate-200 shadow-sm hover:border-violet-300 hover:shadow-md'
            }`}
        >
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex w-full items-start justify-between gap-4 p-6 text-left"
                aria-expanded={open}
            >
                <div className="flex gap-4">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold transition-colors ${
                        open ? 'bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-500 group-hover:bg-violet-50 group-hover:text-violet-600'
                    }`}>
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <h3 className={`text-base font-semibold transition-colors ${
                        open ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                    }`}>
                        {item.question}
                    </h3>
                </div>

                <span className={`shrink-0 text-slate-400 transition-colors ${open ? 'text-violet-500' : 'group-hover:text-violet-500'}`}>
                    {open ? <Icons.Minus className="h-5 w-5" /> : <Icons.Plus className="h-5 w-5" />}
                </span>
            </button>

            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-6 pb-6 pt-0 ml-10 text-sm leading-relaxed text-slate-600">
                    {item.answer}
                </div>
            </div>
        </div>
    );
}

export default function ChronicFAQ() {
    const { locale } = useLang();
    const t = copy[locale === 'en' ? 'en' : 'lv'];

    return (
        <>
            <Head title={t.metaTitle} />

            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-violet-100 selection:text-violet-900">
                
                {/* BACKGROUND TECH GRID */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-violet-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-fuchsia-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    
                    {/* Header Badge */}
                    <div className="mb-8">
                         <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50/80 backdrop-blur px-3 py-1 text-xs font-semibold text-violet-700">
                            <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                            {t.badge}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* LEFT COLUMN: Context & Contact */}
                        <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">
                                {t.title} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                                    {t.titleHighlight}
                                </span>
                            </h1>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                {t.intro}
                            </p>

                            {/* Contact Card */}
                            <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10">
                                    <div className="h-10 w-10 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center mb-4">
                                        <Icons.Chat className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-slate-900">{t.contactTitle}</h4>
                                    <p className="text-sm text-slate-500 mt-2 mb-4">
                                        {t.contactText}
                                    </p>
                                    <a href="/ParMums/pievienojies-mums" className="text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-700 hover:underline">
                                        {t.contactLink}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: FAQ List */}
                        <div className="lg:col-span-8">
                            <div className="space-y-4">
                                {t.items.map((item, index) => (
                                    <FAQItem key={item.question} item={item} index={index} />
                                ))}
                            </div>

                            <div className="mt-8 border-t border-slate-200 pt-6">
                                <p className="text-xs text-slate-400 text-center sm:text-left">
                                    {t.disclaimer}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
