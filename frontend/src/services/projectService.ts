//making this because im duplicating a lot of fetching logic

//dashboard view fetch
export async function fetchProjects(token: string) {
    const res = await fetch("http://localhost:3000/projects/my-projects", {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
}

//dashboard create
export async function createProject(project: { name: string; description: string }, token: string) {
    const res = await fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error("Failed to create project");
    return await res.json();
}

//project view fetch
export async function fetchProjectByShortId(shortId: string, token: string) {
    const res = await fetch(`http://localhost:3000/projects/${shortId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch project");
    return await res.json();
}