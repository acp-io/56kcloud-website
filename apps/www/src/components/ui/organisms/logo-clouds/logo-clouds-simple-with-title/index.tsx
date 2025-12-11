import {Customer} from '@/models/customer.model'
import {Partner} from '@/models/partner.model'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import Image from 'next/image'
import InfiniteSliderLogos from '@/components/ui/molecules/infinite-slider-logos'
import Link from 'next/link'

export type LogoCloudVariant = 'slider' | 'grid'

export type LogoCloudsSimpleWithTitleProps = {
  title: string
  items: Array<Partner | Customer>
  variant?: LogoCloudVariant
}

export default function LogoCloudsSimpleWithTitle(props: LogoCloudsSimpleWithTitleProps) {
  const {variant = 'slider'} = props

  return (
    <ComponentLayout>
      <div className='py-9 lg:py-[104px]'>
        <div className='mx-auto max-w-7xl'>
          <div className='relative w-full h-full rounded-3xl px-6 py-12 pb-20 bg-primary-600 sm:px-8 lg:rounded-[48px] lg:px-12 lg:pt-20'>
            <div className='flex flex-col items-center space-y-4'>
              <h2 className='w-fit text-[44px] leading-[48px] font-medium text-white lg:leading-[58px]'>
                {props.title}
              </h2>
            </div>
            {variant === 'slider' ? (
              <InfiniteSliderLogos logos={props.items.map((item) => item.image)} />
            ) : (
              <div className='w-fit mx-auto grid grid-cols-4 gap-y-8 mt-12'>
                {props.items.map((item, index) => (
                  <Link
                    href={`/partners/${item.link || '#'}`}
                    key={index}
                    className='flex items-center justify-center mx-4 w-[234px] p-7 sm:p-8 lg:p-10 bg-primary-900 rounded-2xl border border-slate-800 z-50 hover:bg-primary-900/50 hover:border-transparent transition-all duration-200'
                  >
                    <Image
                      className='max-h-6 sm:max-h-8 lg:max-h-10'
                      src={item.image.url}
                      alt={item.image.alternateText || item.image.name}
                      width={item.image.width}
                      height={item.image.height}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}
