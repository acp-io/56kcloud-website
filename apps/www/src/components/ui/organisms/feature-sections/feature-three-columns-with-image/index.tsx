import {Feature} from '@/models/feature.model'
import Button from '@/components/ui/atoms/button'
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
    <ComponentLayout className='bg-primary-200'>
      <div className='py-20 pt-6 lg:py-[104px]'>
        <div className='mx-auto max-w-7xl space-y-10 lg:space-y-20'>
          <div className='mr-auto space-y-4 max-w-4xl'>
            <h2 className='w-fit text-[44px] leading-[48px] font-medium text-secondary-500 lg:leading-[58px]'>
              {props.title}
            </h2>
            <p className='text-xl leading-[30px] text-slate-400 font-normal'>{props.subtitle}</p>
          </div>
          <div className='mt-11'>
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
              {props.features?.map((feature, index) => (
                <div
                  key={index}
                  className='relative rounded-3xl w-full h-[592px] overflow-hidden bg-white flex flex-col'
                >
                  <div className='relative w-full h-60 overflow-hidden flex-shrink-0'>
                    <Image
                      className='object-cover w-full h-full rounded-t-3xl'
                      src={feature.image.url}
                      width={feature.image.width}
                      height={feature.image.height}
                      alt={feature.image.alternateText || feature.image.name}
                    />
                  </div>
                  <div className='flex flex-col justify-between p-6 sm:p-8 bg-white gap-y-7 flex-1 min-h-0'>
                    <div className='space-y-4'>
                      <h3 className='text-[26px] leading-8 font-semibold w-fit bg-clip-text text-brand-600'>
                        {feature.title}
                      </h3>
                      <p className='text-lg leading-7 text-primary-400 font-normal line-clamp-6'>
                        {feature.description}
                      </p>
                    </div>
                    <Button
                      asChild
                      size='large'
                      className='text-white bg-brand-600 px-6 hover:text-white hover:bg-brand-600 flex-shrink-0'
                    >
                      <Link href={feature.link}>{feature.cta}</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}
