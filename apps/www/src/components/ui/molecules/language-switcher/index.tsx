'use client'

import {ListItem} from '../navigation-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/primitives/navigation-menu'
import {defaultLocale, locales} from '../../../../../configs/shared'
import {useParams, usePathname} from 'next/navigation'
import Button from '../../atoms/button'
import Link from 'next/link'

export type LanguageSwitcherProps = {
  mobileMenuOpen: boolean
}

export default function LanguageSwitcher({mobileMenuOpen}: LanguageSwitcherProps) {
  const {locale} = useParams()
  const pathname = usePathname()

  async function updateLanguage(lang: string, event?: React.MouseEvent<HTMLElement>) {
    if (event) event.preventDefault()
    let updatedPathname: string | string[] = pathname.split('/')
    updatedPathname.splice(1, 1, lang)
    updatedPathname = updatedPathname.join('/')
    window.location.href = updatedPathname as string
  }

  const pathMatcher = (path: string) => {
    return pathname.startsWith(`/${path}/`)
  }

  return mobileMenuOpen ? (
    <div className='w-full h-auto flex justify-start gap-x-8 mt-8 p-0 pt-4 border-t rounded-none border-slate-800'>
      {locales.map((locale) => (
        <Button
          asChild
          key={locale}
          tone='secondary'
          variant='link'
          className='p-0 text-base text-slate-400 uppercase data-[active=true]:text-slate-50 hover:text-slate-50'
          data-active={pathMatcher(locale)}
        >
          <Link
            href={locale}
            onClick={(e) => updateLanguage(locale, e)}
          >
            {locale}
          </Link>
        </Button>
      ))}
    </div>
  ) : (
    <NavigationMenu
      defaultValue={locale?.toString() || defaultLocale}
      aria-label='Language Switcher'
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <Button
            asChild
            tone='primary'
            variant='default'
            className='px-5 text-primary-600 font-medium bg-transparent cursor-pointer hover:text-primary-600'
            onClick={(e) => e.preventDefault()}
          >
            <NavigationMenuTrigger className='uppercase gap-1'>{locale}</NavigationMenuTrigger>
          </Button>
          <NavigationMenuContent className='!w-28 p-4 bg-white border-none'>
            <ul className='space-y-1'>
              {locales.map((localeItem) => (
                <ListItem
                  key={localeItem}
                  className='w-full'
                >
                  <Button
                    asChild
                    tone='secondary'
                    variant='link'
                    align='start'
                    className='w-full !p-2 !pl-3 text-gray-600 font-medium uppercase hover:bg-primary-200 data-[active=true]:text-red-500'
                    data-active={pathMatcher(localeItem)}
                  >
                    <Link
                      href={`/${locale}`}
                      onClick={(e) => updateLanguage(localeItem, e)}
                    >
                      {localeItem}
                    </Link>
                  </Button>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
