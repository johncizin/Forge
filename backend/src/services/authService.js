import jwt from 'jsonwebtoken';

export class AuthService {
    constructor({ userRepo, authDomain }) {
        this.userRepo = userRepo;
        this.authDomain = authDomain;
    }

    async login({ email, password }) {
        const user = await this.userRepo.getByEmail(email);
        if (!user) {
            throw new Error('Invalid Credentials');
        }
        
        const isValid = await this.authDomain.verifyPassword(password, user.passwordHash);
        if (!isValid) {
            throw new Error('Invalid Credentials');
        }

        const token = jwt.sign({ userId: user.id}, "secret", { expiresIn: '1h' }); //testing "secret" REPLACE
        
        return {user, token};
    }
}