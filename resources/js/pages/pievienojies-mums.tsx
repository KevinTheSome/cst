import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

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

    return '/contact';
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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(resolveContactRoute(), {
            preserveScroll: true,
            onSuccess: () => reset('name', 'email', 'subject', 'message', 'website'),
        });
    };

    const isDisabled = processing || !data.email.trim() || !data.message.trim();

    return (
        <>
            <Head title="Pievienojies mums" />

            <div className="bg-gradient-to-b from-[#eff5f3] via-[#ebf2ef] to-[#e0e8e4] py-20">
                <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 sm:px-8">
                    <header className="text-center">
                        <p className="text-sm uppercase tracking-[0.3em] text-green-700">Sazinies</p>
                        <h1 className="mt-2 text-3xl font-semibold text-[#1f513c] sm:text-4xl">Pievienojies mums</h1>
                        <p className="mt-4 text-lg text-[#3a4955]">
                            Aizpildi formu, un laboratorija saņems tavu ziņu pa e-pastu.
                        </p>
                    </header>

                    {recentlySuccessful && (
                        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
                            Paldies! Jūsu ziņa ir nosūtīta.
                        </div>
                    )}

                    {errorEntries.length > 0 && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                            <p className="font-semibold">Lūdzu, pārbaudiet ievadīto informāciju:</p>
                            <ul className="mt-2 list-inside list-disc space-y-1">
                                {errorEntries.map(([field, message]) => (
                                    <li key={field}>{message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="rounded-2xl bg-white/95 p-6 shadow-xl ring-1 ring-green-50 backdrop-blur-sm sm:p-10"
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

                        <div className="grid gap-6 sm:grid-cols-2">
                            <label className="flex flex-col text-left text-sm font-medium text-[#1f513c]">
                                Vārds un uzvārds
                                <input
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(event) => setData('name', event.target.value)}
                                    placeholder="Elīna Ozola"
                                    className="mt-2 rounded-xl border border-[#c4d9cf] bg-[#f8fbfa] px-4 py-3 text-base text-[#243038] outline-none transition focus:border-[#1f675b] focus:ring-2 focus:ring-[#99d5c8]"
                                    aria-invalid={Boolean(errors.name)}
                                />
                                {errors.name && <span className="mt-1 text-sm text-red-600">{errors.name}</span>}
                            </label>

                            <label className="flex flex-col text-left text-sm font-medium text-[#1f513c]">
                                E-pasts <span className="text-red-600">*</span>
                                <input
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(event) => setData('email', event.target.value)}
                                    placeholder="jusu.vards@example.com"
                                    className="mt-2 rounded-xl border border-[#c4d9cf] bg-[#f8fbfa] px-4 py-3 text-base text-[#243038] outline-none transition focus:border-[#1f675b] focus:ring-2 focus:ring-[#99d5c8]"
                                    aria-invalid={Boolean(errors.email)}
                                    required
                                />
                                {errors.email && <span className="mt-1 text-sm text-red-600">{errors.email}</span>}
                            </label>

                            <label className="sm:col-span-2 flex flex-col text-left text-sm font-medium text-[#1f513c]">
                                Temats
                                <input
                                    name="subject"
                                    type="text"
                                    value={data.subject}
                                    onChange={(event) => setData('subject', event.target.value)}
                                    placeholder="Par sadarbības iespējām"
                                    className="mt-2 rounded-xl border border-[#c4d9cf] bg-[#f8fbfa] px-4 py-3 text-base text-[#243038] outline-none transition focus:border-[#1f675b] focus:ring-2 focus:ring-[#99d5c8]"
                                    aria-invalid={Boolean(errors.subject)}
                                />
                                {errors.subject && <span className="mt-1 text-sm text-red-600">{errors.subject}</span>}
                            </label>

                            <label className="sm:col-span-2 flex flex-col text-left text-sm font-medium text-[#1f513c]">
                                Ziņa <span className="text-red-600">*</span>
                                <textarea
                                    name="message"
                                    rows={6}
                                    value={data.message}
                                    onChange={(event) => setData('message', event.target.value)}
                                    placeholder="Pastāsti par sevi vai ideju..."
                                    className="mt-2 rounded-xl border border-[#c4d9cf] bg-[#f8fbfa] px-4 py-3 text-base text-[#243038] outline-none transition focus:border-[#1f675b] focus:ring-2 focus:ring-[#99d5c8]"
                                    aria-invalid={Boolean(errors.message)}
                                    required
                                />
                                {errors.message && (
                                    <span className="mt-1 text-sm text-red-600">{errors.message}</span>
                                )}
                            </label>
                        </div>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-[#4f5e68]">Ziņa tiks nosūtīta uz laboratorijas e-pastu.</p>
                            <button
                                type="submit"
                                disabled={isDisabled}
                                className="inline-flex items-center justify-center rounded-full bg-[#1f675b] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[#1f675b]/40 transition hover:bg-[#1b5a50] disabled:cursor-not-allowed disabled:opacity-70"
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
