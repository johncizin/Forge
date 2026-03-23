//User service

export class UserService {
    //@ PARAMS: userRepo , authDomain
    constructor({ userRepo, authDomain }) {
        this.userRepo = userRepo;
        this.authDomain = authDomain;
    }
    
    //@ PARAMS: userData { name, email, password }
    async register({email, password}) {
        // Validate user data
        const hashedPassword = this.authDomain.hashPassword({email, password});
        const user = { email, password: hashedPassword };
        // Save user to the database
        await this.userRepo.create(user);
        return user;
    }
} 