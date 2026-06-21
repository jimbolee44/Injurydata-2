import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, signToken } from '@/lib/auth'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const password = process.env.APP_PASSWORD
  const secret = process.env.AUTH_SECRET
  if (!password || !secret) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }
  const form = await req.formData()
  const submitted = String(form.get('password') ?? '')
  const next = String(form.get('next') ?? '/')

  if (submitted !== password) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('error', '1')
    if (next && next !== '/') url.searchParams.set('next', next)
    return NextResponse.redirect(url, { status: 303 })
  }

  const token = await signToken(secret)
  const target = next.startsWith('/') ? next : '/'
  const res = NextResponse.redirect(new URL(target, req.url), { status: 303 })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}
