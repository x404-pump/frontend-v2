import { NextResponse } from 'next/server';
import subdomains from './subdomains.json';

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");

  // Define a list of allowed domains (including localhost and the real domain)
  const allowedDomains = ["localhost:3000", "x404pump.fun"];

  // Check if the current hostname is in the list of allowed domains
  const isAllowedDomain = allowedDomains.some(domain => hostname.includes(domain));

  // Extract the possible subdomain from the URL
  const subdomain = hostname.split('.')[0];

  // If we are on an allowed domain and it is not a subdomain, allow the request
  if (isAllowedDomain && !subdomains.some(d => d.subdomain === subdomain)) {
    return NextResponse.next();
  }

  const subdomainData = subdomains.find(d => d.subdomain === subdomain);

  if (subdomainData) {
    // Rewrite the URL to a dynamic route based on the subdomain
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }

  return new Response(null, { status: 404 });
}