
//fetching
//for user settings page think
export async function fetchMyPendingInvites(token: string) {
    const res = await fetch(`http://localhost:3000/invites/my-invites`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch pending invites");
    return res.json();
}

//project view
export async function fetchProjectInvites(projectShortId: string, token: string) {
    const res = await fetch(`http://localhost:3000/invites/pending/${projectShortId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch project invites");
    return res.json();
}
//invite modal accessed through project view
export async function sendInviteByEmail(projectShortId: string, email: string, token: string) {
    const res = await fetch(`http://localhost:3000/invites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ email, projectShortId }),
    });
    if (!res.ok) throw new Error("Failed to send invite email");
    return res.json();
}

//invite behavior
export async function acceptInvite(inviteId: string, token: string) {
    const res = await fetch(`http://localhost:3000/invites/accept/${inviteId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to accept invite");
    return res.json();
}

export async function declineInvite(inviteId: string, token: string) {
    const res = await fetch(`http://localhost:3000/invites/decline/${inviteId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to decline invite");
    return res.json();
}

export async function deleteInvite(inviteId: string, token: string) {
    const res = await fetch(`http://localhost:3000/invites/${inviteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to delete invite");
    return res.json();
}
