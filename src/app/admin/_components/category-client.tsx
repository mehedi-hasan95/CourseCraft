"use client";

import { DataTable } from "@/components/custom/data-table";
import { CategoryColumns, columns } from "./columns";

interface CategoryClientProps {
  data: CategoryColumns[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  return (
    <div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};
