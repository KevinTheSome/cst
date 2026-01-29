import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import AiChatBox from '@/Components/AiChatBox';

export default function AiAssistant() {
    return (
        <>
            <Head title="AI Assistant" />

            <div className="min-h-screen bg-slate-50 flex flex-col">

                <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-10">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-slate-900">
                            AI Assistant
                        </h1>
                        <p className="mt-2 text-slate-600">
                            Ask questions based on our internal knowledge base.
                        </p>
                    </div>

                    <AiChatBox />
                </main>
            </div>
        </>
    );
}
