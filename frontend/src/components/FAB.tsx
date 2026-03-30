import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Plus, FolderPlus, CheckSquare, X } from "lucide-react";
 
export default function FAB() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
 
  // Context-aware action
  const getDirectAction = () => {
    if (location.pathname === "/projects") return "project";
    if (location.pathname === "/tasks") return "task";
    return null; // dashboard or other = show picker
  };
 
  const directAction = getDirectAction();
 
  const handleClick = () => {
    if (directAction) {
      // TODO: open create modal for that specific type
      console.log(`Create ${directAction}`);
    } else {
      setOpen((prev) => !prev);
    }
  };
 
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
 
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        {/* Picker popup */}
        {open && (
          <div className="bg-forge-sidebar border border-forge-border rounded-xl shadow-xl p-2 flex flex-col gap-1 min-w-44 animate-fade-in">
            <p className="text-xs text-forge-muted px-3 py-1 uppercase tracking-widest font-semibold">
              Create
            </p>
            <button
              onClick={() => {
                setOpen(false);
                // TODO: open create project modal
                console.log("Create project");
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-forge-muted hover:text-white hover:bg-forge-hover transition-all"
            >
              <FolderPlus size={15} />
              <span>New Project</span>
            </button>
            <button
              onClick={() => {
                setOpen(false);
                // TODO: open create task modal
                console.log("Create task");
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-forge-muted hover:text-white hover:bg-forge-hover transition-all"
            >
              <CheckSquare size={15} />
              <span>New Task</span>
            </button>
          </div>
        )}
 
        {/* FAB button */}
        <button
          onClick={handleClick}
          className="w-12 h-12 rounded-full bg-forge-accent hover:bg-blue-500 text-white shadow-lg flex items-center justify-center transition-all duration-150 hover:scale-105"
        >
          {open ? <X size={20} /> : <Plus size={20} />}
        </button>
      </div>
    </>
  );
}