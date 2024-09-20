// import { NextResponse, NextRequest } from 'next/server';

// export const config = {
//   matcher: [
//     "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
//   ],
// };

// const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL;
// const ROOT_DOMAIN = process.env.NEXT_PUBLIC_CLIENT_ROOT_DOMAIN;

// export default async function middleware(req: NextRequest) {
//   const url = req.nextUrl;

//   // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
//   let hostname = req.headers
//     .get("host")!
//     .replace(".localhost:3000", `.${ROOT_DOMAIN}`)

//   // special case for Vercel preview deployment URLs
//   if (
//     hostname.includes("---") &&
//     hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
//   ) {
//     hostname = `${hostname.split("---")[0]}.${process.env.NEXT_PUBLIC_CLIENT_ROOT_DOMAIN}`;
//   }

//   const searchParams = req.nextUrl.searchParams.toString();
  
//   // Get the pathname of the request (e.g. /, /about, /blog/first-post)
//   const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

//   // Rewrite for the landing page
//   if (hostname === process.env.NEXT_PUBLIC_CLIENT_ROOT_DOMAIN) {
//     return NextResponse.rewrite(new URL(path, url));
//   }
    

//   // rewrites for app pages
//   if (hostname == `app.${process.env.NEXT_PUBLIC_CLIENT_ROOT_DOMAIN}`) {
//     if (path === "/") {
//       return NextResponse.redirect(new URL("/dashboard", url));
//     }
//     return NextResponse.rewrite(new URL(path, url));
//   }

//   // special case for doc pages
//   if (hostname === `docs.${process.env.NEXT_PUBLIC_CLIENT_ROOT_DOMAIN}`) {
//     return NextResponse.redirect(
//       "https://x404pump.gitbook.io/x404pump-docs",
//     );
//   }

//   return new Response("Not Found", { status: 404 });
// }