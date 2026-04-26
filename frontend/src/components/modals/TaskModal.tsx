//task modal pretty much copy of project just different fields

import { useState } from "react";
import type { TaskData } from "../../services/taskService";

import { ClipboardList } from "lucide-react";
import { StatusBadge } from "../StatusBadge";



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
}

export function CreateTaskModal({ onClose, onCreate }: CreateTaskModalProp) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"TODO" | "IN_PROGRESS" | "COMPLETED">("TODO"); //default to TODO, can change later if we want to set on create

  //flow for handling submit, makes sure vlaue, looading debounce so it doesnt create 1million times 
  // create project ,  no more debounce, automatically close modal
  async function handleSubmit() {
    if (!title.trim()) return;
    setLoading(true);
    await onCreate({ title, description, status }); //added status to create, but we can change this later if we want to default to TODO
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

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</label>
            <StatusBadge status={status} 
              onStatusChange={ async (s) => setStatus(s as "TODO" | "IN_PROGRESS" | "COMPLETED")} 
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