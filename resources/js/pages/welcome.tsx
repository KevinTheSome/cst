import { useLang } from '@/hooks/useLang';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
type Slide = { image: string; alt: string };

const SLIDE_INTERVAL = 4000;

const SLIDES: Slide[] = [
    { image: '/Enu-dienas-RTU-2020.jpg', alt: 'Studenti laboratorijā pie bioinženierijas aprīkojuma' },
    { image: '/2020.08.27._RTU-izcilnieki_02-scaled.jpg', alt: 'Komanda demonstrē biočipu iekārtu' },
    { image: '/2020.08.27._RTU-izcilnieki_01-scaled.jpg', alt: 'Biočipa ražošanas process' },
];

export default function Welcome() {
    const { __ } = useLang();
    const [activeSlide, setActiveSlide] = useState(0);
    const totalSlides = SLIDES.length;

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide((c) => (c + 1) % totalSlides);
        }, SLIDE_INTERVAL);
        return () => window.clearInterval(timer);
    }, [totalSlides]);

    const goToSlide = (index: number) => setActiveSlide((index + totalSlides) % totalSlides);

    return (
        <>
            <Head title={__('Sākumlapa')} />

            <div className="bg-[#f4f4f2]">
                <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-12 pb-16 sm:px-10">
                    {/* SLIDESHOW — full width, no side lines, big rounded corners */}
                    <div className="relative w-full overflow-hidden rounded-[64px] shadow-lg shadow-black/15 sm:rounded-[88px] lg:rounded-[120px]">
                        {/* keep ~10% shorter than the original tall version */}
                        <div className="relative h-[67.5vh] max-h-[882px] w-full sm:h-[72vh] lg:h-[76.5vh]">
                            {SLIDES.map((slide, index) => (
                                <figure
                                    key={slide.image + index}
                                    className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-700 ${
                                        index === activeSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <img
                                        alt={slide.alt}
                                        src={slide.image}
                                        className="h-full w-full object-cover object-[center_30%]" /* fill, no letterbox; shift view up a bit */
                                    />
                                </figure>
                            ))}
                        </div>

                        {/* Prev / Next hit areas */}
                        <button
                            aria-label="Iepriekšējais attēls"
                            className="absolute top-0 left-0 h-full w-16"
                            onClick={() => goToSlide(activeSlide - 1)}
                            type="button"
                        />
                        <button
                            aria-label="Nākamais attēls"
                            className="absolute top-0 right-0 h-full w-16"
                            onClick={() => goToSlide(activeSlide + 1)}
                            type="button"
                        />

                        {/* Dots */}
                        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
                            {SLIDES.map((_, index) => (
                                <button
                                    key={`dot-${index}`}
                                    aria-label={`Dot ${index + 1}`}
                                    className={`h-2 w-10 rounded-full transition ${index === activeSlide ? 'bg-white' : 'bg-white/40'}`}
                                    onClick={() => goToSlide(index)}
                                    type="button"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Text content */}
                    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-8 py-10 text-center">
                        <h2 className="text-2xl leading-relaxed text-[#3a4955]">
                            Rīgas Tehniskās universitātes, Mašīnzinību, transporta un aeronautikas fakultātes, Biomedicīnas inženierzinātņu un
                            nanotehnoloģiju institūta, Biočipu zinātniskā laboratorija.
                        </h2>
                        <p className="text-base leading-relaxed text-[#3a4955] sm:text-lg">Laboratorija nodrošina:</p>
                        <p className="text-base leading-relaxed text-[#3a4955] sm:text-lg">
                            – pētījumus biomikrotehnoloģijās un nanotehnoloģijās, medicīnas inženierijas un nanoinženierijas jomās,
                        </p>
                        <p className="text-base leading-relaxed text-[#3a4955] sm:text-lg">– studentus un jaunos pētniekus ar pētniecisko praksi.</p>
                        <Link
                            className="rounded-full bg-[#1f675b] px-6 py-3 text-sm font-semibold tracking-[0.25em] text-white uppercase transition hover:bg-[#184f46]"
                            href="/biocipu-zinatniska-laboratorija"
                        >
                            Uzzināt vairāk
                        </Link>
                    </div>
                </section>

                <section className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 pb-20 sm:px-10">
                    <div className="flex flex-col gap-8 p-8 md:flex-row md:items-center">
                        <img
                            alt="Dr. habil. Uldis Bērziņš"
                            className="h-52 w-52 flex-shrink-0 rounded-3xl object-cover object-top shadow-lg shadow-black/10 md:h-60 md:w-60"
                            src="/Uldis_2019-copy.jpg"
                        />
                        <div className="flex flex-col gap-4 text-[#26323b]">
                            <h2 className="text-2xl font-semibold">Dr. biol. Uldis Bērziņš</h2>
                            <p className="text-base leading-relaxed text-[#40515d]">
                                ir laboratorijas vadītājs un vadošais pētnieks, kurš pēta novecošanos un tā ārstēšanas iespējas uz šūnu kultūrām
                                biočipos.
                            </p>
                            <p className="text-sm tracking-[0.28em] text-[#74838f] uppercase">Mēs radām nākotnes tehnoloģijas</p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl">
                        <div className="aspect-video w-full">
                            <iframe
                                className="h-full w-full"
                                src="https://www.youtube-nocookie.com/embed/0WnkYZsxrU0?start=1&rel=0&modestbranding=1&playsinline=1"
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
