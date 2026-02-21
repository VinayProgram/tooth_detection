import { Module } from '@nestjs/common';
import { AuthCoreService } from './auth-core.service';

@Module({
    providers: [AuthCoreService],
    exports: [AuthCoreService],
})
export class AuthCoreModule { }
