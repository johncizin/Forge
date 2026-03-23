# Conceptually: So I remember Data Flow
1. HTTP (Client request)
2. Authenticate (AuthService) + middleware eventually 
3. route (Specific for DataFlow: e.g. Project, Task, Comment, etc..)
4. service (business logic: )
5. repo (Specific to use case: db interface)
6. DB
7. response
