import { useParams } from "react-router-dom";
import { useProject } from "../hooks/projectHook";
import { useAuth } from "../context/authContext";
import { Plus} from "lucide-react";

export function Project() {
  const { shortId } = useParams();
  const { user } = useAuth();
  const { project } = useProject(shortId);

  console.log("user:", user);
  console.log("project:", project);

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
     </div>
  );
}