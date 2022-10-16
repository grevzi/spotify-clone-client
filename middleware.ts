import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWA_SECRET });

  const { pathname } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) return NextResponse.next();

  if (!token && pathname !== "/login")
    return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};
