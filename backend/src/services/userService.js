//User service

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
        const hashedPassword = await this.authDomain.hashPassword({password});
        const user = { email, passwordHash: hashedPassword };
        // Save user to the database
        await this.userRepo.create(user);
        return user;
    }
} 