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
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/custom/image-upload";
import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Categories, Course } from "@prisma/client";
import { CreateCourseSchema } from "@/schema/teacher/course";
import { CreateCourseAction } from "@/actions/teacher/create-course-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { FormError } from "@/components/form/form-error";
import { Heading } from "@/components/common/heading";
import { Separator } from "@/components/ui/separator";

interface CreateCourseFormProps {
  initialData: Course | null;
  categorys: Categories[];
}
export const CreateCourseForm: React.FC<CreateCourseFormProps> = ({
  initialData,
  categorys,
}) => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const title = initialData ? "Update the course" : "Create a course";
  const action = initialData ? "Update Course" : "Create Course";
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateCourseSchema>>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || undefined,
      image: initialData?.image || undefined,
      price: initialData?.price || undefined,
      categoryId: initialData?.categoryId || undefined,
      isPublished: initialData?.isPublished || undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateCourseSchema>) {
    setError("");
    startTransition(() => {
      CreateCourseAction(values).then((data) => {
        setError(data?.error);
        if (data.success) {
          toast.success(data?.success);
          router.push("/teacher/courses");
        }
      });
    });
  }
  return (
    <div>
      <Heading title={title} />
      <Separator className="my-4" />
      <div className="grid md:grid-cols-2 gap-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              disabled={isPending}
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Course..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={isPending}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Price</FormLabel>
                  <FormControl>
                    <Input placeholder="10.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categorys?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
    </div>
  );
};
