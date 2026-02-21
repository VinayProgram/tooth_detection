import { Injectable } from '@nestjs/common';
import { AuthCoreService } from 'src/core/auth-core/auth-core.service';

@Injectable()
export class AuthenticationService {
    constructor(private readonly authCoreService: AuthCoreService) { }
}
