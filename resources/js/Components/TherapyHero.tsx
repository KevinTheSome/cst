import { Link } from '@inertiajs/react';
import { Fragment, ReactNode } from 'react';

type HeroStat = {
    value: string;
    label: string;
};

type KeyFact = {
    title: string;
    text: string;
    icon: ReactNode;
};

type HeroTheme = {
    badge: string;
    badgeDot: string;
    highlight: string;
    cta: string;
    iconFrame: string;
    keyFactCard: string;
    keyFactIcon: string;
    statsDivider: string;
};

type TherapyHeroProps = {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    stats: HeroStat[];
    keyFacts: KeyFact[];
    theme: HeroTheme;
    icon?: ReactNode;
};

export default function TherapyHero({
    badge,
    title,
    highlight,
    description,
    ctaLabel,
    ctaHref,
    stats,
    keyFacts,
    theme,
    icon,
}: TherapyHeroProps) {
    return (
        <main className="py-16 lg:py-24 text-center">
            <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-6 ${theme.badge}`}>
                <span className={`h-2 w-2 rounded-full ${theme.badgeDot}`} />
                {badge}
            </div>

            {icon && (
                <div className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border bg-white/80 shadow-sm ${theme.iconFrame}`}>
                    {icon}
                </div>
            )}

            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
                {title} <br className="hidden sm:block" />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.highlight}`}>
                    {highlight}
                </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed mb-10">
                {description}
            </p>

            <div className="flex justify-center mb-12">
                <Link
                    href={ctaHref}
                    className={`group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r px-8 py-4 text-base font-semibold text-white shadow-xl transition-all hover:-translate-y-0.5 ${theme.cta}`}
                >
                    {ctaLabel}
                </Link>
            </div>

            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
                {keyFacts.map((fact) => (
                    <div key={fact.title} className={`rounded-2xl border bg-white/80 p-4 text-left shadow-sm ${theme.keyFactCard}`}>
                        <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${theme.keyFactIcon}`}>
                            {fact.icon}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">{fact.title}</h3>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">{fact.text}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16 text-slate-500">
                {stats.map((stat, index) => (
                    <Fragment key={stat.label}>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                            <span className="text-sm font-medium">{stat.label}</span>
                        </div>
                        {index < stats.length - 1 && (
                            <div className={`hidden h-12 w-px ${theme.statsDivider} sm:block`} />
                        )}
                    </Fragment>
                ))}
            </div>
        </main>
    );
}
