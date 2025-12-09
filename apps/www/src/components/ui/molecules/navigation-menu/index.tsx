'use client'

import * as React from 'react'
import {NavigationItem} from '@/models/navigation-item.model'
import {
  NavigationMenu as NavigationMenuContainer,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/primitives/navigation-menu'
import {cn} from '@/utils/toolbox'
import {usePathname} from 'next/navigation'
import Button from '@/components/ui/atoms/button'
import Icon from '../../atoms/icon'
import Link from 'next/link'

export type NavigationMenuProps = {
  navigationItems: Array<NavigationItem>
  onLinkClick?: () => void
  orientation?: 'horizontal' | 'vertical'
}

export default function NavigationMenu({
  navigationItems,
  orientation = 'horizontal',
  onLinkClick
}: NavigationMenuProps) {
  const pathname = usePathname()

  const pathMatcher = (path: string) => {
    const isActive = pathname.includes(path)
    return isActive
  }

  return orientation === 'horizontal' ? (
    <NavigationMenuContainer>
      {navigationItems.map((navigationItem, index) =>
        navigationItem.links && navigationItem.links.length >= 1 ? (
          <NavigationMenuList key={index}>
            <NavigationMenuItem>
              <Button
                asChild
                tone='primary'
                variant='default'
                className='pl-5 pr-[18px] text-primary-600 font-medium bg-transparent cursor-pointer'
                onClick={(e) => e.preventDefault()}
              >
                <NavigationMenuTrigger className='gap-1'>{navigationItem.title}</NavigationMenuTrigger>
              </Button>
              <NavigationMenuContent className='left-[2px] p-4 bg-white border-none'>
                <ul className={cn(navigationItem.dropdownWidth, 'space-y-1')}>
                  {navigationItem.links &&
                    navigationItem.links.map((link, index) => (
                      <ListItem
                        key={index}
                        href={link.link}
                        className={cn(
                          'w-full !p-2 text-primary-600 font-medium hover:bg-primary-200',
                          link.icon ? '!pl-2' : '!pl-3'
                        )}
                      >
                        {link.icon && (
                          <div>
                            <Icon
                              {...link.icon}
                              className='w-5 h-5 mr-[14px]'
                              strokeWidth={1.5}
                            />
                          </div>
                        )}
                        <div>{link.title}</div>
                      </ListItem>
                    ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        ) : (
          <Button
            key={index}
            asChild
            tone='primary'
            variant='link'
            className='text-primary-600 !px-0 !py-0 text-sm font-semibold'
          >
            <Link href={navigationItem.link || ''}>{navigationItem.title}</Link>
          </Button>
        )
      )}
    </NavigationMenuContainer>
  ) : (
    <>
      <div className='flex-col space-y-10'>
        {navigationItems.map((navigationItem, index) => (
          <div key={index}>
            <p className='text-base font-medium text-primary-100'>{navigationItem.title}</p>
            <ul
              className={cn(
                !navigationItem.links || navigationItem.links.length === 0 ? 'mt-0' : 'mt-4',
                'space-y-4 w-80 flex flex-col'
              )}
            >
              {navigationItem.links &&
                navigationItem.links.map((link, index) => (
                  <Button
                    key={index}
                    asChild
                    tone='primary'
                    variant='link'
                    className={cn(
                      pathMatcher(link.link) ? '!text-primary-100' : '',
                      'text-sm font-medium text-primary-300 hover:text-primary-100'
                    )}
                  >
                    <Link
                      href={link.link}
                      onClick={onLinkClick}
                    >
                      {link.icon && (
                        <div>
                          <Icon
                            {...link.icon}
                            className='w-5 h-5 mr-[14px]'
                            strokeWidth={1.5}
                          />
                        </div>
                      )}
                      <div>{link.title}</div>
                    </Link>
                  </Button>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({className, title, children, href}, ref) => {
    const pathname = usePathname()

    const pathMatcher = (path: string) => {
      const isActive = pathname.includes(path)
      return isActive
    }

    return (
      <li>
        <NavigationMenuLink
          asChild
          ref={ref}
        >
          <Button
            asChild
            tone='primary'
            variant='link'
            align='start'
            className={cn(className, pathMatcher(href || '') ? 'text-brand-600' : '')}
          >
            <Link href={href || ''}>
              {title}
              {children}
            </Link>
          </Button>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'
