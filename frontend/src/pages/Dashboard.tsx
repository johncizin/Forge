
//react 
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


//lucide icons
import { Plus, FolderKanban, List, LayoutGrid, User, CheckSquare } from "lucide-react";

//components
import { CreateProjectModal } from "../components/modals/ProjectModal";
//services
import { fetchProjects as fetchProjectsService, createProject } from "../services/projectService";

//type alias
//from backend / db 
interface fetchedProject {
  name: string;
  shortId: string;
  ownerId: string;
  description: string;
  createdAt: string
  _count: {
    tasks: number;
    members: number;
  }
}

interface createdProject{
  name: string;
  description: string;
}

export function Dashboard() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<fetchedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<"all" | "owned" | "member" | "createdAt" | "alphabetical">("all");
  //right now filtered isn't persistant in the session when you navigate back, just how useState works internally
  //can use sessionStorage which is persistant, im sure yet
  
  //useMemo inbuilt react hook: caches result and only reRenders if results change
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if(filter === "owned"){
      result = result.filter(p => p.ownerId === user?.id);

    }else if(filter == "member"){
      result = result.filter(p => p.ownerId !== user?.id);
    } else if(filter === "alphabetical"){
       result.sort((a, b) => a.name.localeCompare(b.name))
    } else if(filter === "createdAt"){
      result.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [projects, filter, user])

  const fetchProjects = async () => {
    try{
      setLoading(true);
      const data = await fetchProjectsService(token!);
      setProjects(data); 
    }catch(err){
      setError((err as Error).message);
    }finally{
      setLoading(false);
    }
  };

  async function handleProjectCreate(project: createdProject) {
    await createProject(project, token!);
    await fetchProjects();
  }

    useEffect(() => {
        if (token) fetchProjects();
    }, [token]);

    //fetching depends on which loads/doesn't load first or error
    if (loading) return <div className="flex items-center justify-center h-full text-forge-muted"><p>Loading...</p></div>;
    if (error) return <div className="flex items-center justify-center h-full text-red-400"><p>{error}</p></div>;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-2xl font-bold text-forge-login-text">My Projects</h1>
          <p className="text-forge-muted text-sm mt-1">
            {projects.length} {projects.length === 1 ? "project" : "projects"} 
          </p>
        </div>
         {/* new project button */}
        <button
          onClick={async () => {
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-forge-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* View toggle row and filtering*/}
<div className="flex items-center justify-end gap-2 mb-8">
  <button onClick={() => setView(view === "grid" ? "list" : "grid")} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
    {view === "grid" ? <List size={16} /> : <LayoutGrid size={16} />}
  </button>
  {/* Will change later - abstracting it out*/}
  <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
    <option value="all">All Projects</option>
    <option value="owned">Owned Projects</option>
    <option value="member">Member Projects</option>
    <option value="createdBy">Created Date</option>
    <option value="alphabetical">Alphabetical</option>
  </select>
</div>

    {projects.length === 0 ? (
  <div className="flex flex-col items-center justify-center h-64 border border-dashed border-forge-border rounded-2xl text-forge-muted">
    <FolderKanban size={36} className="mb-3 opacity-40" />
    <p className="font-medium">No projects yet</p>
    <p className="text-sm mt-1">Create one to get started</p>
  </div>
) : view === "grid" ? (
  //card view
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {filteredProjects.map((project) => (
      <div
        key={project.shortId}
        onClick={() => navigate(`/projects/${project.shortId}`)}
        className="border border-forge-border rounded-2xl p-5 cursor-pointer hover:bg-forge-login-hover transition-colors min-h-35 flex flex-col justify-between"
      >
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-forge-accent flex items-center justify-center shrink-0">
            <FolderKanban size={16} color="white" />
          </div>
          <h2 className="font-semibold text-forge-login-text truncate">{project.name}</h2>
        </div>
        {project.description  && (
         <p className="text-forge-muted text-sm line-clamp-2">{project.description}</p>
        )}
        </div>

        <div className="flex items-center gap-3 text-forge-muted mt-3">
        <div className="flex items-center gap-1">
            <CheckSquare size={12} />
              <span className="text-xs">{project._count.tasks ?? 0}</span>
          </div>
            <div className="flex items-center gap-1">
                <User size={12} />
                {/* because of schema design this will always either be 1 less because the owner isnt in the membership table, id have to refactor a decent bit for that, so for now off 1 is fine*/}
                  <span className="text-xs">{(project._count.members ?? 0) + 1}</span>
            </div>
        </div>
      </div>
      
    ))}
  </div>
) : (
  <div className="flex flex-col gap-2">
    {projects.map((project) => (
      <div
        key={project.shortId}
        onClick={() => navigate(`/projects/${project.shortId}`)}
        className="flex items-center gap-4 border border-forge-border rounded-xl px-5 py-3 cursor-pointer hover:bg-forge-login-hover transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-forge-accent flex items-center justify-center shrink-0">
          <FolderKanban size={16} color="white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-forge-login-text truncate">{project.name}</h2>
          <p className="text-forge-muted text-xs truncate">{project.description}</p>
        </div>
      </div>
    ))}
  </div>
)}
{showModal && (
  <CreateProjectModal 
    onClose = {() => setShowModal(false)}
    onCreate = {handleProjectCreate}
  />

)}
    </div>
  );
}