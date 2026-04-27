import { pgTable, text, uuid, jsonb, timestamp } from "drizzle-orm/pg-core";

export const appointmentRequestsTable = pgTable("appointment_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  preferredDate: text("preferred_date"),
  treatment: text("treatment"),
  notes: text("notes"),
  transcript: jsonb("transcript"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AppointmentRequest = typeof appointmentRequestsTable.$inferSelect;
export type InsertAppointmentRequest = typeof appointmentRequestsTable.$inferInsert;
