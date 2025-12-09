'use client'

import {ArrowRightIcon} from '@heroicons/react/24/outline'
import {CTAProps} from '@/models/cta.model'
import {ImageProps} from '@/models/image.model'
import {cn} from '@/utils/toolbox'
import {replaceBrTagWithNewline} from '@/utils/toolbox'
import {useState} from 'react'
import Button from '@/components/ui/atoms/button'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import Image from 'next/image'
import Link from 'next/link'

export type HeroWithImageProps = {
  imagePosition: 'left' | 'right'
  surtitle?: string
  title: string
  subtitle: string
  cta?: CTAProps
  image: ImageProps
  imageFit?: 'fill' | 'center'
}

export default function HeroWithImage(props: HeroWithImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const title = replaceBrTagWithNewline(props.title)
  const subtitle = replaceBrTagWithNewline(props.subtitle)

  const shouldOpenInNewTab = (href: string) => {
    return href.startsWith('http://') || href.startsWith('https://')
  }

  return (
    <ComponentLayout gradientVariant='heroGradient'>
      <div
        className={cn('flex gap-16 pb-8 pt-52 lg:pb-20 lg:pt-60', props.imagePosition === 'left' && 'flex-row-reverse')}
      >
        <div className='flex flex-col justify-center flex-1'>
          <div className={cn(props.surtitle ? 'space-y-8' : '')}>
            {props.surtitle && (
              <div>
                <span className='text-base font-semibold  bg-clip-text text-primary-500'>{props.surtitle}</span>
              </div>
            )}
            <h2 className='w-fit max-w-5xl mr-auto text-5xl leading-[1.1875] font-extrabold tracking-tight  bg-clip-text text-secondary-500 lg:text-[58px]'>
              {title}
            </h2>
          </div>
          <div className='max-w-3xl mr-auto text-lg font-light mt-7 text-slate-400'>
            <p>{subtitle}</p>
          </div>
          {props.cta && (
            <div className='flex items-center justify-start mt-10'>
              <Button
                asChild
                size='large'
                tone={props.cta.tone}
                shape='circle'
                className='text-slate-950 bg-slate-50/85 px-6 hover:bg-current hover:text-current'
                trailing={
                  <ArrowRightIcon
                    className='w-4 h-4 text-sky-500'
                    strokeWidth={2}
                  />
                }
              >
                <Link
                  href={props.cta.link}
                  target={shouldOpenInNewTab(props.cta.link) ? '_blank' : undefined}
                  rel={shouldOpenInNewTab(props.cta.link) ? 'noopener noreferrer' : undefined}
                >
                  {props.cta.title}
                </Link>
              </Button>
            </div>
          )}
        </div>
        <div className='flex-1'>
          <div className='w-full h-96 flex items-center justify-center p-2 border-gradient rounded-3xl bg-slate-900'>
            <Image
              src={props.image.url}
              alt={props.image.alternateText || props.image.name}
              onLoad={() => {
                setIsLoaded(true)
              }}
              width={props.image.width}
              height={props.image.height}
              className={cn(
                'rounded-2xl w-full h-full',
                isLoaded && 'bg-transparent',
                props.imageFit === 'fill' ? 'object-fill' : 'w-[90%] h-auto'
              )}
            />
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}
