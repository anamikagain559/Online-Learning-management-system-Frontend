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
                    roles: ["STUDENT", "INSTRUCTOR", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["STUDENT", "INSTRUCTOR", "ADMIN"],
                },
            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", 
                    roles: ["STUDENT", "INSTRUCTOR", "ADMIN"],
                },
            ],
        },
    ]
}

export const studentNavItems: NavSection[] = [
    {
        items: [
            {
                title: "My Enrollments",
                href: "/dashboard/courses",
                icon: "BookOpen", 
                roles: ["STUDENT"],
            },
        ]
    },
]

export const instructorNavItems: NavSection[] = [
    {
        items: [
            {
                title: "Manage Courses",
                href: "/items/manage",
                icon: "GraduationCap", 
                roles: ["INSTRUCTOR"],
            },
            {
                title: "Add New Course",
                href: "/items/add",
                icon: "PlusCircle",
                roles: ["INSTRUCTOR"],
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
                icon: "Users", 
                roles: ["ADMIN"],
            },
            {
                title: "Courses",
                href: "/admin/dashboard/courses",
                icon: "GraduationCap", 
                roles: ["ADMIN"],
            },
            {
                title: "Enrollments",
                href: "/admin/dashboard/enrollments",
                icon: "UserPlus",
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
        case "STUDENT":
            return [...commonNavItems, ...studentNavItems];
        case "INSTRUCTOR":
            return [...commonNavItems, ...instructorNavItems];
        default:
            return [];
    }
}