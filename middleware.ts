import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
// import { jwt } from "./utils";
// import { isAuthValid } from `./lib/auth';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!session) {
        return NextResponse.redirect(new URL(`/auth/login?p=${req.nextUrl.pathname}`, req.url))
    }

    return NextResponse.next();

    // try {
    //     // console.log(req.nextUrl.pathname.startsWith('/checkout'));

    //     if (!!token) {
    //         return NextResponse.next();
    //     } else {
    //         return NextResponse.rewrite(new URL(`/auth/login`, req.url))
    //     }

    // } catch (error) {
    //     return NextResponse.rewrite(new URL(`/auth/login`, req.url))
    // }

}

export const config = {
    matcher: ["/checkout/(.*)"]
};