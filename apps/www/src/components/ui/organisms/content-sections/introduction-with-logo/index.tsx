import {ImageProps} from '@/models/image.model'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import Image from 'next/image'

export type IntroductionWithLogoProps = {
  title: string
  description: string
  logo: ImageProps
  gradient?: boolean
}

export default function IntroductionWithLogo(props: IntroductionWithLogoProps) {
  return (
    <ComponentLayout>
      <div className='py-20 lg:py-[104px]'>
        <div className='mx-auto max-w-6xl'>
          <div className='w-full relative overflow-hidden rounded-3xl lg:rounded-[48px] bg-primary-600'>
            <div className='flex flex-col gap-x-20 gap-y-10 p-6 pt-12 pb-8 lg:p-20 lg:flex-row'>
              <div className='w-full space-y-6 lg:w-3/5'>
                <h3 className='w-fit text-4xl leading-[42px] font-medium text-white'>{props.title}</h3>
                <p className='text-lg leading-7 text-white font-normal'>{props.description}</p>
              </div>
              <div className='flex items-center justify-start w-full lg:w-2/5 lg:justify-center'>
                <Image
                  src={props.logo.url}
                  width={props.logo.width}
                  height={props.logo.height}
                  alt={props.logo.alternateText || props.logo.name}
                  className='w-40 h-auto'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}
