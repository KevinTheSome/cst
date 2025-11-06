import React, { useState } from "react";

export default function Publikacijas() {
  const [activeYear, setActiveYear] = useState(2020);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f8f6] flex flex-col items-center pt-24 pb-28 text-[#1a1a1a]">
      {}
      <h1 className="text-4xl font-serif text-[#1d5036] mb-12 tracking-wide">
        Publikācijas
      </h1>

      {}
      <div className="flex space-x-6 mb-10">
        <button
          onClick={() => setActiveYear(2020)}
          className={`px-10 py-3 text-lg font-medium border rounded-md transition ${
            activeYear === 2020
              ? "bg-[#1d5036] text-white border-[#1d5036]"
              : "border-[#1d5036] text-[#1d5036] bg-transparent hover:bg-[#1d5036]/10"
          }`}
        >
          2020
        </button>
        <button
          onClick={() => setActiveYear(2021)}
          className={`px-10 py-3 text-lg font-medium border rounded-md transition ${
            activeYear === 2021
              ? "bg-[#1d5036] text-white border-[#1d5036]"
              : "border-[#1d5036] text-[#1d5036] bg-transparent hover:bg-[#1d5036]/10"
          }`}
        >
          2021
        </button>
      </div>

      {}
      <div className="w-full max-w-5xl border-t border-gray-400 mb-10" />

      {}
      {activeYear === 2020 && (
        <div className="w-full max-w-5xl">
          <h2 className="text-center font-serif text-[18px] leading-snug text-[#1a1a1a] mb-3">
            Biočips kosmetoloģijā – dzīvu, neiezīmētu šūnu identificēšanai un
            šķirošanai pēc telomēru garuma
          </h2>

          {}
          <button
            onClick={() => setOpen(!open)}
            className="text-[#d47500] text-[17px] mb-4 ml-10 focus:outline-none font-medium"
          >
            {open ? "▲ Apraksts" : "▶ Apraksts"}
          </button>

          {open && (
            <div className="text-[17px] leading-relaxed text-[#1a1a1a] ml-10 mr-10 max-w-4xl">
              <p className="mb-3">
                <strong>
                  Ilgspējīgs skaistums un veselība: konferences tēžu krājums =
                  Sustainable Wellness: Conference Proceedings 2020
                </strong>
              </p>

              <p className="mb-3 font-semibold">Uldis Bērziņš</p>

              <p>
                Alternatīvu testēšanas metožu izmantošana kosmetoloģijā ir
                nozīmīga senolītiķu pierādījumu svara palielināšanai. Lai
                noskaidrotu senolītiķa ietekmi uz šūnām ar dažādu telomēru
                garumu, ir nepieciešama jauna metode, ar kuru no šūnu populācijas
                izolēt dzīvas, neiezīmētas šūnas pēc telomēru garuma, lai pēc
                tam pētītu senolītiķa ietekmi uz šūnām ar dažādu garumu
                telomērām. Rīgas Tehniskā universitāte izstrādā mikroplūsmas
                biočipu, uz kura dielektroforēzē, mikroskopiski, mākslīgā
                intelekta kontrolē, dzīvas, neiezīmētas šūnas izolēt pēc
                telomēru garuma. Šis darbs tiek izstrādāts ar Eiropas
                Reģionālās attīstības fonda atbalstu darbības programmas
                “Izaugsme un nodarbinātība” 1.1.1. specifiskā atbalsta mērķa
                “Palielināt Latvijas zinātnisko institūciju pētniecisko un
                inovatīvo kapacitāti un spēju piesaistīt ārējo finansējumu,
                ieguldot cilvēkresursos un infrastruktūrā” 1.1.1.2. pasākuma
                “Pēcdoktorantūras pētniecības atbalsts” ietvaros
                (Nr. 1.1.1.2/VIAA/3/19/450).
              </p>
            </div>
          )}
        </div>
      )}

      {}
      {activeYear === 2021 && (
        <div className="w-full max-w-5xl text-center text-gray-500 italic text-[18px]">
          Nav pieejamu publikāciju šim gadam.
        </div>
      )}
    </div>
  );
}
