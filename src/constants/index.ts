import type { SidebarItem } from "@/types";
import { CircleDollarSign, Home } from "lucide-react";

export const sidebarItems: SidebarItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Products",
    url: "/products",
    icon: CircleDollarSign,
  },
];
