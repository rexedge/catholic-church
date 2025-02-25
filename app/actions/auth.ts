"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { createUser } from "../actions/user";
import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendPasswordResetEmail } from "./email";

export async function login(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    redirect("/");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}

export async function signup(formData: FormData) {
  try {
    const result = await createUser(formData);

    if ("error" in result && result.error) {
      return result;
    }

    // Log the user in automatically after signup
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    redirect("/");
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Something went wrong during signup." };
    }
    throw error;
  }
}
export async function requestPasswordReset(email: string) {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Don't reveal if user exists or not for security
    if (!user) {
      // We still return success even if user doesn't exist
      // This prevents email enumeration attacks
      return { success: true };
    }

    // Generate a reset token
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenHash = createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token expiry (1 hour from now)
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    // Save the token in the database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: resetTokenHash,
        resetTokenExpiry,
      },
    });

    // Send reset email
    const resetUrl = `${process.env.AUTH_URL}/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user.email, user.firstName, resetUrl);

    return { success: true };
  } catch (error) {
    console.error("Password reset request error:", error);
    return { error: "Failed to send password reset email." };
  }
}

export async function verifyResetToken(token: string) {
  try {
    // Hash the token from the URL
    const resetTokenHash = createHash("sha256").update(token).digest("hex");

    // Find user with this token that hasn't expired
    const user = await prisma.user.findFirst({
      where: {
        resetToken: resetTokenHash,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return { error: "Invalid or expired reset token." };
    }

    return { valid: true, email: user.email };
  } catch (error) {
    console.error("Token verification error:", error);
    return { error: "Failed to verify reset token." };
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    // Hash the token from the URL
    const resetTokenHash = createHash("sha256").update(token).digest("hex");

    // Find user with this token that hasn't expired
    const user = await prisma.user.findFirst({
      where: {
        resetToken: resetTokenHash,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return { error: "Invalid or expired reset token." };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear reset token fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    return { error: "Failed to reset password." };
  }
}
