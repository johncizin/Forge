
export interface TaskData {
    title: string;
    description: string;
    dueDate?: string; //optional
    status?: string; //defaults to "TO-DO" in db
}
export interface CreatedTaskData extends TaskData {
    projectShortId: string;
}

export interface FetchedTaskData extends TaskData {
    shortId: string;
    projectShortId: string;
}

export async function fetchTasksFromProjectShortId(shortId: string, token: string) {
    console.log("token front end??", token)
    const res = await fetch(`http://localhost:3000/tasks/project/${shortId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
}

export async function createTask(task: TaskData, projectShortId: string, token: string) {
  const res = await fetch(`http://localhost:3000/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...task, projectShortId }),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
}

//update to come

export async function updateTaskStatus(taskShortId: string, newStatus: string, token: string) {
    const res = await fetch(`http://localhost:3000/tasks/${taskShortId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) throw new Error("Failed to update task status");
    return res.json();
}

//delete