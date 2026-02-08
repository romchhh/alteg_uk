import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Захист /api/admin/*
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("admin_auth")?.value;
    const validUser = process.env.ADMIN_USER;
    const validPass = process.env.ADMIN_PASS;

    if (!validUser || !validPass) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const expectedToken = toBase64(`${validUser}:${validPass}`);

    if (!token || token !== expectedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
  }

  // Захист /admin (крім /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_auth")?.value;
    const validUser = process.env.ADMIN_USER;
    const validPass = process.env.ADMIN_PASS;

    if (!validUser || !validPass) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const expectedToken = toBase64(`${validUser}:${validPass}`);

    if (!token || token !== expectedToken) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Якщо вже залогінений і йде на /admin/login — редірект на /admin
  if (pathname === "/admin/login") {
    const token = request.cookies.get("admin_auth")?.value;
    const validUser = process.env.ADMIN_USER;
    const validPass = process.env.ADMIN_PASS;

    if (validUser && validPass && token) {
      const expectedToken = toBase64(`${validUser}:${validPass}`);
      if (token === expectedToken) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
