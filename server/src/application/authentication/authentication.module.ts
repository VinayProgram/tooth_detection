import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { AuthCoreModule } from 'src/core/auth-core/auth-core.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BcryptModule } from 'src/core/bcrypt/bcrypt.module';

@Module({
    imports: [
        AuthCoreModule,
        BcryptModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1d' },
            }),
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
})
export class AuthenticationModule { }
