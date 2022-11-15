import bcrypt from 'bcrypt';

export class CipherUtils {
    async hash(plainText: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(plainText, saltRounds);
    }
}