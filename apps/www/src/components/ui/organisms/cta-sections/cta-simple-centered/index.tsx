import {ArrowRightIcon} from '@heroicons/react/24/outline'
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
    <ComponentLayout>
      <div className='pb-20 pt-9 lg:pb-[104px] lg:pt-[120px] space-y-10 lg:space-y-20'>
        <div className='mx-auto text-center space-y-4 max-w-4xl'>
          <h2 className='w-fit text-[44px] leading-[1.1875] font-extrabold tracking-tight  bg-clip-text text-secondary-500 lg:mx-auto'>
            {props.title}
          </h2>
          <p className='text-base leading-7 text-slate-400 font-light'>{props.subtitle}</p>
        </div>
        <div className='flex items-center justify-center !mt-10'>
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
            <Link href={props.cta.link}>{props.cta.title}</Link>
          </Button>
        </div>
      </div>
    </ComponentLayout>
  )
}
