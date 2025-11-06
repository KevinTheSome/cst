import { useState } from "react";

export default function Projects() {
    const [open, setOpen] = useState(true);

    return (
        <>
            <section className="bg-gray-100">
                <div className="px-6 pt-20 pb-12">
                    <h1 className="font-serif font-bold text-[44px] leading-tight text-green-700 text-center">
                        Projekti
                    </h1>
                </div>
            </section>
            <section className="bg-gray-100">
                <div className="px-6 pt-6 pb-6">
                    <h2 className="font-serif text-centerfont-bold text-center text-[36px] text-black leading-tight text-blatext-center">
                        Tagadējais projekts:
                    </h2>
                </div>
                <div className="flex justify-center">
                    <p className="font-Merriweather text-centerfont-bold text-center text-[18px] font-bold text-black leading-tight text-blatext-center  max-w-[70%]">
                        METODE DZĪVU, NEIEZĪMĒTU ŠŪNU IDENTIFICĒŠANAI UN ŠĶIROŠANAI PĒC TELOMĒRU GARUMA (2020.-2023.)
                    </p>
                </div>
            </section>
            <section className="bg-gray-100 order p-6 flex justify-center">
                <div className="w-[85%] border-b border-gray-300">
                    <div className="pt-4 pr-7 pl-7">
                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            aria-controls="proj-desc"
                            className="inline-flex items-center gap-2 text-[18px] text-green-600 hover:text-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded"
                        >
                            <span
                            className="inline-block w-2.5 h-2.5 border-t-2 border-r-2 border-current rotate-45 translate-y-[1px]"
                            style={{ transform: `rotate(${open ? 90 : 270}deg)` }}
                            />
                            Apraksts
                        </button>
                    </div>
                    <div
                        id="proj-desc"
                        className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden pl-7 pr-7 mb-7 ${
                            open ? "max-h-[1300px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                        >
                        <p className="mt-4 text-[18px] leading-relaxed text-gray-800">
                            Pēcdoktorants/projekta īstenotājs: Uldis Bērziņš
                        </p>
                        <p className="text-[18px] leading-7 text-gray-800 mt-4">
                            Pētniecības pieteikuma vispārīgais mērķis ir attīstīt pēcdoktoranta prasmes un palielināt
                             zinātnisko kapacitāti, nodrošinot karjeras uzsākšanas iespējas zinātniskajā institūcijā
                              un pētniecības kompetenču pilnveidošanu. Tādejādi tiks arī veicināta cilvēkresursu
                               atjaunotne un kvalificētu speciālistu skaita pieaugums Rīgas Tehniskajā universitātē.
                        </p>
                        <p className="text-[18px] leading-7 text-gray-800 mt-4 ">
                            Pētniecības pieteikuma zinātniskais mērķis ir optimizēt dielektroforēzes metodi tā,
                             lai to varētu izmantot, lai atdalītu cilmes šūnas pēc telomēru garuma, dzīvas un
                              neiezīmētas no heterogēnas cilmes šūnu populācijas mikroplūsmas biočipā.
                        </p>
                    </div>
                </div>
            </section>
            <section className="bg-gray-100 flex justify-center">
                <div className="mt-14 mb-24">
                    <p className="text-gray-700  text-[18px] mb-4">
                        Pārējie Biomedicīnas inženierzinātņu un nanotehnoloģiju institūta projekti:
                    </p>
                    <p className="text-gray-700 text-center text-[18px] hover:text-yellow-500">
                        <a
                        href="https://bini.rtu.lv/petijumu-projekti/">
                            http://bini.rtu.lv/petijumu-projekti/
                        </a>

                    </p>
                </div>
            </section>
        </>
    )
}