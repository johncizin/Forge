//modal form for creating projects

//default cuis used in another page
import { useState } from "react";

interface Project {
    name: string;
    description: string;
}

//for type cast
interface CreateProjectModalProp{
    onClose: () => void, //passed from dashboard
    onCreate: (data: Project) => Promise<void>;
}

export function CreateProjectModal({ onClose, onCreate }: CreateProjectModalProp) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  //flow for handling submit, makes sure vlaue, looading debounce so it doesnt create 1million times 
  // create project ,  no more debounce, automatically close modal
  async function handleSubmit() {
    if (!name.trim()) return;
    setLoading(true);
    await onCreate({ name, description });
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <span className="text-sm font-medium">New project</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My awesome project"
              className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this project about?"
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm resize-none focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim() || loading}
            className="px-4 h-9 rounded-lg bg-black text-white text-sm font-medium disabled:opacity-40"
          >
            {loading ? "Creating..." : "Create project"}
          </button>
        </div>
      </div>
    </div>
  );
}