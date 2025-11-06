export default function MusuGrupa() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-20">
      {/* Title */}
      <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-green-900 mb-16 sm:mb-24">
        Mūsu grupa
      </h1>

      <section className="max-w-6xl mx-auto space-y-20 sm:space-y-28">
        {/* --- Uldis --- */}
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src="\Uldis_2019-copy.jpg"
            alt="Uldis Bērziņš"
            className="w-64 sm:w-80 md:w-96 h-auto rounded-lg shadow-lg mb-8 md:mb-0 md:mr-10"
          />
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
              Uldis Bērziņš
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 px-2 md:px-0">
              Dr. biol. Uldis Bērziņš ir laboratorijas vadītājs un vadošais pētnieks,
              kurš pēta novecošanos un ādas šūnu kultūras biočipu tehnoloģijas.
            </p>

            {/* Facebook */}
            <div className="flex justify-center md:justify-start">
              <a
                href="https://www.facebook.com/uldis.berzins.927"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#3b5998] rounded-md hover:bg-[#2e4a84] transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 
                  1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413
                  c0-3.1 1.893-4.788 4.659-4.788 1.325 0 
                  2.464.099 2.795.143v3.24l-1.918.001c-1.504 
                  0-1.796.715-1.796 1.763v2.313h3.587l-.467 
                  3.622h-3.12V24h6.116C23.407 24 24 
                  23.407 24 22.674V1.326C24 .593 23.407 
                  0 22.675 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* --- Ralfs --- */}
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src="\IMG_3160-scaled.jpg"
            alt="Ralfs Žagars"
            className="w-64 sm:w-80 md:w-96 h-auto rounded-lg shadow-lg mb-8 md:mb-0 md:mr-10"
          />
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
              Ralfs Žagars
            </h2>
            <h3 className="text-green-800 text-base sm:text-lg font-medium mb-4 px-2 md:px-0">
              “Biočipu zinātniskā laboratorija” mājaslapas dizainers
            </h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed px-2 md:px-0">
              Ralfs Žagars ir Rīgas mākslas un mediju tehnikuma multimediju dizaina
              specialitātes audzēknis, kurš izstrādāja šīs mājaslapas dizainu.
            </p>
          </div>
        </div>

        {/* --- Erasmus Plus --- */}
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src="\cst-rumanijas-studenti.jpeg"
            alt="Erasmus Plus studenti"
            className="w-72 sm:w-96 md:w-[30rem] h-auto rounded-lg shadow-lg mb-8 md:mb-0 md:mr-10"
          />
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
              Erasmus Plus studenti
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed px-2 md:px-0">
              Erasmus Plus studenti no Rumānijas.
            </p>
          </div>
        </div>
        {/*---VTDT skolnieki---*/}
           <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src=""
            alt="Erasmus Plus studenti"
            className="w-72 sm:w-96 md:w-[30rem] h-auto rounded-lg shadow-lg mb-8 md:mb-0 md:mr-10"
          />
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
              Praktikanti no VTDT
            </h2>
            <h3 className="text-green-800 text-base sm:text-lg font-medium mb-4 px-2 md:px-0">
               “Biočipu zinātniskā laboratorija” mājaslapas dizainers
            </h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed px-2 md:px-0">
             Studenti no Vidzemes Tehnoloģiju un dizaina tehnikums, kuri izstrādāja šīs mājaslapas dizainu.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
