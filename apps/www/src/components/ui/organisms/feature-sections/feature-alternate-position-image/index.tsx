import {Feature} from '@/models/feature.model'
import {cn} from '@/utils/toolbox'
import Button from '@/components/ui/atoms/button'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import Image from 'next/image'
import Link from 'next/link'

export type FeatureAlternatePositionImageProps = {
  title: string
  subtitle: string
  features: Array<Feature<'image'>>
}

export default function FeatureAlternatePositionImage(props: FeatureAlternatePositionImageProps) {
  const positionInGrid = [
    'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-5',
    'lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-3',
    'lg:col-start-2 lg:col-end-4 lg:row-start-3 lg:row-end-5'
  ]

  return (
    <ComponentLayout className='bg-primary-200'>
      <div className='pb-20 pt-9 lg:pb-[104px] lg:pt-[120px] space-y-10 lg:space-y-20'>
        <div className='text-center space-y-4 max-w-4xl mx-auto'>
          <h2 className='w-fit mx-auto text-[44px] leading-[48px] font-medium text-primary-600 lg:leading-[58px]'>
            {props.title}
          </h2>
          <p className='text-xl leading-[30px] text-primary-600 font-normal'>{props.subtitle}</p>
        </div>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 lg:grid-rows-4'>
          {props.features?.map((feature, index) => (
            <div
              key={index}
              className={cn(positionInGrid[index] || '')}
            >
              <div
                className={cn(
                  'rounded-3xl w-full h-full flex flex-col items-start gap-x-10 gap-y-6 sm:gap-y-8 p-6 sm:p-8 bg-white',
                  index === 0 ? 'lg:flex-col' : 'lg:flex-row',
                  index % 2 !== 0 && index !== 0 ? 'lg:flex-row-reverse' : ''
                )}
              >
                <div className='w-full h-full'>
                  <Image
                    className='object-cover w-full h-60 rounded-xl lg:h-full'
                    src={feature.image.url}
                    width={feature.image.width}
                    height={feature.image.height}
                    alt={feature.image.alternateText || feature.image.name}
                  />
                </div>
                <div className='flex flex-col justify-between w-full h-full gap-y-7'>
                  <div className='space-y-4'>
                    <h3 className='text-[26px] leading-8 font-medium text-brand-600'>{feature.title}</h3>
                    <p className='text-lg leading-7 text-primary-400 font-normal'>{feature.description}</p>
                  </div>
                  <Button
                    asChild
                    size='large'
                    className='text-white bg-brand-600 px-6 hover:text-white hover:bg-brand-600'
                  >
                    <Link href={feature.link}>{feature.cta}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ComponentLayout>
  )
}
