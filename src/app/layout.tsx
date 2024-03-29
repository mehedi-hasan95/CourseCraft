import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "@/components/common/sidebar";
import { Logo } from "@/components/common/logo";
import { SidebarRoutesMobile } from "@/components/common/sidebar-routes-mobile";
import { Separator } from "@/components/ui/separator";
import { AuthProvider } from "@/provider/AuthProvider";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { CurrentUser } from "@/lib/current-user";
import { UserInfo } from "@/components/custom/user-info";
import { ArrowRightLeft } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await CurrentUser();
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] rounded-lg border"
          >
            <ResizablePanel className="hidden md:block" defaultSize={25}>
              <Sidebar />
            </ResizablePanel>
            <ResizableHandle className="hidden md:flex" withHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full p-6 flex-col relative">
                <div className="">
                  <div className="flex justify-between items-center">
                    <div className="md:hidden">
                      <SidebarRoutesMobile />
                    </div>
                    <Logo />
                    <div className="flex items-center gap-2">
                      {currentUser && currentUser?.role !== "USER" && (
                        <Button>
                          <ArrowRightLeft className="h-4 w-4 mr-2" />
                          <Link href="/teacher/courses">Teacher Mode</Link>
                        </Button>
                      )}
                      {currentUser ? (
                        <UserInfo />
                      ) : (
                        <LoginButton>
                          <Button>Login</Button>
                        </LoginButton>
                      )}
                    </div>
                  </div>
                  <Separator className="my-2" />
                </div>
                {children}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
          <Toaster position="top-center" richColors />
        </body>
      </html>
    </AuthProvider>
  );
}
