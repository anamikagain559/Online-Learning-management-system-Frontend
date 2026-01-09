""
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: [ "USER", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "ADMIN"],
                },
           

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["USER","ADMIN"],
                },
            ],
        },
    ]
}



export const userNavItems: NavSection[] = [
 
        {
            items: [
               
                   {
                title: "Travel Plans",
                href: "/dashboard/travel-plans",
                icon: "Users", // ✅ String
                roles: ["USER"],
            },

            ]
        },
        
    
  

]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
           
            {
                title: "Users",
                href: "/admin/dashboard/user-management",
                icon: "Users", // ✅ String
                roles: ["ADMIN"],
            },
             {
                title: "Travel Plans",
                href: "/admin/dashboard/travel-plans",
                icon: "Users", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    },
   
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "USER":
            return [...commonNavItems, ...userNavItems];
       
        default:
            return [];
    }
}