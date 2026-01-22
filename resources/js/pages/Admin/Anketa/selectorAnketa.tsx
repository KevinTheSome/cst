import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FileText,
  Save,
  CheckCircle,
  AlertTriangle,
  Settings2,
  ChevronDown,
  Activity,
  User,
  Clock,
} from 'lucide-react';

// --- Interfaces ---
interface Multilingual {
  lv: string;
  en: string;
}

interface Field {
  label: Multilingual;
  options: {
    lv: string[];
    en: string[];
  };
}

interface FormResultType {
  id: number;
  code: string;
  title: Multilingual;
  data?: {
    title: Multilingual;
    fields: Field[];
  };
}

interface FormType {
  id: number;
  form_id: number;
  type: string;
}

interface SelectorAnketaProps {
  anketas: FormResultType[];
  formTypes: FormType[];
}

// Define the three distinct sections
const sectionDefinitions = [
  { type: 'psoriasis', labelKey: 'anketa.update.psoriasis', defaultLabel: 'Psiorāze', icon: Activity },
  { type: 'chronic', labelKey: 'anketa.update.chronic', defaultLabel: 'Hroniskās slimības', icon: Clock },
  { type: 'specialists', labelKey: 'anketa.update.specialist', defaultLabel: 'Speciālisti', icon: User },
] as const;

export default function SelectorAnketa({ anketas = [], formTypes = [] }: SelectorAnketaProps) {
  const { __ } = useLang();
  const page = usePage<any>();

  // ✅ ALWAYS use shared inertia locale (fixes stale locale prop bugs)
  const locale = (page.props?.locale ?? 'lv') as keyof Multilingual;

  // Stable sorted list (prevents weird select behavior when props refresh)
  const anketasSorted = useMemo(() => {
    return [...anketas].sort((a, b) => String(a.code).localeCompare(String(b.code)));
  }, [anketas]);

  // Selected mapping: { type -> form_id }
  const [selectedFormsByType, setSelectedFormsByType] = useState<{ [key: string]: number | null }>({});

  // ✅ Keep state in sync with backend (important after reload / language switch / save)
  useEffect(() => {
    const nextState: { [key: string]: number | null } = {};
    sectionDefinitions.forEach((section) => {
      const found = formTypes.find((ft) => ft.type === section.type);
      nextState[section.type] = found ? Number(found.form_id) : null;
    });
    setSelectedFormsByType(nextState);
  }, [formTypes]);

  // Custom Modal State for feedback
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });

  const [processingType, setProcessingType] = useState<string | null>(null);

  const handleFormSelection = (type: string, formIdStr: string) => {
    const formId = formIdStr ? Number(formIdStr) : null;
    setSelectedFormsByType((prev) => ({
      ...prev,
      [type]: formId,
    }));
  };

  const handleSave = (type: string) => {
    const formId = selectedFormsByType[type];

    if (!formId) {
      setModalState({
        isOpen: true,
        type: 'warning',
        title: __('anketa.selector.error_missing') || 'Izvēle ir obligāta',
        message: __('anketa.selector.error_missing') || 'Lūdzu, izvēlieties anketu pirms saglabāšanas.',
      });
      return;
    }

    setProcessingType(type);

    router.post(
      '/admin/selector/add',
      { form_id: formId, type },
      {
        preserveScroll: true,

        // ✅ IMPORTANT:
        // Reload BOTH formTypes and anketas to prevent the “anketas disappear” issue
        // when switching language and then changing select.
        onSuccess: () => {
          router.reload({
            preserveScroll: true,
            preserveState: true,
            only: ['formTypes', 'anketas', 'lang', 'locale'],
          });

          setModalState({
            isOpen: true,
            type: 'success',
            title: __('anketa.selector.success') || 'Saglabāts',
            message: __('anketa.selector.success') || 'Anketas piesaiste veiksmīgi saglabāta.',
          });

          setProcessingType(null);
        },
        onError: () => {
          setModalState({
            isOpen: true,
            type: 'error',
            title: __('anketa.selector.error') || 'Kļūda',
            message: __('anketa.selector.error') || 'Neizdevās saglabāt izmaiņas.',
          });
          setProcessingType(null);
        },
      }
    );
  };

  const closeModal = () => setModalState((prev) => ({ ...prev, isOpen: false }));

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <Head title={__('anketa.selector.page_title') || 'Anketu selektors'} />

      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Settings2 className="h-5 w-5 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  {__('anketa.selector.config') || 'Konfigurācija'}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-white tracking-tight">
                {__('anketa.selector.heading') || 'Piešķirt anketu tipus'}
              </h1>

              <p className="mt-2 text-slate-400 max-w-lg">
                {__('anketa.selector.subheading') || 'Izvēlieties tipu katrai anketei, lai noteiktu, kur nonāk iesniegumi.'}
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 gap-6">
          {sectionDefinitions.map(({ type, labelKey, defaultLabel, icon: Icon }) => {
            const selectedFormId = selectedFormsByType[type];
            const isProcessing = processingType === type;
            const selectedFormInfo = anketasSorted.find((a) => a.id === selectedFormId);

            return (
              <div
                key={type}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-slate-900/40 p-6 shadow-lg transition-all hover:bg-slate-900/60 ${
                  selectedFormId ? 'border-emerald-500/30 shadow-emerald-500/5' : 'border-white/10'
                }`}
              >
                {selectedFormId && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
                )}

                <div className="relative z-10">
                  {/* Section Header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-800 border border-white/5 text-slate-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{__(labelKey) || defaultLabel}</h2>
                  </div>

                  {/* Dropdown */}
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <FileText className="h-5 w-5" />
                    </div>

                    <select
                      value={selectedFormId ?? ''}
                      onChange={(e) => handleFormSelection(type, e.target.value)}
                      className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950/50 pl-10 pr-10 py-4 text-base text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer hover:bg-slate-950/70 truncate"
                    >
                      <option value="" disabled className="bg-slate-900 text-slate-500">
                        {__('anketa.selector.choose_form') || 'Izvēlies anketu...'}
                      </option>

                      {anketasSorted.map((form) => (
                        <option key={form.id} value={form.id} className="bg-slate-900 text-white">
                          [{form.code}] {form.title?.[locale] || form.title?.lv || form.title?.en || __('anketa.misc.untitled_form') || '—'}
                        </option>
                      ))}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between bg-slate-900/20 -mx-6 -mb-6 px-6 py-4">
                  <span
                    className={`text-sm font-medium transition-colors truncate mr-4 ${
                      selectedFormId ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    {selectedFormId && selectedFormInfo
                      ? `${__('anketa.selector.selected') || 'Izvēlēts'}: ${selectedFormInfo.code}`
                      : __('anketa.selector.none_selected') || 'Nav izvēlēta anketa'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSave(type)}
                    disabled={!selectedFormId || isProcessing}
                    className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all ${
                      !selectedFormId
                        ? 'cursor-not-allowed bg-slate-800 text-slate-500'
                        : isProcessing
                        ? 'cursor-wait bg-emerald-500/50 text-white'
                        : 'bg-emerald-500 text-slate-900 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20'
                    }`}
                  >
                    {isProcessing ? (
                      __('anketa.selector.saving') || 'Notiek saglabāšana...'
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {__('anketa.selector.save') || 'Saglabāt'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" onClick={closeModal} />
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div
                className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border ${
                  modalState.type === 'success'
                    ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                    : modalState.type === 'error'
                    ? 'border-rose-500/20 bg-rose-500/10 text-rose-500'
                    : 'border-amber-500/20 bg-amber-500/10 text-amber-500'
                }`}
              >
                {modalState.type === 'success' && <CheckCircle className="h-8 w-8" />}
                {(modalState.type === 'error' || modalState.type === 'warning') && <AlertTriangle className="h-8 w-8" />}
              </div>

              <h3 className="mb-2 text-xl font-bold text-white">{modalState.title}</h3>
              <p className="mb-6 text-sm text-slate-400 leading-relaxed">{modalState.message}</p>

              <button
                onClick={closeModal}
                className="w-full rounded-xl bg-slate-800 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-700"
              >
                {__('common.close') || 'Aizvērt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

(SelectorAnketa as any).layout = (page: React.ReactNode) => <AdminLayout title="Selector">{page}</AdminLayout>;
