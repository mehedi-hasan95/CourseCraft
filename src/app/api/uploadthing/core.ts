import { CurrentUser } from "@/lib/current-user";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const currentUser = await CurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorize user");
  }
  return { currentUser };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "audio", "video", "image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseVideo: f({ video: { maxFileSize: "256MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
