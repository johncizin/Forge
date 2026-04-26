import { useState } from "react";
import { UserPlus } from "lucide-react";


interface InviteData {
    email: string;
}

interface CreateInviteModalProp {
    onClose: () => void;
    onCreate: (data: InviteData) => Promise<void>;
}

export function CreateInviteModal({ onClose, onCreate }: CreateInviteModalProp) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!email.trim()) return;
        setLoading(true);
        await onCreate({ email });
        setLoading(false);
        onClose();
    }

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white border border-gray-200 rounded-xl p-7 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                            <UserPlus size={16} color="white" />
                        </div>
                        <span className="text-sm font-medium">Invite to project</span>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="colleague@example.com"
                            className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-black"
                        />
                    </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                    <button onClick={onClose} className="px-4 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!email.trim() || loading}
                        className="px-4 h-9 rounded-lg bg-black text-white text-sm font-medium disabled:opacity-40"
                    >
                        {loading ? "Sending..." : "Send invite"}
                    </button>
                </div>
            </div>
        </div>
    );
}