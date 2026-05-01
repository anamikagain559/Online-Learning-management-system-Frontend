import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole, canAccessRoute } from './lib/auth-utils';
import { getUserInfo } from './services/auth/getUserInfo';
import { deleteCookie, getCookie } from './services/auth/tokenHandlers';

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // 1️⃣ Get accessToken from cookies
    const accessToken = await getCookie("accessToken") || null;

    let userRole: UserRole | null = null;

    // 2️⃣ If token exists, verify it
    if (accessToken) {
        try {
            const verifiedToken: JwtPayload | string = jwt.verify(
                accessToken,
                process.env.JWT_SECRET as string
            );

            if (typeof verifiedToken === "string") {
                await deleteCookie("accessToken");
                await deleteCookie("refreshToken");
                return NextResponse.redirect(new URL("/login", request.url));
            }

            userRole = verifiedToken.role as UserRole;
        } catch (err) {
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    const routerOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // 3️⃣ Rule: Logged in user trying to access login/register → redirect to default dashboard
    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
    }

    // 4️⃣ Rule: Public routes (no auth needed)
    if (routerOwner === null) {
        return NextResponse.next();
    }

    // 5️⃣ Rule: Not logged in → redirect to login with ?redirect=
    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 6️⃣ Rule: Password change flow
    if (accessToken) {
        const userInfo = await getUserInfo();

        if (userInfo?.needPasswordChange) {
            if (pathname !== "/reset-password") {
                const resetUrl = new URL("/reset-password", request.url);
                resetUrl.searchParams.set("redirect", pathname);
                return NextResponse.redirect(resetUrl);
            }
            return NextResponse.next();
        }

        if (!userInfo?.needPasswordChange && pathname === "/reset-password") {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }
    }

    // 7️⃣ Rule: Check access permissions
    if (userRole && !canAccessRoute(userRole, routerOwner)) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
    }

    // 8️⃣ Default → allow
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
};
