import { useLang } from '@/hooks/useLang';
import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { props } = usePage<any>();
    const currentLocale = props.locale;
    const { __ } = useLang();

    // 1. Detect scroll for styling changes (Shadow only, background stays white)
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 2. NEW: Lock body scroll when mobile sidebar is open
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        // Cleanup function to reset overflow if component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [sidebarOpen]);

    const switchLanguage = async (locale: string) => {
        if (currentLocale === locale) return;
        try {
            await axios.post('/locale', { locale });
            router.visit(window.location.pathname, { replace: true });
        } catch (error) {
            console.error('Language switch failed:', error);
        }
    };

    return (
        <nav 
            className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ease-in-out ${
                scrolled 
                ? 'py-3 shadow-md' 
                : 'py-5 lg:py-6 border-b border-slate-100'
            }`}
        >
            <div className="mx-auto flex max-w-[90rem] items-center justify-between px-6 lg:px-12">
                
                {/* --- LOGO --- */}
                <Link href="/" className="group flex items-center gap-5 transition-transform duration-300 hover:scale-[1.02]">
                    <div className="relative">
                        <img 
                            src="/bzl-site-icon-01.png" 
                            alt="Logo" 
                            className={`relative transition-all duration-500 ${scrolled ? 'h-12' : 'h-16 lg:h-20'}`} 
                        />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className={`font-extrabold tracking-tight text-slate-900 transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl lg:text-3xl'}`}>
                            Cilmes Šūnu
                        </span>
                        <span className={`font-bold text-emerald-600 transition-all duration-300 ${scrolled ? 'text-sm' : 'text-base lg:text-lg'}`}>
                            Tehnoloģijas SIA
                        </span>
                    </div>
                </Link>

                {/* --- DESKTOP NAVIGATION (Hidden on mobile) --- */}
                <ul className="hidden items-center gap-2 lg:flex">
                    <NavDropdown label={__('head.nav_patients')}>
                        <DropdownLink href="/pacientiem/atmp">{__('head.nav_patients_atmp')}</DropdownLink>
                        <DropdownLink href="/pacientiem/psoriaze-terapija">{__('head.nav_patients_psoriasis')}</DropdownLink>
                        <DropdownLink href="/pacientiem/krona-terapija">{__('head.nav_patients_crohn')}</DropdownLink>
                        <DropdownLink href="/pacientiem/faq">{__('head.nav_patients_faq')}</DropdownLink>
                    </NavDropdown>

                    <NavDropdown label={__('head.nav_specialists')}>
                        <DropdownLink href="/specialistiem/likumi">{__('head.nav_specialists_laws')}</DropdownLink>
                        <DropdownLink href="/specialistiem/atmp">{__('head.nav_specialists_plants')}</DropdownLink>
                        <DropdownLink href="/specialistiem/apmaciba">{__('head.nav_specialists_training')}</DropdownLink>
                        <DropdownLink href="/postdock-anketa?role=specialists">{__('head.nav_specialists_survey')}</DropdownLink>
                    </NavDropdown>

                    <NavDropdown label={__('head.nav_research')}>
                        <DropdownLink href="/clinical-trials">Klīniskie pētijumi</DropdownLink>
                        <DropdownLink href="/postdock-anketa?role=patients">{__('head.nav_research_postdoc')}</DropdownLink>
                        <DropdownLink href="/anketa-kods">{__('head.nav_research_code')}</DropdownLink>
                        <DropdownLink href="/datubaze">{__('head.nav_research_documents')}</DropdownLink>
                    </NavDropdown>

                    <NavDropdown label={__('head.nav_about')}>
                        <DropdownLink href="/ParMums/musu-grupa">{__('head.nav_about_team')}</DropdownLink>
                        <DropdownLink href="/ParMums/contacts">{__('head.nav_about_contacts')}</DropdownLink>
                        <DropdownLink href="/ParMums/pievienojies-mums">{__('head.nav_about_join')}</DropdownLink>
                        <DropdownLink href="/ParMums/lablife">{__('head.nav_about_lab')}</DropdownLink>
                    </NavDropdown>

                    <div className="ml-8 flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1.5 shadow-sm transition-all hover:border-emerald-200">
                        <LangBtn locale="lv" current={currentLocale} onClick={switchLanguage}>🇱🇻</LangBtn>
                        <LangBtn locale="en" current={currentLocale} onClick={switchLanguage}>🇬🇧</LangBtn>
                    </div>
                </ul>

                {/* --- MOBILE TOGGLE BUTTON --- */}
                <button 
                    className="group flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-800 transition-all duration-300 hover:bg-emerald-500 hover:text-white lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open Menu"
                >
                    <svg className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                    </svg>
                </button>
            </div>

            {/* --- MOBILE SIDEBAR OVERLAY --- */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    {/* Dark Backdrop */}
                    <div 
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
                        onClick={() => setSidebarOpen(false)} 
                    />
                    
                    {/* Sidebar Content */}
                    <aside className="absolute right-0 h-full w-[85vw] max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-out">
                        <div className="flex h-full flex-col">
                            {/* Mobile Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                                <span className="text-xl font-extrabold text-slate-900">Izvēlne</span>
                                <button 
                                    onClick={() => setSidebarOpen(false)} 
                                    className="rounded-full bg-slate-100 p-3 text-slate-500 transition hover:bg-rose-100 hover:text-rose-600"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Mobile Links (Scrollable) */}
                            <div className="flex-1 overflow-y-auto px-5 py-6 overscroll-contain">
                                <div className="space-y-4">
                                    <MobileSection label={__('head.nav_patients')} icon={<IconUser />}>
                                        <MobileLink href="/pacientiem/atmp">{__('head.nav_patients_atmp')}</MobileLink>
                                        <MobileLink href="/pacientiem/psoriaze-terapija">{__('head.nav_patients_psoriasis')}</MobileLink>
                                        <MobileLink href="/pacientiem/krona-terapija">{__('head.nav_patients_crohn')}</MobileLink>
                                        <MobileLink href="/pacientiem/faq">{__('head.nav_patients_faq')}</MobileLink>
                                    </MobileSection>

                                    <MobileSection label={__('head.nav_specialists')} icon={<IconDoctor />}>
                                        <MobileLink href="/specialistiem/likumi">{__('head.nav_specialists_laws')}</MobileLink>
                                        <MobileLink href="/specialistiem/atmp">{__('head.nav_specialists_plants')}</MobileLink>
                                        <MobileLink href="/specialistiem/apmaciba">{__('head.nav_specialists_training')}</MobileLink>
                                        <MobileLink href="/postdock-anketa?role=specialists">{__('head.nav_specialists_survey')}</MobileLink>
                                    </MobileSection>

                                    <MobileSection label={__('head.nav_research')} icon={<IconResearch />}>
                                        <MobileLink href="/clinical-trials">Klīniskie pētijumi</MobileLink>
                                        <MobileLink href="/postdock-anketa?role=patients">{__('head.nav_research_postdoc')}</MobileLink>
                                        <MobileLink href="/anketa-kods">{__('head.nav_research_code')}</MobileLink>
                                        <MobileLink href="/datubaze">{__('head.nav_research_documents')}</MobileLink>
                                    </MobileSection>

                                    <MobileSection label={__('head.nav_about')} icon={<IconInfo />}>
                                        <MobileLink href="/ParMums/musu-grupa">{__('head.nav_about_team')}</MobileLink>
                                        <MobileLink href="/ParMums/contacts">{__('head.nav_about_contacts')}</MobileLink>
                                        <MobileLink href="/ParMums/pievienojies-mums">{__('head.nav_about_join')}</MobileLink>
                                        <MobileLink href="/ParMums/lablife">{__('head.nav_about_lab')}</MobileLink>
                                    </MobileSection>
                                </div>
                            </div>

                            {/* Mobile Footer */}
                            <div className="border-t border-slate-100 bg-slate-50 p-6">
                                <div className="flex justify-center gap-3">
                                    <MobileLangBtn locale="lv" current={currentLocale} onClick={switchLanguage}>Latviešu 🇱🇻</MobileLangBtn>
                                    <MobileLangBtn locale="en" current={currentLocale} onClick={switchLanguage}>English 🇬🇧</MobileLangBtn>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            )}
        </nav>
    );
}

/* --- REUSABLE COMPONENTS --- */

const NavDropdown = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <li className="group relative px-1">
        <button className="flex items-center gap-2 rounded-full px-5 py-3 text-lg font-bold text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-700">
            {label}
            <svg className="h-5 w-5 text-slate-400 transition-transform duration-300 ease-out group-hover:rotate-180 group-hover:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        <div className="absolute left-1/2 top-full mt-2 w-80 -translate-x-1/2 origin-top scale-95 opacity-0 invisible transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
            <div className="absolute -top-4 h-4 w-full bg-transparent"></div>
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white p-3 shadow-2xl ring-1 ring-black/5">
                <div className="flex flex-col gap-1">
                    {children}
                </div>
            </div>
        </div>
    </li>
);

const DropdownLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link href={href} className="block rounded-2xl px-6 py-3.5 text-base font-semibold text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:pl-7 hover:text-emerald-700">
        {children}
    </Link>
);

const LangBtn = ({ locale, current, onClick, children }: any) => (
    <button
        onClick={() => onClick(locale)}
        className={`flex h-10 w-10 items-center justify-center rounded-full text-base transition-all duration-300 ${
            current === locale 
                ? 'bg-white text-slate-900 shadow-md ring-1 ring-black/5 scale-105' 
                : 'text-slate-400 grayscale hover:bg-white/60 hover:grayscale-0 hover:text-slate-600'
        }`}
    >
        {children}
    </button>
);

const MobileSection = ({ label, icon, children }: any) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={`overflow-hidden rounded-2xl border transition-all duration-300 ${open ? 'border-emerald-100 bg-emerald-50/30' : 'border-slate-100 bg-white'}`}>
            <button 
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-lg font-bold text-slate-800 hover:bg-slate-50/50"
            >
                <div className="flex items-center gap-4">
                    <div className={`rounded-xl p-2 transition-colors ${open ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {icon}
                    </div>
                    <span>{label}</span>
                </div>
                <svg className={`h-6 w-6 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180 text-emerald-600' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`flex flex-col gap-2 px-5 transition-all duration-300 ease-in-out ${open ? 'max-h-[500px] pb-5 pt-2 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}>
                {children}
            </div>
        </div>
    );
};

const MobileLink = ({ href, children }: any) => (
    <Link href={href} className="block rounded-xl border border-transparent px-4 py-3 text-base font-semibold text-slate-600 transition-all hover:border-emerald-100 hover:bg-white hover:text-emerald-700 hover:shadow-sm">
        {children}
    </Link>
);

const MobileLangBtn = ({ locale, current, onClick, children }: any) => (
    <button
        onClick={() => onClick(locale)}
        className={`w-full rounded-xl px-4 py-3 text-base font-bold shadow-sm transition-all active:scale-95 ${
            current === locale 
                ? 'bg-emerald-500 text-white shadow-emerald-200' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
        }`}
    >
        {children}
    </button>
);

// --- Icons ---
const IconUser = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IconDoctor = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
const IconResearch = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
const IconInfo = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default Navbar;