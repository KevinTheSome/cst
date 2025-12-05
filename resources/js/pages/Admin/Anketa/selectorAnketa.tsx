import AdminLayout from '@/Layouts/AdminLayout';
import { useLang } from '@/hooks/useLang';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { 
    FileText, 
    Save, 
    CheckCircle, 
    AlertTriangle, 
    Settings2, 
    LayoutList, 
    ChevronDown,
    Activity,
    User,
    Clock
} from 'lucide-react';

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
    data: {
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
    locale: keyof Multilingual;
}

// --- Icons for Type Options ---
const getTypeIcon = (type: string) => {
    switch (type) {
        case 'specialists': return <User className="h-4 w-4" />;
        case 'psoriasis': return <Activity className="h-4 w-4" />;
        case 'chronic': return <Clock className="h-4 w-4" />;
        default: return <FileText className="h-4 w-4" />;
    }
};

export default function SelectorAnketa({ anketas = [], formTypes = [], locale = 'lv' as keyof Multilingual }: SelectorAnketaProps) {
    const { __ } = useLang();

    // Pre-fill selected types from formTypes
    const initialSelections: Record<number, string> = {};
    formTypes.forEach((ft) => {
        initialSelections[ft.form_id] = ft.type;
    });

    const [selectedTypes, setSelectedTypes] = useState<Record<number, string>>(initialSelections);
    
    // Custom Modal State
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

    const [processingId, setProcessingId] = useState<number | null>(null);

    const handleTypeChange = (formId: number, type: string) => {
        setSelectedTypes((prev) => ({
            ...prev,
            [formId]: type,
        }));
    };

    const handleSave = (formId: number) => {
        const type = selectedTypes[formId];
        
        if (!type) {
            setModalState({
                isOpen: true,
                type: 'warning',
                title: __('anketa.selector.error_missing') || 'Missing Selection',
                message: 'Please select a form type before saving.'
            });
            return;
        }

        setProcessingId(formId);

        router.post(
            '/admin/selector/add',
            {
                form_id: formId,
                type: type,
            },
            {
                onSuccess: () => {
                    setModalState({
                        isOpen: true,
                        type: 'success',
                        title: 'Success',
                        message: __('anketa.selector.success') || 'Form type assigned successfully.'
                    });
                    setProcessingId(null);
                },
                onError: (errors) => {
                    console.error(errors);
                    setModalState({
                        isOpen: true,
                        type: 'error',
                        title: 'Error',
                        message: __('anketa.selector.error') || 'Failed to save changes.'
                    });
                    setProcessingId(null);
                },
            },
        );
    };

    const closeModal = () => {
        setModalState(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <Head title={__('anketa.selector.page_title')} />

            {/* --- Main Container --- */}
            <div className="mx-auto max-w-7xl space-y-8">
                
                {/* --- Header Card --- */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
                    <div className="relative z-10 flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Settings2 className="h-5 w-5 text-blue-400" />
                                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Configuration</span>
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">{__('anketa.selector.heading')}</h1>
                            <p className="mt-2 text-slate-400 max-w-lg">{__('anketa.selector.subheading')}</p>
                        </div>
                    </div>
                </div>

                {/* --- Content Grid --- */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {anketas.map((form) => {
                        const currentType = selectedTypes[form.id] || '';
                        
                        return (
                            <div 
                                key={form.id} 
                                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-slate-900/40 p-6 shadow-lg transition-all hover:bg-slate-900/60 ${
                                    currentType 
                                    ? 'border-emerald-500/30 shadow-emerald-500/5' 
                                    : 'border-white/10'
                                }`}
                            >
                                {/* Decorative gradient if active */}
                                {currentType && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                                )}

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-800 border border-white/5 text-slate-300">
                                            <LayoutList className="h-5 w-5" />
                                        </div>
                                        <span className="font-mono text-xs text-slate-500 bg-slate-950/50 px-2 py-1 rounded-md border border-white/5">
                                            {form.code}
                                        </span>
                                    </div>
                                    
                                    <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem]">
                                        {form.title?.[locale] || __('anketa.update.form_title_placeholder')}
                                    </h2>

                                    {/* Selector */}
                                    <div className="relative mt-4">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                            {currentType ? getTypeIcon(currentType) : <FileText className="h-4 w-4" />}
                                        </div>
                                        <select
                                            value={currentType}
                                            onChange={(e) => handleTypeChange(form.id, e.target.value)}
                                            className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950/50 pl-10 pr-10 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer hover:bg-slate-950/70"
                                        >
                                            <option value="" disabled className="bg-slate-900 text-slate-500">{__('anketa.selector.select_type')}</option>
                                            <option value="specialists" className="bg-slate-900">{__('anketa.update.specialist')}</option>
                                            <option value="psoriasis" className="bg-slate-900">{__('anketa.update.psoriasis')}</option>
                                            <option value="chronic" className="bg-slate-900">{__('anketa.update.chronic')}</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className={`text-xs font-medium transition-colors ${currentType ? 'text-emerald-400' : 'text-slate-500'}`}>
                                        {currentType ? 'Type Assigned' : 'No Type Selected'}
                                    </span>
                                    
                                    <button
                                        type="button"
                                        onClick={() => handleSave(form.id)}
                                        disabled={!currentType || processingId === form.id}
                                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                                            !currentType 
                                                ? 'cursor-not-allowed bg-slate-800 text-slate-500' 
                                                : processingId === form.id
                                                    ? 'cursor-wait bg-emerald-500/50 text-white'
                                                    : 'bg-emerald-500 text-slate-900 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20'
                                        }`}
                                    >
                                        {processingId === form.id ? (
                                            'Saving...'
                                        ) : (
                                            <>
                                                <Save className="h-3.5 w-3.5" />
                                                {__('anketa.selector.save')}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {anketas.length === 0 && (
                        <div className="col-span-full rounded-3xl border border-dashed border-white/10 bg-slate-900/30 p-12 text-center text-slate-400">
                            <FileText className="mx-auto h-12 w-12 opacity-20 mb-3" />
                            <p>{__('anketa.selector.no_results')}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- Custom Notification Modal --- */}
            {modalState.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
                        onClick={closeModal}
                    />
                    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border ${
                                modalState.type === 'success' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500' :
                                modalState.type === 'error' ? 'border-rose-500/20 bg-rose-500/10 text-rose-500' :
                                'border-amber-500/20 bg-amber-500/10 text-amber-500'
                            }`}>
                                {modalState.type === 'success' && <CheckCircle className="h-8 w-8" />}
                                {modalState.type === 'error' && <AlertTriangle className="h-8 w-8" />}
                                {modalState.type === 'warning' && <AlertTriangle className="h-8 w-8" />}
                            </div>
                            
                            <h3 className="mb-2 text-xl font-bold text-white">
                                {modalState.title}
                            </h3>
                            
                            <p className="mb-6 text-sm text-slate-400 leading-relaxed">
                                {modalState.message}
                            </p>

                            <button
                                onClick={closeModal}
                                className="w-full rounded-xl bg-slate-800 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

(SelectorAnketa as any).layout = (page: React.ReactNode) => <AdminLayout title="Selector">{page}</AdminLayout>;