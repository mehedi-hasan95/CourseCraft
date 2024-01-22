import { GetAllCategoryAction } from "@/actions/admin/create-category-action";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Pen } from "lucide-react";
import Link from "next/link";

const CategoryPage = async () => {
  const data = await GetAllCategoryAction();
  return (
    <div className="pt-4">
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl font-bold">
          Total Category: {data?.data.length}
        </h2>
        <Button>
          <Pen />
          <Link href="/admin/category/create">Create Category</Link>
        </Button>
      </div>
      <Separator className={cn("my-4")} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.data.map((item) => (
          <div key={item.id}>
            <Link href={item.url}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
