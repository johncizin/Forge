
export async function fetchProjectMembers(projectShortId: string, token: string) {
    const res = await fetch(`http://localhost:3000/projects/${projectShortId}/members`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch project members");
    const data = await res.json();
    console.log("fetchProjectMembers response:", data); //debug
    return data;
}

export async function fetchTaskMembers(taskId: string, token: string) {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}/members`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch task members");
    return res.json();
}

//add member to project
export async function addMemberToProject(projectShortId: string, memberEmail: string, token: string) {
    const res = await fetch(`http://localhost:3000/projects/${projectShortId}/members`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ email: memberEmail }),
    });
    if (!res.ok) throw new Error("Failed to add member to project");
    return res.json();
}

//add member to task
export async function addMemberToTask(taskId: string, memberEmail: string, token: string) {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}/members`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ email: memberEmail }),
    });
    if (!res.ok) throw new Error("Failed to add member to task");
    return res.json();
}

//remove member from project
export async function removeMemberFromProject(projectShortId: string, memberId: string, token: string) {
    const res = await fetch(`http://localhost:3000/projects/${projectShortId}/members/${memberId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to remove member from project");
    return res.json();
}

//remove member from task
export async function removeMemberFromTask(taskId: string, memberId: string, token: string) {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}/members/${memberId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to remove member from task");
    return res.json();
}