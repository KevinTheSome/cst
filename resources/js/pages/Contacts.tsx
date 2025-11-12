export default function Contacts() {
    return (
        <section className="bg-gray-100 py-16 px-6 h-full">
            {/* Title */}
            <h1
                className="font-semibold text-bold text-5xl text-green-700 text-center mt-20 mb-20 ">
                Kontakti
            </h1>


            {/* Main layout */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                {/* Left side - contact info */}
                <div className="space-y-10">
                    {/* Phones */}
                    <div className="flex items-start space-x-5">
                        <img
                            src="/telefona-ikona-03.svg"
                            alt="Phone icon"
                            className="w-10 h-10 mt-5"
                        />
                        <div className="space-y-1 text-gray-800 text-lg font-merriweathe">
                            <br></br>
                            <p>+371 29252975</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start space-x-5">
                        <img
                            src="/epasts-ikona-cerams-ka-ista-01.svg"
                            alt="Mail icon"
                            className="w-10 h-10"
                        />
                        <p className="text-gray-800 text-lg mt-1 font-merriweathe" >
                            <a
                                href="mailto:uldis.berzins.4@rtu.lv"
                                className="hover:underline"
                            >
                                uldis.berzins_4@rtu.lv
                            </a>
                        </p>
                    </div>

                    {/* Address */}
                    <div className="flex items-start space-x-5">
                        <img
                            src="/adreses-ikona.svg"
                            alt="Map icon"
                            className="w-10 h-10"
                        />
                        <p className="text-gray-800 text-lg font-merriweathe" >
                            Ķīpsalas iela 6B–316, Rīga, LV-1064, Latvija
                        </p>
                    </div>
                </div>

                {/* Right side - Google map */}
                <div className="rounded-lg overflow-hidden shadow-md">
                    <iframe
                        src="https://www.google.com/maps?q=Ķīpsalas%20iela%206B–316,%20Rīga,%20LV-1064,%20Latvija&output=embed"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        allowFullScreen
                        className="border-0 w-full h-[400px]"
                        title="RTU Location"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
