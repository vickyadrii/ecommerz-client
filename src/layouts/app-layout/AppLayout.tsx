import Header from "./header/Header";

import { Outlet } from "react-router";
import { AppSidebar } from "./sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <Header />
      <div className="w-full flex items-start">
        <AppSidebar />

        <main className="md:mt-12 mt-10 p-5 w-full">
          <SidebarTrigger />
          <div className="mt-4">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default AppLayout;
