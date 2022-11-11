import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session && req.nextUrl.pathname.startsWith('/checkout')) {
        return NextResponse.redirect(new URL(`/auth/login?q=${req.nextUrl.pathname}`, req.url));
    }


    const validRoles = ['admin', 'super-user', 'seo'];

    if (!validRoles.includes(session.user.role) && !session && req.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL(`/`, req.url));
    };

    return NextResponse.next();
}

export const config = {
    matcher: ['/checkout', '/admin/:path*']
};