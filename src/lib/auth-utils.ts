export type UserRole = "ADMIN" | "STUDENT" | "INSTRUCTOR" | "USER";

export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

export const authRoutes = ["/login", "/register", "/forgot-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/change-password", "/reset-password"],
    patterns: [], 
}

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/],
    exact: [],
}

export const dashboardProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/],
    exact: [],
}

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

export const getRouteOwner = (pathname: string): "ADMIN" | "DASHBOARD" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }
    if (isRouteMatches(pathname, dashboardProtectedRoutes)) {
        return "DASHBOARD";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") {
        return "/admin/dashboard";
    }
    return "/dashboard";
}

export const canAccessRoute = (role: UserRole, routeOwner: "ADMIN" | "DASHBOARD" | "COMMON"): boolean => {
    if (routeOwner === "COMMON") return true;
    if (routeOwner === "ADMIN") return role === "ADMIN";
    if (routeOwner === "DASHBOARD") return role === "STUDENT" || role === "INSTRUCTOR" || role === "USER";
    return false;
}