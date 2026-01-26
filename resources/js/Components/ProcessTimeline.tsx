import { ReactNode } from 'react';

type Step = {
    title: string;
    text: string;
};

type ProcessTimelineProps = {
    title: string;
    steps: Step[];
    footer?: ReactNode;
    currentStep?: number;
    ariaLabel?: string;
};

const Icons = {
    Check: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    ),
};

export default function ProcessTimeline({
    title,
    steps,
    footer,
    currentStep = 2,
    ariaLabel,
}: ProcessTimelineProps) {
    const currentIndex = Math.max(1, Math.min(currentStep, steps.length));

    return (
        <div className="relative z-10 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6 text-slate-900">{title}</h3>

            <ol className="flex-1 space-y-0" aria-label={ariaLabel ?? title}>
                {steps.map((step, i) => {
                    const stepNumber = i + 1;
                    const isCompleted = stepNumber < currentIndex;
                    const isCurrent = stepNumber === currentIndex;
                    const isLast = stepNumber === steps.length;
                    const markerClasses = isCompleted
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isCurrent
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-100 text-slate-500 border-slate-200';
                    const lineClasses = isCompleted ? 'bg-emerald-600' : 'bg-slate-200';

                    return (
                        <li
                            key={step.title}
                            className="relative flex gap-4 pb-8 last:pb-0 overflow-visible focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                            aria-current={isCurrent ? 'step' : undefined}
                            tabIndex={0}
                        >
                            {!isLast && (
                                <span
                                    aria-hidden="true"
                                    className={`absolute left-4 top-4 bottom-[-16px] w-0.5 ${lineClasses}`}
                                />
                            )}
                            <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${markerClasses}`}>
                                {isCompleted ? <Icons.Check className="h-4 w-4" /> : stepNumber}
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900">{step.title}</h4>
                                <p className="text-sm text-slate-600 mt-1">{step.text}</p>
                            </div>
                        </li>
                    );
                })}
            </ol>

            {footer && (
                <div className="mt-8 pt-6 border-t border-slate-200">
                    {footer}
                </div>
            )}
        </div>
    );
}
