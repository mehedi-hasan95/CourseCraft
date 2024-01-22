"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategorySchema } from "@/schema/admin";
import {
  CreateCategoryAction,
  UpdateCategoryAction,
} from "@/actions/admin/create-category-action";
import { useState, useTransition } from "react";
import { FormError } from "@/components/form/form-error";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Categories } from "@prisma/client";
import { Heading } from "@/components/common/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CategoryFormProps {
  initialData: Categories | null;
}
export const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  // message
  const title = initialData ? "Edit Category" : "Create Category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const action = initialData ? "Save changes" : "Create";
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  // 2. Define a submit handler.
  const id = initialData?.id;
  function onSubmit(values: z.infer<typeof CategorySchema>) {
    setError("");
    startTransition(() => {
      if (initialData) {
        UpdateCategoryAction(values, id as string).then((data) => {
          setError(data?.error);
          if (data.success) {
            router.push("/admin/category");
            toast.success(toastMessage);
          }
        });
      } else {
        CreateCategoryAction(values).then((data) => {
          setError(data?.error);
          if (data.success) {
            router.push("/admin/category");
            toast.success(toastMessage);
          }
        });
      }
    });
  }
  return (
    <div>
      <div className="py-5">
        <Heading title={title} />
        <Separator className={cn("my-3")} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Category"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          {isPending ? (
            <Button disabled>
              Please wait
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button type="submit">{action}</Button>
          )}
        </form>
      </Form>
    </div>
  );
};
