//User service

/* 
I added login here, because i just thought it made the most sense because the user already exists
but i think its better in authService

This really should be for user settings, user profile 
*/

export class UserService {
    //@ PARAMS: userRepo , authDomain
    constructor({ userRepo, authDomain }) {
        this.userRepo = userRepo;
        this.authDomain = authDomain;
    }
    
    //@ PARAMS: userData {email, password } 
    //probably will add name
    async register({email, password}) {
        // Validate user data
        const existing = await this.userRepo.getByEmail(email);
        if (existing) throw new Error("Email in Use Already! Sign in!")
        
        const hashedPassword = await this.authDomain.hashPassword({password});
        const user = { email, passwordHash: hashedPassword };
        // Save user to the database
        await this.userRepo.create(user);
        return user;
    }
} 