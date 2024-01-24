"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

interface UploadthingFileUploadProps {
  onChange: (url?: string) => void;
  endPoint: keyof typeof ourFileRouter;
}

export const UploadthingFileUpload = ({
  onChange,
  endPoint,
}: UploadthingFileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};
