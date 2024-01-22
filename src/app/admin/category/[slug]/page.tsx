import { CategoryForm } from "@/app/admin/_components/category-form";
import { prismaDb } from "@/lib/prismaDb";

const CreateCategory = async ({ params }: { params: { slug: string } }) => {
  const data = await prismaDb.categories.findUnique({
    where: {
      url: params.slug,
    },
  });
  return (
    <div>
      <CategoryForm initialData={data} />
    </div>
  );
};

export default CreateCategory;
