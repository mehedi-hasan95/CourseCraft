"use server";
import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { CreateCourseSchema } from "@/schema/teacher/course";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export const CreateCourseAction = async (
  values: z.infer<typeof CreateCourseSchema>
) => {
  try {
    const currentUser = await CurrentUser();
    const currentUserRole = await CurrentUserRole();
    if (!currentUser && currentUserRole !== "TEACHER") {
      redirect("/");
    }
    const validateField = CreateCourseSchema.safeParse(values);
    if (!validateField.success) {
      return { error: "Invalidate fields" };
    }
    const { title, description, categoryId, image, isPublished, price } =
      validateField.data;
    const collectedData = {
      title,
      description,
      categoryId,
      image,
      price,
      isPublished,
      userId: currentUser?.id as string,
    };
    await prismaDb.course.create({
      data: collectedData,
    });
    revalidatePath("teacher/courses");
    return { success: "Course Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const DeleteCourseAction = async (id: string) => {
  try {
    const currentUser = await CurrentUser();
    const currentUserRole = await CurrentUserRole();
    if (!currentUser && currentUserRole !== "TEACHER") {
      return { error: "You are not elegable to delete the course" };
    }
    await prismaDb.course.delete({
      where: {
        id,
        userId: currentUser?.id as string,
      },
    });
    revalidatePath("teacher/courses");
    return { success: "Course Delete Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
