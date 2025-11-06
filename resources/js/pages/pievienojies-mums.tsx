import { Head } from '@inertiajs/react';

export default function PievienojiesMums() {
    return (
        <>
            <Head title="Pievienojies mums" />

            <div className="bg-[#f4f4f2] py-16">
                <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 text-center sm:px-8">
                    <h1 className="text-3xl font-semibold text-[#1f513c] sm:text-4xl">Pievienojies mums</h1>

                    <div className="w-full overflow-hidden rounded-3xl bg-white shadow-lg">
                        <div className="aspect-video w-full">
                            <iframe
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="h-full w-full"
                                src="https://www.youtube-nocookie.com/embed/0WnkYZsxrU0?start=1&rel=0&modestbranding=1&playsinline=1"
                                title="Piesakies par ēnu RTU biotehnologam"
                            />
                        </div>
                    </div>

                    <p className="text-lg text-[#3a4955]">
                        Sazinies ar mums caur e-pastu:{' '}
                        <a className="font-semibold text-[#1f675b] underline" href="mailto:uldis.berzins_4@rtu.lv">
                            uldis.berzins_4@rtu.lv
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
