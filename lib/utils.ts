import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class ActionError extends Error {
  constructor(message: string, public statusCode = 400) {
    super(message);
    this.name = "ActionError";
  }
}

export async function handleActionError(error: unknown) {
  if (error instanceof z.ZodError) {
    return {
      error: error.errors.map((err) => err.message).join(", "),
      status: 400,
    };
  }

  if (error instanceof ActionError) {
    return {
      error: error.message,
      status: error.statusCode,
    };
  }

  console.error("Action error:", error);
  return {
    error: "An unexpected error occurred",
    status: 500,
  };
}
