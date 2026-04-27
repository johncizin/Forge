//react dependencies
import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";

//icon dependencies
import { Plus, Share, FolderKanban, LayoutGrid, List, User, Crown, UserCheck} from "lucide-react";

//hooks
import { useProject } from "../hooks/projectHook";
import { useAuth } from "../context/authContext";
import { useTasks } from "../hooks/taskHook";

//types
import type { TaskData } from "../services/taskService";
import type { FetchedTaskData } from "../services/taskService";


//Service funcs
import { createTask } from "../services/taskService";
import { sendInviteByEmail } from "../services/inviteService";
import { updateTaskStatus } from "../services/taskService";


//modals
import { CreateTaskModal } from "../components/modals/TaskModal";
import { CreateInviteModal } from "../components/modals/InviteModal";

//components
import { StatusBadge } from "../components/StatusBadge";



export function Project() {
  //using patterns from taskService and taskHook
  //and projectService 
  //clean up
  const { shortId } = useParams();
  const { token, user } = useAuth();
  const { project, loading: projectLoading, error: projectError } = useProject(shortId);
  const { tasks, loading: tasksLoading, error: tasksError, refetch } = useTasks(shortId);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [taskFilter, setTaskFilter] = useState<"all" | "TODO" | "IN_PROGRESS" | "COMPLETED" | 
   "createdAt" | "dueDate" | "assigned" | "unassigned" >("all");

  async function handleInviteCreate(data: { email: string }) {
    //send invite email, then refetch project to update invite list
    await sendInviteByEmail(shortId!, data.email, token!);
    console.log("invite sent, refetching project...");
    await refetch();
    console.log("project after refetch:", project);
  }

  async function handleTaskCreate(task: TaskData) {
    await createTask(task, shortId!, token!);
    console.log("task created, refetching tasks...");
    await refetch();
    console.log("tasks after refetch:", tasks);
  }

  const filteredTasks = useMemo(() =>{
    let result = [...tasks];

     if (taskFilter === "TODO") {
        result = result.filter(t => t.status === "TODO");
    } else if (taskFilter === "IN_PROGRESS") {
        result = result.filter(t => t.status === "IN_PROGRESS");
    } else if (taskFilter === "COMPLETED") {
        result = result.filter(t => t.status === "COMPLETED");
    } else if (taskFilter === "assigned") {
        result = result.filter(t => t.assignees?.some(a => a.userId === user?.id));
    } else if (taskFilter === "unassigned") {
        result = result.filter(t => !t.assignees?.length);
    } else if (taskFilter === "createdAt") {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (taskFilter === "dueDate") {
        result = result
            .filter(t => t.dueDate)
            .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
    }

    return result;
  }, [tasks, taskFilter, user])

  async function handleStatusChange(taskShortId: string, newStatus: string) {
    //optimistic changes first:
    refetch();
    try {
        await updateTaskStatus(taskShortId, newStatus, token!);
        console.log("task status updated, refetching tasks...");
        await refetch();
        console.log("tasks after refetch:", tasks);
    } catch (error) {
        console.error("Failed to update task status:", error);
        //revert optimistic change if API call fails
        refetch();
    }
  }

  if (projectLoading || tasksLoading) return <div className="flex items-center justify-center h-full text-forge-muted"><p>Loading...</p></div>;
  if (projectError || tasksError) return <div className="flex items-center justify-center h-full text-red-400"><p>{projectError || tasksError}</p></div>;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-forge-login-text">{project?.name}</h1>
          <p className="text-sm text-forge-muted">{project?.description}</p>
        </div>
        {project?.ownerId === user?.id && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTaskModal(true)}
              className="flex items-center gap-2 bg-forge-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
            >
              <Plus size={16} />
              New Task
            </button>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 bg-forge-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
          >
            <Share size={16} />
            Invite
          </button>
          </div>
        )}
      </div>

      {/* Stats and filtering row */}
      <div className="flex items-center justify-between mb-1">
         {/* Stats */}
      <div className="flex items-center gap-6 mb-8">
        <div>
          <h3 className="text-sm text-forge-muted">Total Tasks</h3>
          <p className="text-lg font-semibold text-forge-login-text">{tasks.length ?? 0}</p>
        </div>
      </div>
      {/* View toggle row and filtering - format code eventually just copies from Dashboard as of rn*/}
      <div className="flex items-center justify-end gap-2 mb-8">
      <button onClick={() => setView(view === "grid" ? "list" : "grid")} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
      {view === "grid" ? <List size={16} /> : <LayoutGrid size={16} />}
      </button>
      {/* Will change later - abstracting it out*/}
      <select value={taskFilter} onChange={(e) => setTaskFilter(e.target.value as any)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
      <option value="all">All Tasks</option>
      <option value="TODO">Todo</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="COMPLETED">Completed</option>
      <option value="assigned">Assigned</option>
      <option value="unassigned">Unassigned</option>
      <option value="createdAt">Recently Created</option>
      <option value="dueDate">Due Date</option>
      </select>
      </div>
        </div>

      {/* Task list */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-forge-border rounded-2xl text-forge-muted">
          <FolderKanban size={36} className="mb-3 opacity-40" />
          <p className="font-medium">No tasks yet</p>
          <p className="text-sm mt-1">Create one to get started</p>
        </div>
      ) : view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task: FetchedTaskData) => (
              // task card view
              <div key={task.shortId} className=" relative border border-forge-border rounded-lg p-4 cursor-pointer hover:bg-forge-login-hover transition-colors min-h-30 flex flex-col justify-between">
              {/* owner / member indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  {project?.ownerId === user?.id && (
                    <Crown size={12} className="text-forge-muted" />
              )}
              {task.assignees?.some(a => a.userId === user?.id) && (
                   <UserCheck size={12} className="text-forge-muted" />
              )}
              </div>
            <div className="pr-6"> 
                <h2 className="text-sm font-semibold text-forge-login-text mb-1">{task.title}</h2>
                {task.description && (
                    <p className="text-xs text-forge-muted line-clamp-2">{task.description}</p>
                )}
            </div>
             <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-forge-muted">
                      Due: {task.dueDate 
                          ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) 
                          : "No due date"}
                  </span>
                  <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-forge-muted">
                          <User size={12} />
                          <span className="text-xs">{(task.assignees?.length ?? 0) + 1}</span>
                      </div>
                      <StatusBadge
                          status={(task.status ?? "TODO") as "TODO" | "IN_PROGRESS" | "COMPLETED"}
                          onStatusChange={(newStatus) => handleStatusChange(task.shortId, newStatus)}
                      />
                  </div>
              </div>
          </div>
          ))}
        </div>
      ) : (
        //task list view
  <div className="flex flex-col gap-2">
    {filteredTasks.map((task) => (
      <div
        key={task.shortId}
        className="flex items-center gap-4 border border-forge-border rounded-xl px-5 py-3 cursor-pointer hover:bg-forge-login-hover transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-forge-accent flex items-center justify-center shrink-0">
          <FolderKanban size={16} color="white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-forge-login-text truncate">{task.title}</h2>
          <p className="text-forge-muted text-xs truncate">{task.description}</p>
        </div>
      </div>
    ))}
  </div>
      )}

      {showTaskModal && (
        <CreateTaskModal
          onClose={() => setShowTaskModal(false)}
          onCreate={handleTaskCreate}
          projectShortId={shortId!} //pass project short id to task modal so it can fetch members for assigning
          onInviteClick={() => {
            setShowTaskModal(false);
            setShowInviteModal(true);
          }} //close task modal and open invite modal if user wants to invite someone from task modal
        />
      )}
      {showInviteModal && (
        <CreateInviteModal
          onClose={() => setShowInviteModal(false)}
          onCreate={handleInviteCreate}
        />
      )}
    </div>
  );
}