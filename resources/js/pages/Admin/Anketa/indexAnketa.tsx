import { useEffect, useState } from 'react';

interface FormResultType {
    id: number;
    code: string;
    title: string;
    results: {
        title: string;
        fields: any[];
    };
}

export default function FormsList({ formResults }: { formResults: FormResultType[] }) {
    const [forms, setForms] = useState<FormResultType[]>([]);

    useEffect(() => {
        setForms(formResults);
        console.log('Form Results:', formResults);
    }, [formResults]);

    return (
        <div className="p-6">
            <h1 className="mb-4 text-3xl font-bold">All Forms</h1>

            <div className="space-y-4">
                {forms.map((form) => (
                    <a key={form.id} href={`/admin/anketa/show/${form.id}`}>
                        <div className="cursor-pointer rounded-lg bg-base-200 p-4 text-black shadow hover:bg-base-300">
                            <h2 className="text-xl font-bold">{form.id}</h2>
                            <h2 className="text-xl font-bold">{form.title}</h2>
                            <p className="text-sm opacity-70">Code: {form.code}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
