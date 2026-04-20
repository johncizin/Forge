//react dependencies
import { useParams } from "react-router-dom";
import { useState } from "react";

//icon dependencies
import { Plus, Share, FolderKanban } from "lucide-react";

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


//modals
import { CreateTaskModal } from "../components/modals/TaskModal";
import { CreateInviteModal } from "../components/modals/InviteModal";


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

      {/* Stats */}
      <div className="flex items-center gap-6 mb-8">
        <div>
          <h3 className="text-sm text-forge-muted">Total Tasks</h3>
          <p className="text-lg font-semibold text-forge-login-text">{tasks.length ?? 0}</p>
        </div>
      </div>

      {/* Task list */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-forge-border rounded-2xl text-forge-muted">
          <FolderKanban size={36} className="mb-3 opacity-40" />
          <p className="font-medium">No tasks yet</p>
          <p className="text-sm mt-1">Create one to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task: FetchedTaskData) => (
            <div key={task.shortId} className="border border-forge-border rounded-lg p-4 cursor-pointer hover:bg-forge-login-hover transition-colors">
              <h2 className="text-lg font-semibold text-forge-login-text mb-2">{task.title}</h2>
              <p className="text-sm text-forge-muted mb-4">{task.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-forge-muted">Due: {task.dueDate ?? "No due date"}</span>
                <span className="text-xs text-forge-muted">{task.status ?? "TODO"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showTaskModal && (
        <CreateTaskModal
          onClose={() => setShowTaskModal(false)}
          onCreate={handleTaskCreate}
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