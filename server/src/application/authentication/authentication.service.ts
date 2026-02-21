import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCoreService } from 'src/core/auth-core/auth-core.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/core/bcrypt/bcrypt.service';
import * as schema from 'src/database/schema/schema';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly authCoreService: AuthCoreService,
        private readonly jwtService: JwtService,
        private readonly bcryptService: BcryptService,
    ) { }

    async signup(data: typeof schema.users.$inferInsert) {
        return this.authCoreService.create(data);
    }

    async login(email: string, pass: string) {
        const user = await this.authCoreService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await this.bcryptService.compare(pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }
}
