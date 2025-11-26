import { Head, useForm } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';

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

    const gradientBackground = 'bg-gradient-to-br from-[#ecf1ff] via-[#f6fbf8] to-[#eef8f0]';

    return (
        <>
            <Head title="Sazinies ar mums" />

            <div className={`relative min-h-screen overflow-hidden ${gradientBackground} py-20`}>
                <div className="absolute inset-0 opacity-60">
                    <div className="absolute -top-10 right-[-80px] h-60 w-60 rounded-full bg-[#c6d8ff] blur-3xl" />
                    <div className="absolute bottom-10 left-[-60px] h-72 w-72 rounded-full bg-[#adefd1] blur-3xl" />
                </div>

                <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 sm:px-8">
                    <header className="text-center">
                        <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">Sazinies</p>
                        <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">Pievienojies mums</h1>
                        <p className="mt-4 text-lg text-slate-600">
                            Aizpildi formu un pastāsti, kā vari palīdzēt laboratorijai. Atbildēsim uz e-pastu tiklīdz iespējams.
                        </p>
                    </header>

                    {recentlySuccessful && (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 shadow">
                            Paldies! Jūsu ziņa ir nosūtīta.
                        </div>
                    )}

                    {errorEntries.length > 0 && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 shadow">
                            <p className="font-semibold">Lūdzu, pārbaudiet ievadīto informāciju:</p>
                            <ul className="mt-2 list-inside list-disc space-y-1">
                                {errorEntries.map(([field, message]) => (
                                    <li key={field}>{message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {clientError && (
                        <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900 shadow">
                            {clientError}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-2xl shadow-slate-200 backdrop-blur-md sm:p-12"
                    >
                        <input
                            type="text"
                            name="website"
                            value={data.website}
                            onChange={(event) => setData('website', event.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                            className="absolute h-0 w-0 opacity-0"
                            aria-hidden="true"
                        />

                        <div className="grid gap-8 sm:grid-cols-2">
                            <label className="flex flex-col text-left text-sm font-semibold text-slate-700">
                                Vārds un uzvārds
                                <input
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(event) => setData('name', event.target.value)}
                                    placeholder="Elīna Ozola"
                                    className="mt-2 rounded-2xl border border-slate-200 bg-white/60 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                    aria-invalid={Boolean(errors.name)}
                                />
                                {errors.name && <span className="mt-1 text-sm text-red-600">{errors.name}</span>}
                            </label>

                            <label className="flex flex-col text-left text-sm font-semibold text-slate-700">
                                E-pasts <span className="text-red-600">*</span>
                                <input
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(event) => setData('email', event.target.value)}
                                    placeholder="jusu.vards@example.com"
                                    className="mt-2 rounded-2xl border border-slate-200 bg-white/60 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                    aria-invalid={Boolean(errors.email)}
                                    required
                                />
                                {errors.email && <span className="mt-1 text-sm text-red-600">{errors.email}</span>}
                            </label>

                            <label className="sm:col-span-2 flex flex-col text-left text-sm font-semibold text-slate-700">
                                Temats
                                <input
                                    name="subject"
                                    type="text"
                                    value={data.subject}
                                    onChange={(event) => setData('subject', event.target.value)}
                                    placeholder="Par sadarbības iespējām"
                                    className="mt-2 rounded-2xl border border-slate-200 bg-white/60 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                    aria-invalid={Boolean(errors.subject)}
                                />
                                {errors.subject && <span className="mt-1 text-sm text-red-600">{errors.subject}</span>}
                            </label>

                            <label className="sm:col-span-2 flex flex-col text-left text-sm font-semibold text-slate-700">
                                Ziņa <span className="text-red-600">*</span>
                                <textarea
                                    name="message"
                                    rows={6}
                                    value={data.message}
                                    onChange={(event) => setData('message', event.target.value)}
                                    placeholder="Pastāsti par sevi vai ideju..."
                                    className="mt-2 rounded-2xl border border-slate-200 bg-white/60 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                    aria-invalid={Boolean(errors.message)}
                                    required
                                />
                                {errors.message && (
                                    <span className="mt-1 text-sm text-red-600">{errors.message}</span>
                                )}
                            </label>
                        </div>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-slate-600">Ziņa tiks nosūtīta uz laboratorijas e-pastu uldis.berzins_4@rtu.lv.</p>
                            <button
                                type="submit"
                                disabled={isDisabled}
                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/40 transition hover:from-emerald-700 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? 'Sūtām...' : 'Nosūtīt ziņu'}
                            </button>
                        </div>
                        {/* TODO: Pievieno reCAPTCHA v3/hCaptcha un izmanto ShouldQueue e-pasta rindām produkcijā. */}
                    </form>
                </div>
            </div>
        </>
    );
}
