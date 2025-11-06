import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = Cookies.get('cookie_consent');
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const accept = () => {
        // store consent for 1 year
        Cookies.set('cookie_consent', 'accepted', { expires: 365 });
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
            <div className="max-w-3xl rounded-2xl bg-white p-4 shadow-lg ring-1 ring-[#dfe9e3] md:flex md:items-center md:gap-4">
                <p className="text-sm text-[#1b4a37]">
                    Mēs izmantojam sīkdatnes, lai uzlabotu jūsu pieredzi šajā vietnē.
                </p>
                <button
                    onClick={accept}
                    className="mt-3 inline-flex items-center rounded-full bg-[#1b4a37] px-4 py-2 text-sm font-medium text-white hover:bg-[#163b2c] md:mt-0 md:ml-auto"
                >
                    Piekrītu
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
