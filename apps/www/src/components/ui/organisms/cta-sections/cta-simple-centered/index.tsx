import {CTAProps} from '@/models/cta.model'
import Button from '@/components/ui/atoms/button'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import Link from 'next/link'

export type CTASimpleCenteredProps = {
  title: string
  subtitle: string
  cta: CTAProps
}

export default function CTASimpleCentered(props: CTASimpleCenteredProps) {
  return (
    <ComponentLayout className='bg-brand-100'>
      <div className='pb-20 pt-9 lg:pb-[104px] lg:pt-[120px] space-y-10 lg:space-y-20'>
        <div className='mx-auto text-center space-y-4 max-w-4xl'>
          <h2 className='w-fit mx-auto text-[44px] leading-[48px] font-medium text-brand-600 lg:mx-auto'>
            {props.title}
          </h2>
          <p className='text-xl leading-[30px] text-primary-600 font-normal'>{props.subtitle}</p>
        </div>
        <div className='flex items-center justify-center !mt-10'>
          <Button
            asChild
            size='large'
            className='text-white bg-brand-600 px-6 hover:text-white hover:bg-brand-600'
          >
            <Link href={props.cta.link}>{props.cta.title}</Link>
          </Button>
        </div>
      </div>
    </ComponentLayout>
  )
}
