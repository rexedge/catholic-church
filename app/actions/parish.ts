"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { handleActionError, ActionError } from "@/lib/utils";
import { auth } from "@/auth";
import { ParishSchema } from "@/lib/validation";

export async function createParish(formData: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      throw new ActionError("Unauthorized", 403);
    }

    const validatedFields = ParishSchema.parse({
      name: formData.get("name"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      country: formData.get("country"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      website: formData.get("website"),
    });

    const parish = await prisma.parish.create({
      data: validatedFields,
    });

    revalidatePath("/parishes");
    return { data: parish };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function updateParish(parishId: string, formData: FormData) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      throw new ActionError("Unauthorized", 403);
    }

    const validatedFields = ParishSchema.parse({
      name: formData.get("name"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      country: formData.get("country"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      website: formData.get("website"),
    });

    const parish = await prisma.parish.update({
      where: { id: parishId },
      data: validatedFields,
    });

    revalidatePath("/parishes");
    return { data: parish };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function deleteParish(parishId: string) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      throw new ActionError("Unauthorized", 403);
    }

    await prisma.parish.delete({
      where: { id: parishId },
    });

    revalidatePath("/parishes");
    return { success: true };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getParish(parishId: string) {
  try {
    const parish = await prisma.parish.findUnique({
      where: { id: parishId },
      include: {
        users: true,
        masses: true,
        events: true,
      },
    });

    if (!parish) {
      throw new ActionError("Parish not found", 404);
    }

    return { data: parish };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getParishes(query?: {
  search?: string;
  city?: string;
  state?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const page = query?.page || 1;
    const limit = query?.limit || 10;
    const skip = (page - 1) * limit;

    const where = {
      OR: query?.search
        ? [
            { name: { contains: query.search, mode: "insensitive" } },
            { city: { contains: query.search, mode: "insensitive" } },
          ]
        : undefined,
      city: query?.city,
      state: query?.state,
    };

    const [parishes, total] = await Promise.all([
      prisma.parish.findMany({
        // @ts-expect-error: error
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      // @ts-expect-error: error
      prisma.parish.count({ where }),
    ]);

    return {
      data: parishes,
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
