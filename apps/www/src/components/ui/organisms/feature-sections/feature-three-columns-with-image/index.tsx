import {ArrowRightIcon} from '@heroicons/react/24/solid'
import {Feature} from '@/models/feature.model'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import Image from 'next/image'
import Link from 'next/link'

export type FeatureThreeColumnsWithImageProps = {
  title: string
  subtitle: string
  features: Array<Feature<'image'>>
}

export default function FeatureThreeColumnsWithImage(props: FeatureThreeColumnsWithImageProps) {
  return (
    <ComponentLayout
      gradientVariant='floatingGradient'
      className='bg-primary-100'
    >
      <div className='py-20 pt-6 lg:py-[104px]'>
        <div className='mx-auto max-w-7xl space-y-10 lg:space-y-20'>
          <div className='mr-auto space-y-4 max-w-4xl'>
            <h2 className='w-fit text-[44px] leading-[1.1875] font-extrabold tracking-tight text-brand-600'>
              {props.title}
            </h2>
            <p className='text-base leading-7 text-primary-600 font-light'>{props.subtitle}</p>
          </div>
          <div className='mt-11'>
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
              {props.features?.map((feature, index) => (
                <Link
                  key={index}
                  href={feature.link}
                >
                  <div className='relative border border-primary-300 rounded-3xl w-full h-[528px] overflow-hidden bg-white'>
                    <div className='relative w-full h-full overflow-hidden'>
                      <Image
                        className='object-cover w-full h-full rounded-xl'
                        src={feature.image.url}
                        width={feature.image.width}
                        height={feature.image.height}
                        alt={feature.image.alternateText || feature.image.name}
                      />
                    </div>
                    <div className='absolute left-0 bottom-0 flex flex-col p-6 pt-0 sm:p-8 bg-white/95 backdrop-blur-sm rounded-b-3xl'>
                      <div className='space-y-4'>
                        <h3 className='text-2xl leading-7 font-semibold w-fit text-brand-600'>{feature.title}</h3>
                        <p className='text-sm leading-6 text-primary-400 font-light line-clamp-4'>
                          {feature.description}
                        </p>
                      </div>
                      <div className='flex flex-row items-center gap-2 mt-4 ml-auto'>
                        <p className='text-sm font-normal text-brand-600'>{feature.cta}</p>
                        <ArrowRightIcon
                          className='w-4 h-4 text-brand-600'
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}
