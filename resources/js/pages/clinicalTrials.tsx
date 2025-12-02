
import { Head } from '@inertiajs/react';
import { useLang } from '@/hooks/useLang';

export default function ClinicalTrials() {
    const { __ } = useLang();

    const trials = [
        {
            condition: __('Psoriāze'),
            summary: __(
                'MSC terapijas pētījumos novērots iekaisuma mazinājums, T-šūnu aktivitātes normalizācija un ādas bojājumu samazināšanās. Drošības profils līdz šim labs, ar minimālām blaknēm.'
            ),
            dataPoints: [
                __('Klīniskie pētījumi: 9+ starptautiski'),
                __('PASI samazinājums: līdz 87% 4 nedēļās'),
                __('Mehānisms: IL-10, TGF-β, PGE2 sekrēcija'),
                __('Ilgtermiņa efekts: uzlabota atbildreakcija uz biologiem'),
                __('Drošība: nav būtisku blakņu (meta-analīze, 42 RCT)'),
                __('Tendence: MSC-izcelsmes eksosomas ar līdzīgu efektu'),
            ],
        },
        {
            condition: __('Krona slimība'),
            summary: __(
                'MSC terapijas pacientiem ar iekaisīgām zarnu slimībām demonstrē spēju mazināt audu bojājumu un normalizēt imūnreakciju. Daļai pacientu remisija 3–6 mēnešu laikā.'
            ),
            dataPoints: [
                __('Klīniskie pētījumi: 12+ Eiropā un ASV'),
                __('Fistulu dzīšanas rādītāji: līdz 50%'),
                __('Stabilas remisijas ilgums: līdz 12 mēnešiem'),
                __('Mehānisms: audu reģenerācija + imūnmodulācija'),
                __('Drošība: līdz šim laba, nav nopietnu blakņu'),
                __('Notiekoši pētījumi: intratissulāras MSC injekcijas striktūrām'),
            ],
        },
        {
            condition: __('Izaicinājumi un nākotnes virzieni'),
            summary: __(
                'MSC terapija ir daudzsološa, bet nepieciešama standartizācija, lielāki pētījumi un regulatīvo prasību izpilde.'
            ),
            dataPoints: [
                __('Standartizācija: avots (UC/adipoze/kaulu smadzenes), deva, ievadīšanas maršruts'),
                __('Nepieciešami lielāki RCT un ilgtermiņa drošības dati'),
                __('ATMP regulējums: kvalitātes kontrole un reproducējamība'),
                __('Tendence: MSC-Exo, ģenētiski modificētas MSC'),
                __('Potenciāls: kombinācija ar biologiem, autoimūnām slimībām (RA, SLE, MS)'),
            ],
        },
    ];

    return (
        <>
            <Head title={__('Klīniskie pētījumi')} />

            <div className="relative min-h-screen bg-gradient-to-b from-[#eef7ff] via-white to-[#f3faf7] text-slate-900 px-4 py-10 sm:px-8">
                <div className="mx-auto w-full max-w-5xl space-y-10">
                    {/* HEADER */}
                    <div className="text-center space-y-3">
                        <h1 className="text-3xl font-semibold sm:text-4xl">
                            {__('Klīniskie pētījumi un dati')}
                        </h1>
                        <p className="max-w-2xl mx-auto text-slate-600 text-lg leading-relaxed">
                            {__(
                                'Strukturēta informācija par MSC terapiju psoriāzes un Krona slimības ārstēšanā: mehānismi, klīniskie rezultāti, drošība un nākotnes perspektīvas.'
                            )}
                        </p>
                    </div>

                    {/* TRIAL CARDS */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        {trials.map((trial) => (
                            <div
                                key={trial.condition}
                                className="rounded-3xl border border-white/70 bg-white/90 backdrop-blur p-6 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <h2 className="text-xl font-semibold text-slate-900">
                                    {trial.condition}
                                </h2>

                                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                                    {trial.summary}
                                </p>

                                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                                    {trial.dataPoints.map((dp) => (
                                        <li key={dp} className="flex gap-3">
                                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                                            {dp}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
