//TaskDetailsModal.tsx
//I'm not creating a separate task page for now, I don't know what i would fill it with
//I'm following my mockup image in "Forge/mockupImages"

//context for user check
import { useAuth } from "../../context/authContext";

//icons
import { X } from "lucide-react";

//components
import { StatusBadge } from "../StatusBadge";

//types
import type { FetchedTaskData } from "../../services/taskService";


interface TaskDetailModalProp{
    task: FetchedTaskData;
    projectOwnerId: string;
    onClose: () => void;
    onStatusChange: (shortId: string, status: string) => Promise<void>
    onEdit?: () => void;
}

export function TaskDetailModal({ task, projectOwnerId, onClose, onStatusChange, onEdit }: TaskDetailModalProp){
    const { user } = useAuth();
    const isOwner = projectOwnerId === user?.id;

    return (
        //html to come
           <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white border border-gray-200 rounded-xl w-full max-w-2xl flex overflow-hidden" style={{ height: "520px" }}>
                
                {/* Left - Task Details */}
                <div className="flex-1 flex flex-col p-6 border-r border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                        <h2 className="text-base font-semibold text-forge-login-text pr-4">{task.title}</h2>
                        <div className="flex items-center gap-2 shrink-0">
                            {isOwner && onEdit && (
                                <button
                                    onClick={onEdit}
                                    className="px-3 h-7 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    Edit
                                </button>
                            )}
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {task.description && (
                        <p className="text-sm text-forge-muted mb-4">{task.description}</p>
                    )}

                    <div className="flex items-center gap-4 mb-6">
                        <div>
                            <p className="text-xs text-forge-muted mb-1">Status</p>
                            <StatusBadge
                                status={(task.status ?? "TODO") as "TODO" | "IN_PROGRESS" | "COMPLETED"}
                                onStatusChange={(s) => onStatusChange(task.shortId, s)}
                            />
                        </div>
                        <div>
                            <p className="text-xs text-forge-muted mb-1">Due Date</p>
                            <p className="text-sm text-forge-login-text">
                                {task.dueDate
                                    ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                                    : "No due date"}
                            </p>
                        </div>
                    </div>

                    {/* Chat placeholder */}
                    <div className="flex-1 rounded-lg border border-dashed border-gray-200 flex items-center justify-center">
                        <p className="text-sm text-forge-muted">Chat coming soon</p>
                    </div>
                </div>

                {/* Right - Owner & Members */}
                <div className="w-48 flex flex-col p-4 gap-4">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Owner</p>
                        <p className="text-sm text-forge-login-text">{projectOwnerId === user?.id ? "You" : "Project Owner"}</p>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Assigned</p>
                        {task.assignees?.length === 0 ? (
                            <p className="text-xs text-forge-muted">No assignees</p>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {task.assignees?.map((a) => (
                                    <div key={a.userId} className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0">
                                            <span className="text-white text-xs">{a.user?.name.charAt(0).toUpperCase() ?? a.user?.email.charAt(0).toUpperCase() ?? "Unknown User"}</span>
                                        </div>
                                        <span className="text-xs text-forge-login-text truncate">{a.user?.name ?? a.user?.email}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )

}