import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Pen } from "lucide-react";
import Link from "next/link";
import { CategoryColumns } from "../_components/columns";
import { CategoryClient } from "../_components/category-client";
import { prismaDb } from "@/lib/prismaDb";
import { Heading } from "@/components/common/heading";
import { format } from "date-fns";

const CategoryPage = async () => {
  const data = await prismaDb.categories.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedCategory: CategoryColumns[] = data?.map((item) => ({
    id: item.id,
    name: item.name,
    url: item.url,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="pt-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <Heading
          title={`Total Category (${data.length})`}
          description="Your all category"
        />
        <Button>
          <Pen className="mr-2 h-4 w-4" />
          <Link href="/admin/category/create">Create Category</Link>
        </Button>
      </div>
      <Separator className={cn("my-4")} />
      <div className="flex-col">
        <div className="flex-1 space-y-3 p-5 pt-8">
          <CategoryClient data={formatedCategory} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
