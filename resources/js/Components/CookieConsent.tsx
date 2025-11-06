import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'cookie_consent';

const CookieConsent = () => {
    const [visible, setVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const consent = Cookies.get(COOKIE_NAME);
        if (!consent) {
            setVisible(true);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const setConsent = (value: 'accepted' | 'declined') => {
        Cookies.set(COOKIE_NAME, value, { expires: 365 });
        setVisible(false);
        document.body.style.overflow = '';
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 px-3 md:px-6">
            <div className="flex h-[80vh] w-full max-w-4xl flex-col rounded-[32px] bg-white p-8 shadow-2xl md:p-10">
                <div className="flex-1 space-y-4 overflow-y-auto pr-1 md:space-y-5">
                    <h2 className="text-2xl font-semibold text-[#123626] md:text-3xl">
                        Sīkdatņu izmantošana
                    </h2>

                    <p className="text-sm leading-relaxed text-[#335547] md:text-base">
                        Mēs izmantojam sīkdatnes, lai nodrošinātu vietnes darbību, analizētu tās
                        izmantošanu un uzlabotu jūsu pieredzi. Varat izvēlēties piekrist vai
                        noraidīt papildu sīkdatnes. Obligātās sīkdatnes ir nepieciešamas, lai
                        vietne darbotos korekti.
                    </p>

                    <div className="mt-3 grid gap-4 rounded-3xl bg-[#f7faf8] p-4 text-sm text-[#335547] md:grid-cols-2 md:p-6">
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b4a37]">
                                Obligātās sīkdatnes
                            </h3>
                            <p className="mt-2 leading-relaxed">
                                Nepieciešamas lapas ielādei, drošībai, sesijām un pamatfunkcijām.
                                Bez tām vietne nevar funkcionēt.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b4a37]">
                                Analītika un uzlabojumi
                            </h3>
                            <p className="mt-2 leading-relaxed">
                                Palīdz saprast, kā jūs izmantojat vietni (piemēram, populārākās
                                lapas), lai varam to pilnveidot. Tiek iestatītas tikai ar jūsu
                                piekrišanu.
                            </p>
                        </div>
                    </div>

                    {/* Details toggle */}
                    <button
                        type="button"
                        onClick={() => setShowDetails((v) => !v)}
                        className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-[#1b4a37] underline-offset-4 hover:underline md:text-sm"
                    >
                        {showDetails ? 'Slēpt detalizētu informāciju' : 'Rādīt detalizētu informāciju'}
                        <span
                            aria-hidden="true"
                            className={`transition-transform ${showDetails ? 'rotate-180' : ''}`}
                        >
                            ▼
                        </span>
                    </button>

                    {showDetails && (
                        <div className="mt-3 rounded-2xl border border-[#dfe9e3] bg-[#fbfdfb] p-4 text-xs text-[#335547] md:text-sm">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1b4a37]">
                                Sīkdatņu saraksts
                            </h3>
                            <p className="mt-2 mb-3 leading-relaxed">
                                Zemāk ir redzams tipisks sīkdatņu saraksts, kas var tikt izmantots šajā vietnē.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-xs md:text-sm">
                                    <thead>
                                        <tr className="border-b border-[#e0ebe4]">
                                            <th className="py-2 pr-4 font-semibold text-[#1b4a37]">Nosaukums</th>
                                            <th className="py-2 pr-4 font-semibold text-[#1b4a37]">Tips</th>
                                            <th className="py-2 pr-4 font-semibold text-[#1b4a37]">Derīguma termiņš</th>
                                            <th className="py-2 pr-4 font-semibold text-[#1b4a37]">Apraksts</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-[#e0ebe4]/70">
                                            <td className="py-2 pr-4">XSRF-TOKEN</td>
                                            <td className="py-2 pr-4">Obligātā</td>
                                            <td className="py-2 pr-4">Sesija</td>
                                            <td className="py-2 pr-4">
                                                Nodrošina aizsardzību pret CSRF uzbrukumiem.
                                            </td>
                                        </tr>
                                        <tr className="border-b border-[#e0ebe4]/70">
                                            <td className="py-2 pr-4">laravel_session</td>
                                            <td className="py-2 pr-4">Obligātā</td>
                                            <td className="py-2 pr-4">Sesija</td>
                                            <td className="py-2 pr-4">
                                                Saglabā sesijas informāciju, lai jūs paliktu pieteicies.
                                            </td>
                                        </tr>
                                        <tr className="border-b border-[#e0ebe4]/70">
                                            <td className="py-2 pr-4">{COOKIE_NAME}</td>
                                            <td className="py-2 pr-4">Preferenču</td>
                                            <td className="py-2 pr-4">1 gads</td>
                                            <td className="py-2 pr-4">
                                                Saglabā jūsu izvēli par sīkdatņu izmantošanu (piekrīts vai noraidīts).
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 pr-4">_analytics_id</td>
                                            <td className="py-2 pr-4">Analītikas</td>
                                            <td className="py-2 pr-4">Līdz 2 gadiem</td>
                                            <td className="py-2 pr-4">
                                                Tiek izmantota anonīmai apmeklējumu statistikai (tiek iestatīta
                                                tikai ar jūsu piekrišanu).
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    <p className="text-xs leading-relaxed text-[#6a8578] md:text-sm">
                        Vēlāk savu izvēli varēsiet mainīt pārlūkprogrammas sīkdatņu iestatījumos.
                    </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-[#e0ebe4] pt-4 sm:flex-row sm:items-center sm:justify-end">
                    <button
                        type="button"
                        onClick={() => setConsent('declined')}
                        className="inline-flex items-center justify-center rounded-full border border-[#dfe9e3] px-7 py-2.5 text-sm font-medium text-[#1b4a37] shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#f1f6f3] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4a37]/40"
                    >
                        Nepiekrītu
                    </button>
                    <button
                        type="button"
                        onClick={() => setConsent('accepted')}
                        className="inline-flex items-center justify-center rounded-full bg-[#1b4a37] px-8 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#163b2c] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4a37]/60"
                    >
                        Piekrītu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
