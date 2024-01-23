"use client";

import { DataTable } from "@/components/custom/data-table";
import { CourseColumns, columns } from "./columns";

interface CourseClientProps {
  data: CourseColumns[];
}

export const CourseClient: React.FC<CourseClientProps> = ({ data }) => {
  return (
    <div>
      <DataTable searchKey="title" columns={columns} data={data} />
    </div>
  );
};
