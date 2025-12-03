import { Head, useForm } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';

// --- ICONS ---
const Icons = {
    Send: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
    ),
    Alert: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
    ),
    Check: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
    ),
    Mail: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
    )
};

type ContactForm = {
    name: string;
    email: string;
    subject: string;
    message: string;
    website: string;
};

type RouteAwareWindow = typeof window & {
    route?: (name: string, params?: Record<string, unknown>, absolute?: boolean) => string;
};

const resolveContactRoute = () => {
    if (typeof window !== 'undefined') {
        const maybeRoute = (window as RouteAwareWindow).route;
        if (typeof maybeRoute === 'function') {
            return maybeRoute('contact.store');
        }
    }
    return '/pievienojies-mums';
};

export default function PievienojiesMums() {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm<ContactForm>({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
    });
    const errorEntries = Object.entries(errors).filter(([, message]) => Boolean(message));
    const [clientError, setClientError] = useState<string | null>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!data.email.trim() || !data.message.trim()) {
            setClientError('Lūdzu, aizpildiet e-pasta adresi un ziņas saturu.');
            return;
        }

        setClientError(null);

        post(resolveContactRoute(), {
            preserveScroll: true,
            onSuccess: () => reset('name', 'email', 'subject', 'message', 'website'),
        });
    };

    const isDisabled = processing || !data.email.trim() || !data.message.trim();

    return (
        <>
            <Head title="Sazinies ar mums" />

            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
                
                {/* BACKGROUND TECH GRID */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-400 opacity-10 blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-sky-400 opacity-10 blur-[120px]"></div>
                </div>

                <div className="relative z-10 mx-auto min-h-screen flex flex-col justify-center max-w-4xl px-4 py-16 sm:px-6">
                    
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 backdrop-blur px-3 py-1 text-xs font-semibold text-emerald-700 mb-6">
                            <Icons.Mail className="h-4 w-4" />
                            Saziņas Forma
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
                            Sazinies ar mums
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Aizpildi formu un pastāsti, kā vari palīdzēt laboratorijai vai uzdod sev interesējošu jautājumu.
                        </p>
                    </div>

                    {/* Messages */}
                    <div className="space-y-4 mb-8">
                        {recentlySuccessful && (
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3 text-emerald-800 shadow-sm animate-fade-in">
                                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                    <Icons.Check className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-semibold">Ziņa nosūtīta!</p>
                                    <p className="text-sm">Paldies par saziņu. Mēs atbildēsim drīzumā.</p>
                                </div>
                            </div>
                        )}

                        {errorEntries.length > 0 && (
                            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 flex items-start gap-3 text-rose-800 shadow-sm animate-fade-in">
                                <Icons.Alert className="h-5 w-5 mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold">Lūdzu, pārbaudiet ievadīto informāciju:</p>
                                    <ul className="mt-1 list-disc list-inside text-sm">
                                        {errorEntries.map(([field, message]) => (
                                            <li key={field}>{message}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {clientError && (
                            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 flex items-center gap-3 text-orange-800 shadow-sm animate-fade-in">
                                <Icons.Alert className="h-5 w-5 shrink-0" />
                                <p className="text-sm font-medium">{clientError}</p>
                            </div>
                        )}
                    </div>

                    {/* Form Card */}
                    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
                            
                            {/* Honeypot */}
                            <input
                                type="text"
                                name="website"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                                tabIndex={-1}
                                autoComplete="off"
                                className="absolute h-0 w-0 opacity-0 pointer-events-none"
                                aria-hidden="true"
                            />

                            <div className="grid gap-8 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Vārds un Uzvārds</label>
                                    <input
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Jānis Bērziņš"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                        E-pasts <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="janis@example.com"
                                        required
                                        className={`w-full rounded-xl border px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                                            errors.email 
                                            ? 'border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' 
                                            : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                                        }`}
                                    />
                                </div>

                                <div className="sm:col-span-2 space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Temats</label>
                                    <input
                                        name="subject"
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Sadarbības piedāvājums..."
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                    />
                                </div>

                                <div className="sm:col-span-2 space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Ziņa <span className="text-rose-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={6}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Rakstiet savu ziņu šeit..."
                                        required
                                        className={`w-full rounded-xl border px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-y min-h-[120px] ${
                                            errors.message 
                                            ? 'border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500' 
                                            : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                                        }`}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
                                <p className="text-xs text-slate-500 text-center sm:text-left">
                                    * Jūsu dati tiks apstrādāti saskaņā ar privātuma politiku.
                                </p>
                                <button
                                    type="submit"
                                    disabled={isDisabled}
                                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                                >
                                    {processing ? 'Sūtām...' : <>Nosūtīt Ziņu <Icons.Send className="h-4 w-4" /></>}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            
            <style>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeInUp 0.4s ease-out forwards; }
            `}</style>
        </>
    );
}