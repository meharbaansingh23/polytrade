import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const country = request.geo?.country ||
    request.headers.get('x-vercel-ip-country')

  if (country === 'IN') {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Not Available</title>
          <style>
            body {
              font-family: sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background: #FAFAFA;
            }
            .box {
              text-align: center;
              max-width: 400px;
              padding: 40px;
            }
            h1 { color: #1D1D1D; font-size: 22px; }
            p { color: #6B6B6B; font-size: 15px; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>Not Available in Your Region</h1>
            <p>Polytrade is not currently available in India.
            We hope to expand to your region in the future.</p>
          </div>
        </body>
      </html>`,
      {
        status: 451,
        headers: { 'Content-Type': 'text/html' }
      }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
