import { prismaDb } from "@/lib/prismaDb";
import { CreateCourseForm } from "../_components/create-course-form";
import { CurrentUser } from "@/lib/current-user";

const CreateCourse = async ({ params }: { params: { courseId: string } }) => {
  const currentUser = await CurrentUser();
  const category = await prismaDb.categories.findMany();
  const course = await prismaDb.course.findUnique({
    where: {
      id: params.courseId,
      userId: currentUser?.id as string,
    },
  });
  return (
    <div>
      <CreateCourseForm initialData={course} categorys={category} />
    </div>
  );
};

export default CreateCourse;
