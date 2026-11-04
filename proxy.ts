import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all request paths except:
  // - _next/static, _next/image, _vercel
  // - api routes or file assets containing dots (e.g. favicon.ico, file.svg, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
