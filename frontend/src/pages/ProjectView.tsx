import { useParams } from "react-router-dom";
import { useProject } from "../hooks/projectHook";
import { useAuth } from "../context/authContext";
import { Plus} from "lucide-react";
import { useTasks } from "../hooks/taskHook";
import type { TaskData } from "../services/taskService";
import { createTask } from "../services/taskService";
import type { FetchedTaskData } from "../services/taskService";
import { useState } from "react";
import { CreateTaskModal } from "../components/modals/TaskModal";

export function Project() {
  //using patterns from taskService and taskHook
  //and projectService 
  //clean up
  const { shortId } = useParams();
  const { token, user } = useAuth();
  const { project, loading: projectLoading, error: projectError } = useProject(shortId);
  const { tasks, loading: tasksLoading, error: tasksError, refetch } = useTasks(shortId);
  const [showModal, setShowModal] = useState(false);


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
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-forge-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
          >
            <Plus size={16} />
            New Task
          </button>
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
        <div className="flex flex-col items-center justify-center h-64 text-forge-muted">
          <p className="text-lg mb-4">No tasks yet</p>
          {project?.ownerId === user?.id && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-forge-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-80 transition-opacity"
            >
              <Plus size={16} />
              Create your first task
            </button>
          )}
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

      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreate={handleTaskCreate}
        />
      )}
    </div>
  );
}