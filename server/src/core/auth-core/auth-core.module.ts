import { Module } from '@nestjs/common';
import { AuthCoreService } from './auth-core.service';
import { BcryptModule } from '../bcrypt/bcrypt.module';

@Module({
    imports: [BcryptModule],
    providers: [AuthCoreService],
    exports: [AuthCoreService],
})
export class AuthCoreModule { }
