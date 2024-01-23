import { Heading } from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { prismaDb } from "@/lib/prismaDb";
import { Pen } from "lucide-react";
import Link from "next/link";
import { CourseColumns } from "./_components/columns";
import { format } from "date-fns";
import { CourseClient } from "./_components/course-client";

const Courses = async () => {
  const data = await prismaDb.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatedCourse: CourseColumns[] = data?.map((item) => ({
    id: item.id,
    title: item.title,
    isPublished: item.isPublished,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <Heading
          title={`Total Course (${data?.length})`}
          description="Your all course"
        />
        <Button>
          <Pen className="mr-2 h-4 w-4" />
          <Link href="/teacher/courses/new">Create Course</Link>
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="flex-col">
        <div className="flex-1 space-y-3 p-5 pt-8">
          <CourseClient data={formatedCourse} />
        </div>
      </div>
    </div>
  );
};

export default Courses;
