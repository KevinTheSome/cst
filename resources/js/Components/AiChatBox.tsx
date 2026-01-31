import { useState } from 'react';
import axios from 'axios';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export default function AiChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // const res = await axios.post('/ai/chat', {
            //     message: userMessage.content,
            // });
            const res = await axios.post(
                '/ai/chat',
                { message: userMessage.content },
                {
                    headers: {
                        'X-CSRF-TOKEN': document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') ?? '',
                    },
                }
            );

            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: res.data.reply },
            ]);
        } catch (error: any) {
            console.error('AI chat error:', error);

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content:
                        error?.response?.data?.error ??
                        error?.message ??
                        'Something went wrong.',
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-[420px] overflow-y-auto p-4 space-y-4">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`rounded-xl px-4 py-2 text-sm max-w-[80%] ${
                            m.role === 'user'
                                ? 'ml-auto bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-900'
                        }`}
                    >
                        {m.content}
                    </div>
                ))}

                {loading && (
                    <div className="text-sm text-slate-500">Thinking…</div>
                )}
            </div>

            <div className="flex gap-2 border-t border-slate-200 p-4">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                    placeholder="Ask something…"
                />
                <button
                    onClick={sendMessage}
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
