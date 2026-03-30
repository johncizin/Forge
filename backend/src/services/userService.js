//User service

/* 
I added login here, because i just thought it made the most sense because the user already exists
but i think its better in authService

This really should be for user settings, user profile 
*/
import jwt from 'jsonwebtoken';

export class UserService {
    //@ PARAMS: userRepo , authDomain
    constructor({ userRepo, authDomain }) {
        this.userRepo = userRepo;
        this.authDomain = authDomain;
    }
    
    //@ PARAMS: userData {email, password } 
    //probably will add name
    async register({name, email, password} ){
        
        // Validate user data
        const existing = await this.userRepo.getByEmail(email);
        if (existing) throw new Error("Email in Use Already! Sign in!")
        
        const hashedPassword = await this.authDomain.hashPassword({password});
        const user = { name: name, email: email, passwordHash: hashedPassword };
        // Save user to the database
        const createdUser = await this.userRepo.create(user);

        const { passwordHash, ...safeUser } =  createdUser; //excludes passwordHash
        const token = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { user: safeUser, token };
    }
} 