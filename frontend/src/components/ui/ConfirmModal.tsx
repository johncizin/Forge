//for confirmation on delete and update (maybe) - lower stakes, and confirming removing member from project or task

//simple and reusable

//icons
import { X } from "lucide-react";

interface ConfirmModalProps {
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => Promise<void> | void;
    onClose: () => void;
}

export function ConfirmModal({ title, message, confirmLabel = "Delete", onConfirm, onClose }: ConfirmModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-sm">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-forge-login-text">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={16} />
                    </button>
                </div>
                <p className="text-sm text-forge-muted mb-6">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 h-9 rounded-lg bg-red-500 text-white text-sm font-medium hover:opacity-80"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}