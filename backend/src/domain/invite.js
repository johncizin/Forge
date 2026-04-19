// domain/invite.js
import { validateEmail } from "../utils/validators.js";
/*
model PendingInvite {
  id        String       @id @default(uuid())
  email     String
  projectId String
  role      Role         @default(MEMBER)
  token     String       @unique
  status    InviteStatus @default(PENDING)
  createdAt DateTime     @default(now())
  expiresAt DateTime
  project   Project      @relation(fields: [projectId], references: [id], onDelete: Cascade)

}
*/


export function createInvite({ email, projectId, token, expiresAt }, user) {
    if (!email || !projectId || !token) throw new Error("Missing required fields");
    if (!validateEmail(email)) throw new Error("Invalid email");
    
    return {
        email,
        projectId,
        token,
        expiresAt
    };
}

export function canInvite(project, user) {
    // only owner can invite
    return project.ownerId === user.id;
}

export function canAcceptInvite(invite, user) {
    if (invite.email !== user.email) throw new Error("Invite not for this user");
    if (invite.status !== "PENDING") throw new Error("Invite is no longer valid");
    if (new Date() > new Date(invite.expiresAt)) throw new Error("Invite has expired");
    return true;
}

export function canDeclineInvite(invite, user) {
    return invite.email === user.email && invite.status === "PENDING";
}

export function canRevokeInvite(invite, project, user) {
    // only owner can revoke
    return project.ownerId === user.id;
}