import { useState } from 'react';

export default function MusuGrupa() {
    const [showVtdtStudents, setShowVtdtStudents] = useState(false);

    const vtdtStudents = [
        {
            name: 'Kevins ',
            title: 'SCRUM Master',
            description: 'Uzdevumu sadalīšanas, koda parskatīšanas un izstrādes vadītājs.',
            image: '/bzl-1.jpg',
        },
        {
            name: 'Elvis ',
            title: 'Chill guy, for the vibes',
            description: 'Veido prototipus un vizuālās vadlīnijas, kas saskaņo laboratorijas zīmolu ar digitālo pieredzi.',
            image: '/bzl-2.jpg',
        },
        {
            name: 'kristiāns ',
            title: 'Satura redaktore',
            description: 'Strādā ar stāstiem un attēliem, nodrošinot, ka katrs teksts ir saprotams un iedvesmojošs.',
            image: '/bzl-3.jpg',
        },
        {
            name: 'Adrians Raitums',
            title: 'UI/UX Dizainers Front-end izstrādātājs',
            description: 'Izdomāt dizainu kā piesaistīt lietotājus uz Tīmekļa vietni.',
            image: '/Adrians_Raitums.jpeg',
        },
        {
            name: 'Jānis Mārtiņš Bramanis',
            title: 'Vietnes satura un privātuma politikas redaktors',
            description: 'Rediģē lapu saturu un sīkdatņu politiku, rūpējoties par skaidru, saprotamu un lietotājam draudzīgu informāciju.',
            image: '/janka.jpg',
        },
        {
            name: 'Kristers Skrastiņš',
            title: 'Testēšanas koordinators',
            description: 'Pārbauda funkcionalitāti dažādās ierīcēs un apkopo ieteikumus uzlabojumiem.',
            image: '/bzl-6.jpg',
        },
        {
            name: 'Kristaps Imants',
            title: 'Projektu koordinatore',
            description: 'Vada komunikāciju ar laboratorijas komandu un nodrošina, ka termiņi tiek ievēroti.',
            image: '/bzl-7.jpg',
        },
    ];

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-20">
            {/* Title */}
            <h1 className="mb-16 text-center text-4xl font-extrabold text-green-900 sm:mb-24 sm:text-5xl">Mūsu grupa</h1>

            <section className="mx-auto max-w-6xl space-y-20 sm:space-y-28">
                {/* --- Uldis --- */}
                <div className="flex flex-col items-center md:flex-row md:items-start">
                    <img
                        src="\Uldis_2019-copy.jpg"
                        alt="Uldis Bērziņš"
                        className="mb-8 h-auto w-64 rounded-lg shadow-lg sm:w-80 md:mr-10 md:mb-0 md:w-96"
                    />
                    <div className="max-w-2xl text-center md:text-left">
                        <h2 className="mb-3 text-2xl font-semibold text-gray-900 sm:text-3xl">Uldis Bērziņš</h2>
                        <p className="mb-6 px-2 text-base leading-relaxed text-gray-700 sm:text-lg md:px-0">
                            Dr. biol. Uldis Bērziņš ir laboratorijas vadītājs un vadošais pētnieks, kurš pēta novecošanos un ādas šūnu kultūras
                            biočipu tehnoloģijas.
                        </p>

                        {/* Facebook */}
                        <div className="flex justify-center md:justify-start">
                            <a
                                href="https://www.facebook.com/uldis.berzins.927"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-md bg-[#3b5998] transition-all duration-200 hover:bg-[#2e4a84] sm:h-12 sm:w-12"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
                                    <path
                                        d="M22.675 0H1.325C.593 0 0 .593 0
                  1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413
                  c0-3.1 1.893-4.788 4.659-4.788 1.325 0
                  2.464.099 2.795.143v3.24l-1.918.001c-1.504
                  0-1.796.715-1.796 1.763v2.313h3.587l-.467
                  3.622h-3.12V24h6.116C23.407 24 24
                  23.407 24 22.674V1.326C24 .593 23.407
                  0 22.675 0z"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                {/*---VTDT skolnieki---*/}
                <div className="space-y-10">
                    <div className="flex flex-col items-center md:flex-row md:items-start">
                        <img
                            src="\vtdt.png"
                            alt="Erasmus Plus studenti"
                            className="mb-8 h-auto w-72 rounded-lg shadow-lg sm:w-96 md:mr-10 md:mb-0 md:w-[30rem]"
                        />
                        <div className="max-w-2xl text-center md:text-left">
                            <h2 className="mb-3 text-2xl font-semibold text-gray-900 sm:text-3xl">Praktikanti no VTDT</h2>
                            <h3 className="mb-4 px-2 text-base font-medium text-green-800 sm:text-lg md:px-0">
                                “Biočipu zinātniskā laboratorija” mājaslapas dizainers
                            </h3>
                            <p className="px-2 text-base leading-relaxed text-gray-700 sm:text-lg md:px-0">
                                Studenti no Vidzemes Tehnoloģiju un dizaina tehnikums, kuri izstrādāja šīs mājaslapas dizainu.
                            </p>
                            <div className="mt-6 flex justify-center px-2 md:justify-start md:px-0">
                                <button
                                    type="button"
                                    aria-expanded={showVtdtStudents}
                                    aria-controls="vtdt-students"
                                    onClick={() => setShowVtdtStudents((prev) => !prev)}
                                    className="inline-flex items-center rounded-md bg-green-700 px-6 py-3 text-base font-semibold text-white shadow transition hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    {showVtdtStudents ? 'Paslēpt praktikantu komandu' : 'Parādīt praktikantu komandu'}
                                    <svg
                                        className={`ml-3 h-5 w-5 transition-transform ${showVtdtStudents ? 'rotate-180' : ''}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {showVtdtStudents && (
                        <div id="vtdt-students" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {vtdtStudents.map((student) => (
                                <article
                                    key={student.name}
                                    className="rounded-2xl bg-white shadow-md ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <img src={student.image} alt={student.name} className="h-48 w-full rounded-t-2xl object-cover" />
                                    <div className="p-5 text-center">
                                        <h4 className="text-xl font-semibold text-gray-900">{student.name}</h4>
                                        <p className="mt-1 font-medium text-green-700">{student.title}</p>
                                        <p className="mt-3 text-sm leading-relaxed text-gray-600">{student.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>

                {/* --- Erasmus Plus --- */}
                <div className="flex flex-col items-center md:flex-row md:items-start">
                    <img
                        src="\cst-rumanijas-studenti.jpeg"
                        alt="Erasmus Plus studenti"
                        className="mb-8 h-auto w-72 rounded-lg shadow-lg sm:w-96 md:mr-10 md:mb-0 md:w-[30rem]"
                    />
                    <div className="max-w-2xl text-center md:text-left">
                        <h2 className="mb-3 text-2xl font-semibold text-gray-900 sm:text-3xl">Erasmus Plus studenti</h2>
                        <p className="px-2 text-base leading-relaxed text-gray-700 sm:text-lg md:px-0">Erasmus Plus studenti no Rumānijas.</p>
                    </div>
                </div>

                {/* --- Ralfs --- */}
                <div className="flex flex-col items-center md:flex-row md:items-start">
                    <img
                        src="\IMG_3160-scaled.jpg"
                        alt="Ralfs Žagars"
                        className="mb-8 h-auto w-64 rounded-lg shadow-lg sm:w-80 md:mr-10 md:mb-0 md:w-96"
                    />
                    <div className="max-w-2xl text-center md:text-left">
                        <h2 className="mb-3 text-2xl font-semibold text-gray-900 sm:text-3xl">Ralfs Žagars</h2>
                        <h3 className="mb-4 px-2 text-base font-medium text-green-800 sm:text-lg md:px-0">
                            “Biočipu zinātniskā laboratorija” mājaslapas dizainers
                        </h3>
                        <p className="px-2 text-base leading-relaxed text-gray-700 sm:text-lg md:px-0">
                            Ralfs Žagars ir Rīgas mākslas un mediju tehnikuma multimediju dizaina specialitātes audzēknis, kurš izstrādāja šīs
                            mājaslapas dizainu.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
