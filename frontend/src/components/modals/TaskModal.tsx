//task modal pretty much copy of project just different fields

//react dependcies
import { useState } from "react";
//types
import type { TaskData } from "../../services/taskService";

//icons 
import { ClipboardList } from "lucide-react";
// abstracted imports
import { StatusBadge } from "../StatusBadge";
import { MemberList } from "../ui/MemberList";

//calendar widget:
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//hooks
import { useProjectMembership } from "../../hooks/membershipHook";
/*
export interface TaskData {
    title: string; added
    description: string; added 
    dueDate?: string; //optional not yet
    status?: string; //defaults to "TO-DO" in db // and will default for now
}
*/

//for type cast
interface CreateTaskModalProp{
    onClose: () => void, //passed from dashboard
    onCreate: (data: TaskData) => Promise<void>;
    projectShortId: string; //added project short id so we can fetch project members for the task modal, and add to task on create
    onInviteClick: () => void; //nav to invite modal if user wants to add member not in project
}

export function CreateTaskModal({ onClose, onCreate, projectShortId, onInviteClick }: CreateTaskModalProp) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"TODO" | "IN_PROGRESS" | "COMPLETED">("TODO"); //default to TODO, can change later if we want to set on create
  const[selectedMembers, setSelectedMembers] = useState<string[]>([]); //for selecting members to add to task on create, will be array of member ids
  const[dueDate, setDueDate] = useState<Date | null>(null);

  const { members } = useProjectMembership(projectShortId); //need to pass project short id from dashboard to fetch members for task modal

  function toggleMember(id: string) {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
    );
  }

  //flow for handling submit, makes sure vlaue, looading debounce so it doesnt create 1million times 
  // create project ,  no more debounce, automatically close modal
  async function handleSubmit() {
    if (!title.trim()) return;
    setLoading(true);
    await onCreate({
       title, 
       description, 
       status,
       assignees: selectedMembers,
       dueDate: dueDate ? dueDate.toISOString() : undefined
    }); //added status to create, but we can change this later if we want to default to TODO: add assignees to interface
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
              <ClipboardList size={16} color="white" />
            </div>
            <span className="text-sm font-medium">New task</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My task"
              className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this task about?"
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm resize-none focus:outline-none focus:border-black"
            />
          </div>
        {/* status field*/}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</label>
            <StatusBadge status={status} 
              onStatusChange={ async (s) => setStatus(s as "TODO" | "IN_PROGRESS" | "COMPLETED")} 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Due Date</label>
            <DatePicker 
              selected={dueDate}
              onChange={(date: Date | null) => setDueDate(date)}
              placeholderText="Select a due date"
              popperPlacement="bottom-start"
              dateFormat="MM/dd/yyyy"
              /* no min date for now */
              className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-black"
              />
          </div>


          {/* invite field -- need to clean up empty state */}
           <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Assign</label>
                <MemberList
                    members={members}
                    selectedIds={selectedMembers}
                    onSelect={toggleMember}
                    onInviteClick={onInviteClick} //fix soon
                    selectable
                />
      </div>

        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || loading}
            className="px-4 h-9 rounded-lg bg-black text-white text-sm font-medium disabled:opacity-40"
          >
            {loading ? "Creating..." : "Create task"}
          </button>
        </div>
      </div>
    </div>
  );
}