
//Utilities
import { validateEmail } from "../utils/validation.js";
import { generateShortId } from "../utils/id.js"

/* 
Invite Service needs access to 
*/
 
export class InviteService {
    constructor({ inviteDomain, inviteRepo, membershipService, membershipRepo ,projectRepo }){
        this.inviteDomain = inviteDomain;
        this.inviteRepo = inviteRepo;
        this.membershipService = membershipService; //breaking SRP but necessary
        this.membershipRepo = membershipRepo;
        this.projectRepo = projectRepo;
    }

    //only owner? i think so for now
    //writing it as only owner atm
    async sendInvite(projectId, email, user) {
        const project = await this.projectRepo.getByShortId(projectId);
        if(!project) throw new Error("Project Not Found");
        if(!this.inviteDomain.canInvite(project, user)) throw new Error("Unauthorized");
        
        const invite = await this.inviteDomain.createInvite({
           projectId,
           email,
           token: generateShortId(),
           expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) //7 days: might just make this prisma default we'll see
        });
        return await this.inviteRepo.createInvite(invite);
    }

    async acceptInvite(inviteId, user) {
        const invite = await this.inviteRepo.getInviteById(inviteId);
        if (!invite) throw new Error("Invite not found");
        this.inviteDomain.canAcceptInvite(invite, user); //theoretically dont need to check, because itll throw otherwise

        await this.membershipService.addMemberToProject(invite.projectId, user.id, user);
        return await this.inviteRepo.updateInviteStatus(inviteId, "ACCEPTED");
    }

    async declineInvite(inviteId, user) {
        const invite = await this.inviteRepo.getInviteById(inviteId);
        if (!invite) throw new Error("Invite not found");
        if (invite.status !== "PENDING") throw new Error("Invite is not pending");

        return await this.inviteRepo.updateInviteStatus(inviteId, "DECLINED");
    }

    async deleteInvite(inviteId, user) {
        const invite = await this.inviteRepo.getInviteById(inviteId);
        if(!invite) throw new Error("Invite not found");
        const project = await this.projectRepo.getByShortId(invite.projectId);
        if(!project) throw new Error("Project not found");
        // Only owner can delte
        if(!this.inviteDomain.canRevokeInvite(invite, project, user)) throw new Error("Unauthorized")

        return await this.inviteRepo.deleteInvite(inviteId);
    }

    async getMyInvites(user) {
        return await this.inviteRepo.getInvitesByEmail(user.email);
    }

    async getPendingInvites(projectId, user) {
        // Only project members can view pending invites
        const isMember = await this.membershipRepo.isProjectMember(user.id, projectId);
        if (!isMember) throw new Error("Unauthorized");

        return await this.inviteRepo.getPendingInvitesByProjectId(projectId);
    }
}