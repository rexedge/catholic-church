"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { handleActionError, ActionError } from "@/lib/utils";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import type { User } from "@prisma/client";
import { UserSchema } from "@/lib/validation";

export async function createUser(formData: FormData) {
  try {
    const role = formData.get("role") as "PARISHIONER" | "PRIEST";

    const validatedFields = UserSchema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      password: formData.get("password"),
      role,
      parishId: formData.get("parishId"),
    });

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedFields.email },
          { phoneNumber: validatedFields.phoneNumber },
        ],
      },
    });

    if (existingUser) {
      throw new ActionError(
        "A user with this email or phone number already exists",
        400
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedFields.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        ...validatedFields,
        password: hashedPassword,
      },
    });

    // If this is a priest signup, notify administrators
    if (role === "PRIEST") {
      await notifyAdminsOfPriestSignup(user);
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    revalidatePath("/users");
    return { data: userWithoutPassword };
  } catch (error) {
    return handleActionError(error);
  }
}

// Add a function to notify admins of priest signups
async function notifyAdminsOfPriestSignup(user: User) {
  // Get all admin users
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { email: true },
  });

  // Here you would implement your notification logic
  // For example, sending emails to admins
  console.log("Notifying admins of new priest signup:", {
    priestName: `${user.firstName} ${user.lastName}`,
    adminEmails: admins.map((admin) => admin.email),
  });
}

// Add a function to verify priest accounts
// export async function verifyPriest(priestId: string) {
//   try {
//     const session = await auth();
//     if (!session || !session.user || session.user.role !== "ADMIN") {
//       throw new ActionError("Unauthorized", 403);
//     }

//     const priest = await prisma.user.update({
//       where: {
//         id: priestId,
//         role: "PRIEST",
//       },
//       data: {
//         isVerified: true,
//       },
//     });

//     // Remove password from response
//     const { password: _, ...priestWithoutPassword } = priest;

//     revalidatePath("/users");
//     return { data: priestWithoutPassword };
//   } catch (error) {
//     return handleActionError(error);
//   }
// }

export async function updateUser(userId: string, formData: FormData) {
  try {
    const session = await auth();
    if (!session) {
      throw new ActionError("Unauthorized", 403);
    }

    // Only allow users to update their own profile unless they're an admin
    if (userId !== session.user?.id && session.user?.role !== "ADMIN") {
      throw new ActionError("Unauthorized", 403);
    }

    const data: Record<string, any> = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phoneNumber: formData.get("phoneNumber"),
    };

    // Only admins can update roles and parish assignments
    if (!session.user || session.user.role === "ADMIN") {
      data.role = formData.get("role");
      data.parishId = formData.get("parishId");
    }

    // Handle password update if provided
    const newPassword = formData.get("password");
    if (
      newPassword &&
      typeof newPassword === "string" &&
      newPassword.length > 0
    ) {
      data.password = await bcrypt.hash(newPassword, 10);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    revalidatePath("/users");
    return { data: userWithoutPassword };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function deleteUser(userId: string) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "ADMIN") {
      throw new ActionError("Unauthorized", 403);
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/users");
    return { success: true };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getUser(userId: string) {
  try {
    const session = await auth();
    if (!session) {
      throw new ActionError("Unauthorized", 403);
    }

    // Users can only view their own profile unless they're an admin
    if (userId !== session.user?.id && session.user?.role !== "ADMIN") {
      throw new ActionError("Unauthorized", 403);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        parish: true,
        masses: true,
        intentions: true,
        thanksgivings: true,
        events: true,
        payments: true,
      },
    });

    if (!user) {
      throw new ActionError("User not found", 404);
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return { data: userWithoutPassword };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getUsers(query?: {
  search?: string;
  role?: "PARISHIONER" | "PRIEST" | "ADMIN";
  parishId?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const session = await auth();
    if (
      !session ||
      !["ADMIN", "PRIEST"].includes(!session.user || session.user.role)
    ) {
      throw new ActionError("Unauthorized", 403);
    }

    const page = query?.page || 1;
    const limit = query?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {
      OR: query?.search
        ? [
            { firstName: { contains: query.search, mode: "insensitive" } },
            { lastName: { contains: query.search, mode: "insensitive" } },
            { email: { contains: query.search, mode: "insensitive" } },
          ]
        : undefined,
      role: query?.role,
      parishId: query?.parishId,
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          parish: true,
          _count: {
            select: {
              masses: true,
              intentions: true,
              thanksgivings: true,
              events: true,
              payments: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data: users,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    return handleActionError(error);
  }
}
