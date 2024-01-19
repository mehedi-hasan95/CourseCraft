import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex gap-x-2 text-xl font-bold items-center">
      <Image
        src="/logo.svg"
        alt="logo"
        height={500}
        width={500}
        className="h-6 w-6"
      />{" "}
      <p className="text-sky-700 hidden md:block">CourseCraft</p>
    </Link>
  );
};
