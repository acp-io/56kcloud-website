import {ImageProps} from '@/models/image.model'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import Image from 'next/image'

export type IntroductionWithLogoProps = {
  surtitle: string
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
          <div className='w-full relative overflow-hidden border border-primary-700 rounded-3xl lg:rounded-[48px] bg-primary-600'>
            <div className='flex flex-col gap-x-20 gap-y-10 p-6 pt-12 pb-8 lg:p-20 lg:flex-row'>
              <div className='w-full space-y-5 lg:w-3/4'>
                <span className='text-base font-semibold bg-clip-text text-white'>{props.surtitle}</span>
                <h3 className='w-fit text-4xl leading-[42px] font-extrabold tracking-tight text-white'>
                  {props.title}
                </h3>
                <p className='text-base leading-[26px] text-white font-light'>{props.description}</p>
              </div>
              <div className='flex items-center justify-start w-full lg:w-1/4 lg:justify-center'>
                <Image
                  src={props.logo.url}
                  width={props.logo.width}
                  height={props.logo.height}
                  alt={props.logo.alternateText || props.logo.name}
                  className='w-36 h-auto'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}
