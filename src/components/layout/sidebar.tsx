// "use client";

// import { Heart, Layout, LogOut, PenLine } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { authClient } from "@/lib/auth/client";
// import { cn } from "@/lib/utils";

// const navItems = [
//   { href: "/dashboard", label: "Dashboard", icon: Heart },
//   { href: "/letters", label: "My Letters", icon: PenLine },
//   { href: "/templates", label: "Templates", icon: Layout },
// ];

// export function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   return (
//     <aside className="flex w-64 flex-col border-r bg-card">
//       <div className="flex h-16 items-center gap-2 border-b px-6">
//         <Heart className="size-6 text-primary" />
//         <span className="text-lg font-bold">Love Letter</span>
//       </div>
//       <nav className="flex-1 space-y-1 p-4">
//         {navItems.map((item) => {
//           const Icon = item.icon;
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={cn(
//                 "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
//                 pathname === item.href
//                   ? "bg-primary/10 text-primary"
//                   : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
//               )}
//             >
//               <Icon className="size-5" />
//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>
//       <div className="border-t p-4">
//         <Button
//           variant="ghost"
//           className="w-full justify-start gap-3 text-muted-foreground"
//           onClick={async () => {
//             await authClient.signOut();
//             router.push("/");
//           }}
//         >
//           <LogOut className="size-5" />
//           Sign out
//         </Button>
//       </div>
//     </aside>
//   );
// }
