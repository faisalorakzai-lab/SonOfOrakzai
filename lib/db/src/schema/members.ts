import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const membersTable = pgTable("members", {
  id: serial("id").primaryKey(),
  memberId: text("member_id").unique(),
  name: text("name").notNull(),
  fatherName: text("father_name").notNull(),
  cnic: text("cnic").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  city: text("city"),
  country: text("country"),
  nationality: text("nationality"),
  location: text("location").notNull(),
  profession: text("profession").notNull(),
  skills: text("skills").notNull(),
  interest: text("interest").notNull(),
  message: text("message"),
  photo: text("photo"),
  issueDate: text("issue_date"),
  expiryDate: text("expiry_date"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertMemberSchema = createInsertSchema(membersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof membersTable.$inferSelect;
