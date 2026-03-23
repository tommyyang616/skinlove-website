import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".") ||
        pathname === "/maintenance" ||
        pathname === "/admin"
    ) {
        return NextResponse.next();
    }

    if (process.env.MAINTENANCE_MODE === "true") {
        const url = request.nextUrl.clone();
        url.pathname = "/maintenance";
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
