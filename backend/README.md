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
- Business Logic 
- Orchestrator
    - repos and domains are called here

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

