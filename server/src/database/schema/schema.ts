import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    phone: varchar('phone', { length: 20 }),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const appointments = pgTable('appointments', {
    id: serial('id').primaryKey(),
    userId: serial('user_id').references(() => users.id),
    date: timestamp('date').notNull(),
    description: text('description'),
    status: varchar('status', { length: 50 }).default('pending'),
    createdAt: timestamp('created_at').defaultNow(),
});
