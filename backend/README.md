# Conceptually: So I remember Data Flow
1. HTTP (Client request)
2. Authenticate (AuthService) + middleware eventually 
3. route (Specific for DataFlow: e.g. Project, Task, Comment, etc..)
4. service (business logic: )
5. repo (Specific to use case: db interface)
6. DB
7. response

# Architecture: 
## Data Flow 
Request -> Route -> Service -> Repo -> Prisma -> DB -> Response

## Directories
### Routes:
- Handles HTTP
- Calls Services
- Returns responses 

### Services:
- Orchestrator
    - repos and domains coordinated here

### Domain:
- Rules + Validation
- not DB related or HTTP related
    - separate concern would be repeated code without

### Repos
- Prisma Queries for mySQL forge DB

---

## Core Entities: 
- User
- Project
- Membership
- PendingInvite
- Favorite
- Task
- Comment
- Attachment

---

## Auth 
- "/forge/backend/src/routes/authRoutes.js
    - POST "/auth/register" -> creates user
    - POST "/auth/login" -> returns JWT token

---
## Project Flow (Completed)
- "forge/backend/src/routes/projectRoutes.js"
    - POST "/projects"
        - requires auth (in declaration)
        - ownerId is req.user.id 
        - passed to Service
            - Service to domain to enforce data rules and then returned back to Service
                - then from there back to Repos to Prisma to migration to DB

# CURL Examples: 
## Already Registered: 
 curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@test.com", "password": "1234"}'

## Login:
 curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@test.com", "password": "1234"}'

### Expected Output:
Error: Email in Use Already! Sign in!

## New: 
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test1@test.com", "password": "1234"}'

## Login: 


# Membership
* The initial plan for Membership was a pipeline convention the same as my other service. 
* Though, the complexity of it led me to believe the right method was util functions, but I didn't see the whole problem yet

---
## The Issues:
### Membership Table (DB)
* Membership directly integrates with Project asking the question: "Who is the owner" (Kind of because it is a separate field in the DB), "Who are the members", "Who can view this project"
### TaskAssignee (DB)
* Inegrates directly with Task, fk with UserID and TaskId
* Asks the question: "Who is assigned to this project."

---
### Problems
* I ran into separation of concerns, membership for both Project and Task is essential to the integrity and functionality of the project.
* Clean routing, initially i though about "deleting" and viewing on the frontend. 
* Managing adding from invite 

## Resolution:
* Membership follows the standard service pattern 
* Membership is mounted under ("/projects") and ("/tasks") 
* RESTful pattern maintained for clean URLs ("/projects/:id/members)
* Invite service calls into MembershipService on acceptance — one-way dependency, invite knows about membership, membership does not know about invites
* `isProjectMember` and `isTaskAssignee` live in membershipRepo and are imported directly by projectService and taskService for authorization gates
* No separate util file — repo functions serve that purpose

# TODO (4/26/26)
1. Add owner membership table 