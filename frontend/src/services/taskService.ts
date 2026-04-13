
export interface TaskData {
    title: string;
    description: string;
    dueDate?: string; //optional
    status?: string; //defaults to "TO-DO" in db
}

export async function fetchTasksFromProjectShortId(shortId: string, token: string) {
    const res = await fetch(`http://localhost:3000/tasks/project/${shortId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
}

export async function createTask(task: TaskData, projectShortId: string, token: string) {
    const res = await fetch(`http://localhost:3000/tasks/project/${projectShortId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
}

//update to come

//delete