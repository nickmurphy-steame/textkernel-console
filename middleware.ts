import { NextResponse, NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export default function middleware(req: NextRequest) {
  console.log("middleware");
  if (!isAuthenticated()) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(`${absoluteURL}login`);
  }
}

export const config = {
  matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
};
