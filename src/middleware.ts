// import { AUTH_ROUTE, NOAUTH_ROUTE } from "common/helpers/route";
import { NextRequest, NextResponse } from "next/server";
import routeConstant from "./constants/route.constant";

const WHITE_LIST = ["api", "favicon", "assets", "_next", "images", "vercel"];

function getRedirectUrl(req, url) {
  const domain = req.headers.get("host") || "";
  const prefix = req?.headers.get("x-forwarded-proto")
    ? req?.headers.get("x-forwarded-proto") + "://"
    : process.env.NODE_ENV === "production"
    ? "https://"
    : "http://";

  return new URL(prefix + domain + url, req.nextUrl);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const CURRENT_PATH = pathname.split("/")[1];

  let isWhitelist = false;
  WHITE_LIST.forEach((cur) => {
    if (CURRENT_PATH.startsWith(cur)) {
      isWhitelist = true;
    }
  });

  if (isWhitelist) {
    return NextResponse.next();
  }

  const isAuthed = !!req?.cookies.get("refresh") || false;

  const baseUrl = getRedirectUrl(req, routeConstant.ItemList);
  const loginUrl = getRedirectUrl(req, "/login");

  if (!isAuthed && CURRENT_PATH !== "login") {
    return NextResponse.redirect(loginUrl);
  } else if ((isAuthed && CURRENT_PATH === "login") || pathname === "/") {
    return NextResponse.redirect(baseUrl);
  }

  return NextResponse.next();
}
