import {CTAProps} from '@/models/cta.model'
import {ImageProps} from '@/models/image.model'
import Button from '@/components/ui/atoms/button'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import Link from 'next/link'

export type HeroWithFloatingGradientsProps = {
  title: string
  subtitle: string
  image: ImageProps
  cta: CTAProps
}

export default function HeroWithFloatingGradients(props: HeroWithFloatingGradientsProps) {
  return (
    <ComponentLayout className='overflow-hidden bg-brand-600'>
      <div className='pb-8 pt-52 lg:pt-64 lg:pb-20'>
        <h1 className='w-fit mx-auto text-center text-5xl leading-[1.1875] font-medium text-white lg:text-7xl lg:leading-[1.2]'>
          {props.title}
        </h1>
        <div className='text-xl font-normal text-center mt-7 text-white'>
          <p>{props.subtitle}</p>
        </div>
        <div className='flex items-center justify-center mt-10'>
          <Button
            asChild
            size='large'
            tone={props.cta.tone}
            className='text-brand-600 bg-white px-6 hover:bg-primary-100 hover:text-brand-600'
          >
            <Link
              href={props.cta.link}
              target='_blank'
            >
              {props.cta.title}
            </Link>
          </Button>
        </div>
      </div>
    </ComponentLayout>
  )
}
