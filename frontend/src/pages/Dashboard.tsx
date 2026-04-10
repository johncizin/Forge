import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Plus, FolderKanban } from "lucide-react";

//type alias
//from backend / db 
interface Project {
  id: string;
  shortId: string; //added 4/9/26 for cleaner urls
  name: string;
  description: string;
  ownerId: string; // visual inferencing maybe:: getting rid of "add" button locally for visuals 
  createdAt: string;
}

//test creating project
const testProject: Project = {
  id: "1",
  shortId: "123456790",
  name: "Test Project",
  description: "This is a test project",
  ownerId: "user1",
  createdAt: new Date().toISOString()
};

export function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //test project
    async function createProject(project: Project, token: string) {
        const res = await fetch("http://localhost:3000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name: project.name, description: project.description }),
        });
        if (!res.ok) throw new Error("Failed to create project");
        return res.json();
    }
    //fetch projects after i call the create test projects 
    const fetchProjects = async () => {
        try {
            const res = await fetch("http://localhost:3000/projects/my-projects", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch projects");
            const data = await res.json();
            setProjects(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchProjects();
    }, [token]);

    //fetching depends on which loads/doesn't load first or error
    if (loading) return <div className="flex items-center justify-center h-full text-forge-muted"><p>Loading...</p></div>;
    if (error) return <div className="flex items-center justify-center h-full text-red-400"><p>{error}</p></div>;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-forge-login-text">My Projects</h1>
          <p className="text-forge-muted text-sm mt-1">
            {projects.length} {projects.length === 1 ? "project" : "projects"} 
          </p>
        </div>
         {/* project button TODO: functionality */}
        <button
          onClick={async () => {
            await createProject(testProject, token!);
            await fetchProjects();
          }}
          className="flex items-center gap-2 bg-forge-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Empty state */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-forge-border rounded-2xl text-forge-muted">
          <FolderKanban size={36} className="mb-3 opacity-40" />
          <p className="font-medium">No projects yet</p>
          <p className="text-sm mt-1">Create one to get started</p>
        </div>
      ) : (
        /* Card grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.shortId}
              onClick={async () => { 
                navigate(`/projects/${project.shortId}`) //not working rn but soon: would nag to: forge/projects/123456
              }}
              className="border border-forge-border rounded-2xl p-5 cursor-pointer hover:bg-forge-login-hover transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-forge-accent flex items-center justify-center shrink-0">
                  <FolderKanban size={16} color="white" />
                </div>
                <h2 className="font-semibold text-forge-login-text truncate">{project.name}</h2>
              </div>
              <p className="text-forge-muted text-sm line-clamp-2">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}