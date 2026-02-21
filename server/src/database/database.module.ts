import { Module, Global } from '@nestjs/common';
import { drizzleProvider } from './factory/database.factory';

@Global()
@Module({
    providers: [drizzleProvider],
    exports: [drizzleProvider],
})
export class DatabaseModule { }
