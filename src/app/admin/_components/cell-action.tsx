"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { DeleteCategoryAction } from "@/actions/admin/create-category-action";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: CategoryColumns;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`The copied id is ${id}`);
  };
  // Delete a category
  const onDelete = async (id: string) => {
    await DeleteCategoryAction(id);
    toast.success(`The Category delete successfully`);
    router.refresh();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onCopy(data.id)}
          className={cn("cursor-pointer")}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem className={cn("cursor-pointer")} asChild>
          <Link href={`/admin/category/${data.url}`} className="flex">
            <Edit className="mr-2 h-4 w-4" />
            Update
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn("cursor-pointer")}
          onClick={() => onDelete(data.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
