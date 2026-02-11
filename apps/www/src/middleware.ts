import {NextRequest, NextResponse} from 'next/server'
import {locales} from '../configs/shared'
import redirects from './redirects.json'
import type {Locale} from '../configs/shared'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Strip leading slash
  const pathWithoutSlash = pathname.slice(1)

  // Handle root path
  if (!pathWithoutSlash) {
    return NextResponse.redirect(new URL('https://www.acp.io/'), { status: 301 })
  }

  // Split into segments
  const segments = pathWithoutSlash.split('/')
  const firstSegment = segments[0]

  // Check if first segment is a locale
  const isLocale = locales.includes(firstSegment as Locale)

  if (!isLocale) {
    // No language prefix — check if the path itself is a known redirect
    const targetPath = redirects[pathWithoutSlash as keyof typeof redirects]
    if (targetPath !== undefined && targetPath !== '') {
      return NextResponse.redirect(new URL(`https://www.acp.io/${targetPath}`), { status: 301 })
    }
    // Otherwise redirect to homepage per REDIR-05
    return NextResponse.redirect(new URL('https://www.acp.io/'), { status: 301 })
  }

  // Extract language and path after locale
  const lang = firstSegment
  let pathAfterLocale = segments.slice(1).join('/')

  // Strip trailing slash from pathAfterLocale for consistent lookup
  if (pathAfterLocale.endsWith('/')) {
    pathAfterLocale = pathAfterLocale.slice(0, -1)
  }

  // Handle bare locale path (e.g., /en/ or /en)
  if (!pathAfterLocale) {
    return NextResponse.redirect(new URL('https://www.acp.io/'), { status: 301 })
  }

  // Look up path in redirects
  const targetPath = redirects[pathAfterLocale as keyof typeof redirects]

  if (targetPath !== undefined) {
    // Path found in redirects
    if (targetPath === '') {
      // Empty string means redirect to homepage
      return NextResponse.redirect(new URL('https://www.acp.io/'), { status: 301 })
    } else {
      // Valid target - preserve language prefix
      return NextResponse.redirect(new URL(`https://www.acp.io/${lang}/${targetPath}`), { status: 301 })
    }
  }

  // Path not found in redirects - redirect to homepage per REDIR-04
  return NextResponse.redirect(new URL('https://www.acp.io/'), { status: 301 })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|apple-icon.png).*)']
}
