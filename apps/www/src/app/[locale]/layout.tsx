import '../../styles/global.css'
import {Metadata} from 'next'
import {cn} from '@/utils/toolbox'
import {hostname} from '../../../configs/server'
import {locales} from '../../../configs/shared'
import localFont from 'next/font/local'

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

const apexNew = localFont({
  src: [
    {
      path: '../../../fonts/apex-new-book.otf',
      weight: '400',
      style: 'book'
    },
    {
      path: '../../../fonts/apex-new-medium.otf',
      weight: '500',
      style: 'medium'
    }
  ],
  variable: '--font-apex-new'
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
      <body className={cn('relative bg-white isolate', apexNew.className)}>{children}</body>
    </html>
  )
}
