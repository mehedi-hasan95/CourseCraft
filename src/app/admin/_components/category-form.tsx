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
import { CreateCategoryAction } from "@/actions/admin/create-category-action";
import { useState, useTransition } from "react";
import { FormError } from "@/components/form/form-error";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export const CategoryForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CategorySchema>) {
    setError("");
    startTransition(() => {
      CreateCategoryAction(values).then((data) => {
        setError(data?.error);
        {
          data.success && router.push("/admin/category");
        }
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="Category" {...field} />
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
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
};
