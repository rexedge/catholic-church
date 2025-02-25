import { z } from "zod";

export const ParishSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().default("Nigeria"),
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
});

export const UserSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["PARISHIONER", "PRIEST", "ADMIN"]).default("PARISHIONER"),
  parishId: z.string({
    required_error: "Please select a parish",
  }),
});

export const MassSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  date: z.string(),
  time: z.string(),
  churchLocation: z.string(),
  livestreamLink: z.string().url().optional(),
  priestId: z.string(),
  parishId: z.string(),
});

export const IntentionSchema = z.object({
  intentionText: z.string().min(5),
  massId: z.string(),
  userId: z.string(),
});

export const ThanksgivingSchema = z.object({
  thanksgivingReason: z.string().min(5),
  willAttend: z.boolean().default(true),
  massId: z.string(),
  userId: z.string(),
});

export const EventSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  livestreamLink: z.string().url().optional(),
  organizerId: z.string(),
  parishId: z.string(),
});

export const PaymentSchema = z.object({
  amount: z.number().positive(),
  paymentType: z.enum(["DONATION", "THANKSGIVING", "CHARITY"]),
  paymentMethod: z.enum(["BANK_TRANSFER", "CREDIT_CARD", "MOBILE_MONEY"]),
  userId: z.string(),
  parishId: z.string(),
  thanksgivingId: z.string().optional(),
});

export const LiveStreamSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  streamUrl: z.string().url(),
  startTime: z.string(),
  endTime: z.string().optional(),
  massId: z.string().optional(),
  eventId: z.string().optional(),
});
