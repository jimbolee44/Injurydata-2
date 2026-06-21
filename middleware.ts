import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, verifyToken } from './lib/auth'

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    return new NextResponse('AUTH_SECRET not set', { status: 500 })
  }
  const token = req.cookies.get(COOKIE_NAME)?.value
  const ok = await verifyToken(secret, token)
  if (ok) return NextResponse.next()
  const url = req.nextUrl.clone()
  url.pathname = '/login'
  url.searchParams.set('next', req.nextUrl.pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!login|api/login|api/logout|_next/static|_next/image|favicon.ico).*)'],
}
