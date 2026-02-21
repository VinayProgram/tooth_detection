import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_CONNECTION } from 'src/database/factory/database.factory';
import * as schema from 'src/database/schema/schema';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class AuthCoreService {
    constructor(
        @Inject(DRIZZLE_CONNECTION)
        private readonly db: NodePgDatabase<typeof schema>,
        private readonly bcryptService: BcryptService,
    ) { }

    async create(data: typeof schema.users.$inferInsert) {
        if (data.password) {
            data.password = await this.bcryptService.hash(data.password);
        }
        return this.db.insert(schema.users).values(data).returning();
    }

    async findById(id: number) {
        return this.db.query.users.findFirst({
            where: eq(schema.users.id, id),
        });
    }

    async findByEmail(email: string) {
        return this.db.query.users.findFirst({
            where: eq(schema.users.email, email),
        });
    }

    async update(id: number, data: Partial<typeof schema.users.$inferInsert>) {
        if (data.password) {
            data.password = await this.bcryptService.hash(data.password);
        }
        return this.db
            .update(schema.users)
            .set(data)
            .where(eq(schema.users.id, id))
            .returning();
    }

    async delete(id: number) {
        return this.db.delete(schema.users).where(eq(schema.users.id, id)).returning();
    }
}
