import '../../styles/global.css'
import {Inter} from 'next/font/google'
import {Metadata} from 'next'
import {cn} from '@/utils/toolbox'
import {hostname} from '../../../configs/server'
import {locales} from '../../../configs/shared'

export const metadata: Metadata = {
  metadataBase: new URL(hostname)
}

export async function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

export type RootLayoutProps = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

const inter = Inter({
  weight: ['300', '400', '500', '600', '800'],
  preload: false
})

export default function Root({children, params}: RootLayoutProps) {
  return (
    <html lang={params.locale}>
      <head>
        <link
          rel='icon'
          href='/favicon.ico'
          sizes='any'
        />
        <link
          rel='apple-touch-icon'
          href='/apple-icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
        <meta
          content='@56kCloud'
          name='twitter:site'
        />
        <meta
          content='summary'
          name='twitter:card'
        />
      </head>
      <body className={cn('relative bg-white isolate', inter.className)}>{children}</body>
    </html>
  )
}
