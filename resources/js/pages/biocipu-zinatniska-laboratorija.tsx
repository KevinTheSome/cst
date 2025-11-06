import { Head } from '@inertiajs/react';

export default function BiocipuZinatniskaLaboratorija() {
    return (
        <>
            <Head title="Biočipu zinātniskā laboratorija" />

            <div className="bg-[#f4f4f2] py-16">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 text-center sm:px-10">
                    <div className="flex flex-col gap-6 text-[#2f3c37]">
                        <h1 className="text-3xl font-semibold text-[#1f513c] sm:text-4xl">Biočipu zinātniskā laboratorija</h1>
                        <p className="text-lg leading-relaxed text-[#3d4b43]">
                            Ja skatās globāli, biočipu tehnoloģijas, tās ir strauji augoša nozare. Šī interese, kas saistīta ar ekonomisko
                            izrāvienu Latvijā, Rīgas Tehniskās universitātes intereses ir uzsveramas ar biočipu tehnoloģiju attīstību. Tā
                            arī veido vēlmi veikt zinātnisko pētniecību, konkrēti tieši biočipu jomā.
                        </p>
                        <p className="text-lg leading-relaxed text-[#3d4b43]">
                            Biočipu zinātniskās laboratorijas vērtības saskan ar visām Rīgas Tehniskās universitātes vērtībām — kvalitāte,
                            akadēmiskā brīvība, ilgspējīga attīstība, godīgums, sadarbība un stabilitāte.
                        </p>
                        <p className="text-lg leading-relaxed text-[#3d4b43]">
                            Galvenā misija ir nodrošināt Latvijas sabiedrībai starptautiski konkurētspējīgu augstas kvalitātes zinātnisko
                            pētniecību, augstāko izglītību, tehnoloģiju pārnesi un inovācijas biočipu tehnoloģiju jomā.
                        </p>
                    </div>
<br/>
                    <div className="flex flex-col items-center gap-12 text-left text-[#3d4b43]">
                        <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:gap-8">
                            <img
                                alt="Biočipu laboratorijas eksperiments"
                                className="w-full rounded-2xl object-cover md:w-1/2"
                                src="/bzl-3.jpg"
                            />
                            <p className="text-lg leading-relaxed">
                                Laboratorija ir ļoti jauna. Tā tika izveidota ar Rīgas Tehniskās universitātes palīdzību 2009. gada 26. martā.
                                Laboratorijas vadītājs Dr. biol. Uldis Bērziņš pēta novecošanu. Piemēram, tiek pētītas atjaunošanās iespējas uz
                                šūnu kultūrām biočipos. Tās tiek eksperimentētas ar nelieliem šūnu iemītniekiem.
                            </p>
                        </div>
<br/>
                        <div className="w-full overflow-hidden rounded-2xl">
                            <img
                                alt="Komanda laboratorijā"
                                className="h-full w-full object-cover"
                                src="/bzl-1.jpg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
