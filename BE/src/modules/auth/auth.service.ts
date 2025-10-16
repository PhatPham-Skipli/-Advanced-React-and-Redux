import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async login(user: any): Promise<{ message: string; access_token: string }> {
        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username,
            role: user.role
        };
        return {
            message: 'Login successful',
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}