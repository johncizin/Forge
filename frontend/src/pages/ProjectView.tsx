import { useParams } from "react-router-dom";
import { useProject } from "../hooks/projectHook";
import { useAuth } from "../context/authContext";
import { Plus} from "lucide-react";
import { useTasks } from "../hooks/taskHook";

export function Project() {
  const { shortId } = useParams();
  const { user } = useAuth();
  const { project } = useProject(shortId);
  const { tasks } = useTasks(shortId);

  console.log("user:", user);
  console.log("project:", project);
  console.log("tasks:", tasks);

  return (
    //top bar
     <div className="p-8">
      {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-forge-login-text">{project?.name}</h1>
              <p className="text-sm text-forge-muted">{project?.description}</p> {/* might keep here idk*/}
          </div>
          {/* new project button */}
          {project?.ownerId === user?.id && ( //owner check, need to make sure im passing owner id in project data}
          <button
            onClick={async () => {
              console.log("open task modal"); //edit button if owner?! probably need this i need to make sure im passing owner id tho
            }}
            className="flex items-center gap-2 bg-forge-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
          >
            <Plus size={16} />
            New Task {/* owner check might abstract into service */}
          </button>
          )}
      </div>

       <div className="p-8">
          {/* Project Stats / Details */}
          <div className="flex items-center gap-6 mb-8">
            <div>
              <h3 className="text-sm text-forge-muted">Total Tasks</h3>
              <p className="text-lg font-semibold text-forge-login-text">{tasks.length}</p>
            </div>
          </div>
        </div>
              
        <div className="p-8">
        {/* Task list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example task card */}
            <div className="bg-forge-card rounded-lg p-4 shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-forge-login-text mb-2">Task Title</h2>
              <p className="text-sm text-forge-muted mb-4">Task description goes here. This is a brief overview of the task.</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-forge-muted">Due: 2024-07-01</span>
                <span className="text-xs text-forge-muted">Status: In Progress</span>
              </div>
            </div>
            {/* More task cards would go here, ideally mapped from project data */}
            </div>
        </div>
     </div>
  );
}