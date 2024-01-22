"use server";

import { CurrentUserRole } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { CategorySchema } from "@/schema/admin";
import { revalidatePath } from "next/cache";
import * as z from "zod";

// Create Category
export const CreateCategoryAction = async (
  values: z.infer<typeof CategorySchema>
) => {
  try {
    const validateField = CategorySchema.safeParse(values);
    if (!validateField.success) {
      return { error: "Invalidate fields" };
    }
    const userRole = await CurrentUserRole();
    if (userRole !== "ADMIN") {
      return { error: "Unauthorize User" };
    }
    // Convert slug
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    const { name } = validateField.data;
    const slug = slugify(name);

    const data = { name, url: slug };

    await prismaDb.categories.create({
      data: data,
    });

    revalidatePath("/admin/category");
    return { success: "Category created successfully" };
  } catch (error) {
    return { error: "Category already exist" };
  }
};

// Get Category
export const GetAllCategoryAction = async () => {
  try {
    const data = await prismaDb.categories.findMany();
    return { data, status: 200 };
  } catch (error) {
    return null;
  }
};

// Update Category
export const UpdateCategoryAction = async (
  values: z.infer<typeof CategorySchema>,
  id: string
) => {
  try {
    const validateField = CategorySchema.safeParse(values);
    if (!validateField.success) {
      return { error: "Invalidate fields" };
    }
    const userRole = await CurrentUserRole();
    if (userRole !== "ADMIN") {
      return { error: "Unauthorize User" };
    }
    // Convert slug
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    const { name } = validateField.data;
    const slug = slugify(name);

    const data = { name, url: slug };

    await prismaDb.categories.update({
      where: {
        id: id,
      },
      data,
    });

    revalidatePath("/admin/category");
    return { success: "Category created successfully" };
  } catch (error) {
    return { error: "Category already exist" };
  }
};

// Delete Category
export const DeleteCategoryAction = async (id: string) => {
  try {
    const userRole = await CurrentUserRole();
    if (userRole !== "ADMIN") {
      return { error: "Unauthorize User" };
    }
    await prismaDb.categories.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
