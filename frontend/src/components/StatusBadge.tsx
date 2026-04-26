import { useState, useRef } from 'react';

type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

interface StatusBadgeProps{
    status: TaskStatus, 
    onStatusChange: (newStatus: TaskStatus) => Promise<void>
    disabled?: boolean
}

const statusConfig = {
    TODO: {
        label: "Todo",
        classes: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    },
    IN_PROGRESS: {
        label: "In Progress",
        classes: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    },
    COMPLETED: {
        label: "Completed",
        classes: "bg-green-100 text-green-700 hover:bg-green-200",
    },
};

const cycleStatus = (current: TaskStatus): TaskStatus => {
    const cycle: TaskStatus[] = ["TODO", "IN_PROGRESS", "COMPLETED"];
    return cycle[(cycle.indexOf(current) + 1) % cycle.length];
};

export function StatusBadge({ status, onStatusChange, disabled }: StatusBadgeProps) {
    const [showMenu, setShowMenu] = useState(false);
    //ref is persistant between renders and doesnt rerender
    const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    // debounce to prevent click after hold
    const didHold = useRef(false);

    //if held for 500ms, show menu, otherwise cycle status on click
    const handleMouseDown = () => {
        didHold.current = false;
        holdTimer.current = setTimeout(() => {
            didHold.current = true;
            setShowMenu(true);
        }, 500);
    };

    //clear timer
    const handleMouseUp = () => {
        if (holdTimer.current) clearTimeout(holdTimer.current);
    };
    //cycle or show
    const handleClick = () => {
        if (didHold.current) return;
        onStatusChange(cycleStatus(status));
    };

    //handle menu select
    const handleSelect = (s: TaskStatus) => {
        setShowMenu(false);
        onStatusChange(s);
    };

    //easier styling
    const config = statusConfig[status];
//otherwise this is just abstracted out because im going to use it for both card and list view
    return (
        <div className="relative inline-block">
            <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={handleClick}
                disabled={disabled}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors select-none ${config.classes} disabled:opacity-40`}
            >
                {config.label}
            </button>

            {showMenu && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                    <div className="absolute bottom-full mb-1 left-0 z-20 bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden min-w-32.5">
                        {(Object.keys(statusConfig) as TaskStatus[]).map((s) => (
                            <button
                                key={s}
                                onClick={() => handleSelect(s)}
                                className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-50 ${s === status ? "opacity-40" : ""}`}
                            >
                                <span className={`inline-block px-2 py-0.5 rounded-full ${statusConfig[s].classes}`}>
                                    {statusConfig[s].label}
                                </span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

