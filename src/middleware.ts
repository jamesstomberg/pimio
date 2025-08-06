import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define an array of PROTECTED routes.
const protectedRoutes = ['/dashboard', '/product'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!isProtectedRoute(pathname)) {
        return NextResponse.next();
    }

    const sessionCookie = request.cookies.get('session')?.value;

    if (!sessionCookie || isSessionInvalid(sessionCookie)) {
        const loginUrl = new URL('/login', request.url);

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

function isProtectedRoute(pathname: string): boolean {
    return protectedRoutes.some((route) => pathname.startsWith(route));
}

function isSessionInvalid(session: string): boolean {
    try {
        const parsedSession = JSON.parse(session);

        if (!parsedSession?.user?.token) {
            return true;
        }

        return false;
    } catch {
        return true;
    }
}
