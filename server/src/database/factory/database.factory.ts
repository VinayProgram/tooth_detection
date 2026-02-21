import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
import * as schema from '../schema/schema';

export const DRIZZLE_CONNECTION = 'DRIZZLE_CONNECTION';

export const drizzleProvider = {
    provide: DRIZZLE_CONNECTION,
    useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
            connectionString,
        });
        return drizzle(pool, { schema });
    },
    inject: [ConfigService],
};
