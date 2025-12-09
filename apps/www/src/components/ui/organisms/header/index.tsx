'use client'

import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {Dialog} from '@headlessui/react'
import {Dictionary} from '@/models/dictionary.model'
import {cn, getNavigationLinks} from '@/utils/toolbox'
import {useState} from 'react'
import LanguageSwitcher from '../../molecules/language-switcher'
import Link from 'next/link'
import Logo from '../../svgs/logos/acp-e'
import NavigationMenu from '../../molecules/navigation-menu'

export type HeaderProps = {
  dictionary: Dictionary
  bannerProps?: unknown // BannerProps
}

export default function Header({dictionary}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigation = getNavigationLinks(dictionary)

  return (
    <header className='absolute inset-x-0 top-0 z-10 flex flex-col justify-center items-center bg-white'>
      <nav
        className='flex items-center justify-between w-full p-6 max-w-7xl'
        aria-label='Global'
      >
        <div className='relative'>
          <Link
            href='/'
            className='text-slate-50'
          >
            <span className='sr-only'>ACP Engineering</span>
            <Logo className='h-8 xl:h-10' />
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon
              className='w-7 h-7'
              aria-hidden='true'
            />
          </button>
        </div>
        <div className='hidden lg:flex lg:justify-between'>
          <div className='flex items-center gap-x-8'>
            <NavigationMenu
              navigationItems={navigation}
              orientation='horizontal'
            />
          </div>
          <LanguageSwitcher mobileMenuOpen={mobileMenuOpen} />
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel
          className={cn(
            mobileMenuOpen ? 'animate-in slide-in-from-right-full' : 'animate-out slide-out-to-right-full',
            'fixed flex flex-col justify-between inset-y-0 right-0 z-50 w-full p-6 overflow-y-auto \
          bg-gray-900 sm:max-w-sm sm:ring-1 sm:ring-white/10 duration-500 ease-in-out'
          )}
        >
          <div className='flex flex-col gap-y-12'>
            <div className='flex items-center justify-between'>
              <Link
                href='/'
                className='-m-1.5 p-1.5 text-white'
              >
                <span className='sr-only'>ACP Engineering</span>
                <Logo className='h-7' />
              </Link>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-400'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon
                  className='w-6 h-6'
                  aria-hidden='true'
                />
              </button>
            </div>
            <div className='flex flex-col gap-y-3'>
              <NavigationMenu
                navigationItems={navigation}
                orientation='vertical'
              />
            </div>
          </div>
          <LanguageSwitcher mobileMenuOpen={mobileMenuOpen} />
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
