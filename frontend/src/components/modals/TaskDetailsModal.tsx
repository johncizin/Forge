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
        

    )

}