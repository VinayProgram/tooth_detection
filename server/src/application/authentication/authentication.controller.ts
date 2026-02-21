import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Response } from 'express';
import * as schema from 'src/database/schema/schema';

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @Post('signup')
    async signup(@Body() data: typeof schema.users.$inferInsert) {
        return this.authenticationService.signup(data);
    }

    @Post('login')
    async login(
        @Body() body: { email: string; pass: string },
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await this.authenticationService.login(body.email, body.pass);

        response.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });

        return {
            message: 'Login successful',
            user: result.user,
        };
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('access_token');
        return { message: 'Logged out' };
    }
}
