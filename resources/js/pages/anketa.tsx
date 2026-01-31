import { Head, Link } from '@inertiajs/react';
import { useLang } from '@/hooks/useLang';
import { FormEvent, useEffect, useMemo, useState } from 'react';

// --- ICONS ---
const Icons = {
  User: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  ),
  Calendar: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  ),
  Globe: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3s-4.5 3.97-4.5 9 2.015 9 4.5 9zM13.5 5.49L12.555 2.1a9.01 9.01 0 01-.865 0l-.945 3.39"
      />
    </svg>
  ),
  Activity: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
      />
    </svg>
  ),
  Check: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Alert: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  ChevronLeft: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  ),
};

type Questionnaire = {
  gender: string;
  ageGroup: string;
  country: string;
  countryOther: string;
  diseases: string[];
  otherDisease: string;
  severity: string;
  therapy: string;
};

export default function Anketa() {
  const { __, has } = useLang();

  // helper: safe translation with fallback key (useful if LV/EN files differ slightly)
  const t = (key: string, fallbackKey?: string) => {
    if (has(key)) return __(key);
    if (fallbackKey && has(fallbackKey)) return __(fallbackKey);
    return key;
  };

  // OPTIONS (values are still the displayed strings; minimal change to your current backend storage)
  const genderOptions = useMemo(
    () => [t('pacientu_anketa.options.gender.male'), t('pacientu_anketa.options.gender.female')],
    [__]
  );

  const ageGroups = useMemo(
    () => [
      t('pacientu_anketa.options.age.0_18'),
      t('pacientu_anketa.options.age.19_35'),
      t('pacientu_anketa.options.age.36_50'),
      t('pacientu_anketa.options.age.51_plus'),
    ],
    [__]
  );

  const countries = useMemo(
    () => [
      t('pacientu_anketa.options.country.lv'),
      t('pacientu_anketa.options.country.lt'),
      t('pacientu_anketa.options.country.ee'),
      t('pacientu_anketa.options.country.fi'),
      t('pacientu_anketa.options.country.se'),
      t('pacientu_anketa.options.country.no'),
      t('pacientu_anketa.options.country.de'),
      t('pacientu_anketa.options.country.pl'),
      t('pacientu_anketa.options.country.other'),
    ],
    [__]
  );

  const diseaseOptions = useMemo(
    () => [
      t('pacientu_anketa.options.diseases.blood', 'pacientu_anketa.options.disease.blood'),
      t('pacientu_anketa.options.diseases.autoimmune', 'pacientu_anketa.options.disease.autoimmune'),
      t('pacientu_anketa.options.diseases.neuro', 'pacientu_anketa.options.disease.neuro'),
      t('pacientu_anketa.options.diseases.diabetes', 'pacientu_anketa.options.disease.diabetes'),
      t('pacientu_anketa.options.diseases.heart', 'pacientu_anketa.options.disease.heart'),
      t('pacientu_anketa.options.diseases.other', 'pacientu_anketa.options.disease.other'),
    ],
    [__]
  );

  const severityLevels = useMemo(
    () => [
      t('pacientu_anketa.options.severity.mild'),
      t('pacientu_anketa.options.severity.moderate'),
      t('pacientu_anketa.options.severity.severe'),
    ],
    [__]
  );

  const yesNoOptions = useMemo(
    () => [t('pacientu_anketa.options.therapy.yes', 'pacientu_anketa.options.yes'), t('pacientu_anketa.options.therapy.no', 'pacientu_anketa.options.no')],
    [__]
  );

  const [formData, setFormData] = useState<Questionnaire>({
    gender: '',
    ageGroup: '',
    country: '',
    countryOther: '',
    diseases: [],
    otherDisease: '',
    severity: '',
    therapy: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<keyof Questionnaire, boolean>>>({});
  const [isFinished, setIsFinished] = useState(false);

  const setField = (field: keyof Questionnaire, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    setSubmitError(null);
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => {
      const exists = prev.diseases.includes(value);
      return {
        ...prev,
        diseases: exists ? prev.diseases.filter((item) => item !== value) : [...prev.diseases, value],
      };
    });
    setTouched((prev) => ({ ...prev, diseases: true }));
    setSubmitError(null);
  };

  const getStepErrors = (step: number, data: Questionnaire) => {
    const errors: Partial<Record<keyof Questionnaire, string>> = {};

    // local "Other" values (whatever the translated label is)
    const countryOtherLabel = t('pacientu_anketa.options.country.other');
    const diseaseOtherLabel = t('pacientu_anketa.options.diseases.other', 'pacientu_anketa.options.disease.other');

    if (step === 0) {
      if (!data.gender) errors.gender = __('pacientu_anketa.errors.gender');
      if (!data.ageGroup) errors.ageGroup = __('pacientu_anketa.errors.age');
      if (!data.country) errors.country = __('pacientu_anketa.errors.country');
      if (data.country === countryOtherLabel && !data.countryOther.trim()) {
        errors.countryOther = __('pacientu_anketa.errors.country_other');
      }
    } else if (step === 1) {
      if (data.diseases.length === 0) errors.diseases = __('pacientu_anketa.errors.diseases');
      if (data.diseases.includes(diseaseOtherLabel) && !data.otherDisease.trim()) {
        errors.otherDisease = __('pacientu_anketa.errors.other_disease');
      }
    } else if (step === 2) {
      if (!data.severity) errors.severity = __('pacientu_anketa.errors.severity');
      if (!data.therapy) errors.therapy = __('pacientu_anketa.errors.therapy');
    }

    return errors;
  };

  const getStepBanner = (step: number, errors: Partial<Record<keyof Questionnaire, string>>) => {
    if (Object.keys(errors).length === 0) return null;
    if (step === 1) return errors.diseases ?? __('pacientu_anketa.errors.diseases');
    if (step === 2) return __('pacientu_anketa.errors.required');
    return __('pacientu_anketa.errors.required_all');
  };

  const stepErrors = useMemo(() => getStepErrors(currentStep, formData), [currentStep, formData]);

  const visibleErrors = useMemo(() => {
    const errors: Partial<Record<keyof Questionnaire, string>> = {};
    (Object.keys(stepErrors) as (keyof Questionnaire)[]).forEach((key) => {
      if (attemptedSubmit || touched[key]) {
        errors[key] = stepErrors[key];
      }
    });
    return errors;
  }, [attemptedSubmit, stepErrors, touched]);

  // If user fixes errors after trying, clear banner
  useEffect(() => {
    if (attemptedSubmit && Object.keys(stepErrors).length === 0) {
      setValidationMessage(null);
    }
  }, [attemptedSubmit, stepErrors]);

  // NOTE: We still reset on step change (good), but we ALSO clear BEFORE changing steps to avoid any flash.
  useEffect(() => {
    setAttemptedSubmit(false);
    setValidationMessage(null);
    setSubmitError(null);
    setTouched({});
  }, [currentStep]);

  const slides = useMemo(
    () => [
      {
        title: t('pacientu_anketa.steps.demographics.title'),
        description: t('pacientu_anketa.steps.demographics.desc'),
        content: (
          <div className="space-y-8">
            {/* Gender */}
            <div className="space-y-3" data-field="gender">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                <Icons.User className="h-4 w-4" /> {t('pacientu_anketa.fields.gender')}
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                {genderOptions.map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer relative flex items-center justify-center rounded-xl border p-4 text-sm font-semibold transition-all duration-200 ${
                      formData.gender === option
                        ? 'border-teal-500 bg-teal-50 text-teal-800 shadow-sm ring-1 ring-teal-500'
                        : visibleErrors.gender
                          ? 'border-rose-300 bg-rose-50/60 text-rose-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={() => setField('gender', option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
              {visibleErrors.gender && <p className="text-xs text-rose-600 font-semibold">{visibleErrors.gender}</p>}
            </div>

            {/* Age */}
            <div className="space-y-3" data-field="ageGroup">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                <Icons.Calendar className="h-4 w-4" /> {t('pacientu_anketa.fields.age')}
              </label>
              <div className="grid grid-cols-4 gap-3">
                {ageGroups.map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer relative flex items-center justify-center rounded-xl border p-3 text-sm font-semibold transition-all duration-200 ${
                      formData.ageGroup === option
                        ? 'border-teal-500 bg-teal-50 text-teal-800 shadow-sm ring-1 ring-teal-500'
                        : visibleErrors.ageGroup
                          ? 'border-rose-300 bg-rose-50/60 text-rose-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="ageGroup"
                      value={option}
                      checked={formData.ageGroup === option}
                      onChange={() => setField('ageGroup', option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
              {visibleErrors.ageGroup && (
                <p className="text-xs text-rose-600 font-semibold">{visibleErrors.ageGroup}</p>
              )}
            </div>

            {/* Country */}
            <div className="space-y-3" data-field="country">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                <Icons.Globe className="h-4 w-4" /> {t('pacientu_anketa.fields.country')}
              </label>

              <div className="relative">
                <select
                  id="country"
                  value={formData.country}
                  onChange={(event) => {
                    const value = event.target.value;
                    setField('country', value);
                    if (value !== t('pacientu_anketa.options.country.other')) {
                      setField('countryOther', '');
                    }
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, country: true }))}
                  className={`w-full appearance-none rounded-xl border bg-slate-50 px-4 py-3.5 text-base text-slate-900 outline-none transition focus:bg-white focus:ring-1 focus:ring-teal-500 ${
                    visibleErrors.country ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200 focus:border-teal-500'
                  }`}
                >
                  <option value="">{t('pacientu_anketa.placeholders.country', 'pacientu_anketa.placeholders.select_country')}</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>

              {visibleErrors.country && <p className="text-xs text-rose-600 font-semibold">{visibleErrors.country}</p>}

              {formData.country === t('pacientu_anketa.options.country.other') && (
                <div className="animate-fade-in-up" data-field="countryOther">
                  <input
                    type="text"
                    value={formData.countryOther}
                    onChange={(event) => setField('countryOther', event.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, countryOther: true }))}
                    placeholder={t('pacientu_anketa.placeholders.country_other')}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none focus:ring-1 ${
                      visibleErrors.countryOther
                        ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-200'
                        : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500'
                    }`}
                  />
                  {visibleErrors.countryOther && (
                    <p className="mt-2 text-xs text-rose-600 font-semibold">{visibleErrors.countryOther}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ),
      },
      {
        title: t('pacientu_anketa.steps.health.title'),
        description: t('pacientu_anketa.steps.health.desc'),
        content: (
          <div className="space-y-6" data-field="diseases">
            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
              <Icons.Activity className="h-4 w-4" /> {t('pacientu_anketa.fields.diseases')}
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              {diseaseOptions.map((option) => {
                const isChecked = formData.diseases.includes(option);
                return (
                  <label
                    key={option}
                    className={`cursor-pointer relative flex items-center gap-4 rounded-xl border p-4 text-sm font-semibold transition-all duration-200 ${
                      isChecked
                        ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm ring-1 ring-teal-500'
                        : visibleErrors.diseases
                          ? 'border-rose-300 bg-rose-50/60 text-rose-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                        isChecked ? 'bg-teal-500 border-teal-500' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <Icons.Check className="h-3.5 w-3.5 text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(option)}
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>

            {visibleErrors.diseases && <p className="text-xs text-rose-600 font-semibold">{visibleErrors.diseases}</p>}

            {formData.diseases.includes(
              t('pacientu_anketa.options.diseases.other', 'pacientu_anketa.options.disease.other')
            ) && (
              <div className="animate-fade-in-up" data-field="otherDisease">
                <label className="block mb-2 text-xs font-semibold text-slate-500">
                  {t('pacientu_anketa.fields.other_disease', 'pacientu_anketa.fields.other_disease_label')}
                </label>
                <input
                  type="text"
                  value={formData.otherDisease}
                  onChange={(event) => setField('otherDisease', event.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, otherDisease: true }))}
                  placeholder={t('pacientu_anketa.placeholders.other_disease')}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none focus:ring-1 ${
                    visibleErrors.otherDisease
                      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500'
                  }`}
                />
                {visibleErrors.otherDisease && (
                  <p className="mt-2 text-xs text-rose-600 font-semibold">{visibleErrors.otherDisease}</p>
                )}
              </div>
            )}
          </div>
        ),
      },
      {
        title: t('pacientu_anketa.steps.therapy.title'),
        description: t('pacientu_anketa.steps.therapy.desc'),
        content: (
          <div className="space-y-8">
            <div className="space-y-3" data-field="severity">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">
                {t('pacientu_anketa.fields.severity')}
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                {severityLevels.map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer relative flex items-center justify-center rounded-xl border p-4 text-sm font-semibold transition-all duration-200 ${
                      formData.severity === option
                        ? 'border-teal-500 bg-teal-50 text-teal-800 shadow-sm ring-1 ring-teal-500'
                        : visibleErrors.severity
                          ? 'border-rose-300 bg-rose-50/60 text-rose-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="severity"
                      value={option}
                      checked={formData.severity === option}
                      onChange={() => setField('severity', option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
              {visibleErrors.severity && <p className="text-xs text-rose-600 font-semibold">{visibleErrors.severity}</p>}
            </div>

            <div className="space-y-3" data-field="therapy">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">
                {t('pacientu_anketa.fields.therapy')}
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                {yesNoOptions.map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer relative flex items-center justify-center rounded-xl border p-4 text-sm font-semibold transition-all duration-200 ${
                      formData.therapy === option
                        ? 'border-teal-500 bg-teal-50 text-teal-800 shadow-sm ring-1 ring-teal-500'
                        : visibleErrors.therapy
                          ? 'border-rose-300 bg-rose-50/60 text-rose-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="therapy"
                      value={option}
                      checked={formData.therapy === option}
                      onChange={() => setField('therapy', option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
              {visibleErrors.therapy && <p className="text-xs text-rose-600 font-semibold">{visibleErrors.therapy}</p>}
            </div>
          </div>
        ),
      },
    ],
    [__, formData, visibleErrors, genderOptions, ageGroups, countries, diseaseOptions, severityLevels, yesNoOptions]
  );

  const focusFirstError = (errors: Partial<Record<keyof Questionnaire, string>>, step: number) => {
    const order: (keyof Questionnaire)[] =
      step === 0 ? ['gender', 'ageGroup', 'country', 'countryOther'] : step === 1 ? ['diseases', 'otherDisease'] : ['severity', 'therapy'];

    const firstKey = order.find((key) => errors[key]);
    if (!firstKey) return;

    const container = document.querySelector(`[data-field="${firstKey}"]`);
    if (!container) return;

    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const focusable = container.querySelector('input, select, textarea, button');
    if (focusable instanceof HTMLElement) focusable.focus();
  };

  const validateStep = (step: number, shouldShowErrors: boolean): boolean => {
    const errors = getStepErrors(step, formData);

    if (Object.keys(errors).length > 0) {
      if (shouldShowErrors) {
        setAttemptedSubmit(true);
        setValidationMessage(getStepBanner(step, errors));
        focusFirstError(errors, step);
      }
      return false;
    }

    if (shouldShowErrors) {
      setAttemptedSubmit(false);
      setValidationMessage(null);
    }
    return true;
  };

  // ✅ FIX: clear any “error mode” BEFORE changing steps (prevents red flash on Therapy step)
  const clearValidationUI = () => {
    setAttemptedSubmit(false);
    setValidationMessage(null);
    setSubmitError(null);
    setTouched({});
  };

  const nextStep = () => {
    // user explicitly tried to proceed → show validation if needed
    if (!validateStep(currentStep, true)) return;

    clearValidationUI();
    setCurrentStep((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevStep = () => {
    clearValidationUI();
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // user explicitly tried to submit → show validation if needed
    if (!validateStep(currentStep, true)) return;

    const payload = {
      code: 'anketa',
      title: t('pacientu_anketa.form_title'),
      answers: formData,
    };

    const tokenMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
    const csrf = tokenMeta?.content ?? '';

    try {
      const res = await fetch('/anketa/store-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setSubmitError(__('pacientu_anketa.errors.submit_error'));
        return;
      }

      const json = await res.json();
      if (json?.ok) {
        clearValidationUI();
        setIsFinished(true);
      } else {
        setSubmitError(json?.message ?? __('pacientu_anketa.errors.unknown_error'));
      }
    } catch (err) {
      console.error(err);
      setSubmitError(__('pacientu_anketa.errors.connection_error'));
    }
  };

  const isLastStep = currentStep === slides.length - 1;
  const progress = ((currentStep + 1) / slides.length) * 100;

  return (
    <>
      <Head title={t('pacientu_anketa.page_title')} />

      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
        {/* BACKGROUND TECH GRID */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-teal-400 opacity-20 blur-[100px]" />
          <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-cyan-400 opacity-10 blur-[120px]" />
        </div>

        <section className="relative z-10 mx-auto min-h-screen max-w-3xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-teal-600 hover:border-teal-200"
            >
              <Icons.ChevronLeft className="h-4 w-4" />
              {t('pacientu_anketa.back_home')}
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50/80 backdrop-blur px-3 py-1 text-xs font-semibold text-teal-700 mb-6">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              {t('pacientu_anketa.portal_chip')}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t('pacientu_anketa.heading')}</h1>
          </div>

          {!isFinished ? (
            <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
              {/* Progress Bar */}
              <div className="px-8 pt-8 pb-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <span>
                    {t('pacientu_anketa.progress.step')} {currentStep + 1} / {slides.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                {(submitError || (attemptedSubmit && validationMessage)) && (
                  <div className="mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                    <Icons.Alert className="h-5 w-5 shrink-0" />
                    {submitError ?? validationMessage}
                  </div>
                )}

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">{slides[currentStep].title}</h2>
                  <p className="text-slate-500">{slides[currentStep].description}</p>
                </div>

                <div className="animate-fade-in">{slides[currentStep].content}</div>

                <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-between border-t border-slate-100 pt-6">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      <Icons.ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      {t('pacientu_anketa.actions.back')}
                    </button>
                  ) : (
                    <div />
                  )}

                  {isLastStep ? (
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:bg-teal-600 hover:shadow-teal-500/30"
                    >
                      {t('pacientu_anketa.actions.submit')} <Icons.Check className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:bg-teal-600 hover:shadow-teal-500/30"
                    >
                      {t('pacientu_anketa.actions.next')} <Icons.ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="rounded-3xl border border-teal-100 bg-white p-12 text-center shadow-xl shadow-teal-100/50">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-teal-500">
                <Icons.Check className="h-10 w-10" />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('pacientu_anketa.finish.title', 'pacientu_anketa.success.title')}</h2>

              <p className="text-lg text-slate-600 whitespace-pre-line">
                {t('pacientu_anketa.finish.message', 'pacientu_anketa.success.message')}
              </p>

              <button
                onClick={() => window.location.reload()}
                className="mt-8 text-sm font-semibold text-teal-600 hover:text-teal-700 hover:underline"
              >
                {t('pacientu_anketa.finish.restart', 'pacientu_anketa.actions.restart')}
              </button>
            </div>
          )}
        </section>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeInUp 0.4s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
      `}</style>
    </>
  );
}
