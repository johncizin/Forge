//UI view component for project member list, reused for adding members to task, and for view pending, accepted, reject, inivtes sent to them and sent from the user in their settings page
import type { MemberData } from "../../hooks/membershipHook";

interface MemberListProps {
    members: MemberData[];
    selectedIds?: string[];
    onSelect?: (id: string) => void;
    onInviteClick?: () => void;
    selectable?: boolean;
}

export function MemberList({ members, selectedIds = [], onSelect, onInviteClick, selectable }: MemberListProps) {
    if (members.length === 0) {
        return (
            <div className="flex flex-col items-center gap-2 py-3 text-center">
                <p className="text-xs text-forge-muted">No members yet</p>
                {onInviteClick && (
                    <button
                        onClick={onInviteClick}
                        className="text-xs font-medium text-black underline hover:opacity-70"
                    >
                        Invite someone
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1">
            {members.map((member) => {
                const selected = selectedIds.includes(member.id);
                return (
                    <div
                        key={member.id}
                        onClick={() => selectable && onSelect?.(member.id)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                            selectable ? "cursor-pointer hover:bg-gray-50" : ""
                        } ${selected ? "bg-gray-100" : ""}`}
                    >
                        <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center shrink-0">
                            <span className="text-white text-xs font-medium">
                                {member.name?.charAt(0).toUpperCase() ?? "?"}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-forge-login-text truncate">{member.name}</p>
                            <p className="text-xs text-forge-muted truncate">{member.email}</p>
                        </div>
                        {selectable && selected && (
                            <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center shrink-0">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}