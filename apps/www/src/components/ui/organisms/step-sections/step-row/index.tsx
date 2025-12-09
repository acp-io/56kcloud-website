'use client'

import ComponentLayout from '@/components/ui/atoms/component-layout'

export type StepRowProps = {
  title: string
  subtitle: string
  steps: Array<{
    number: string
    title: string
  }>
}

export default function StepRow(props: StepRowProps) {
  return (
    <ComponentLayout gradientVariant='floatingGradient'>
      <div className='py-20 lg:pb-[104px] lg:pt-[120px]'>
        <div className='mx-auto text-center space-y-4 max-w-4xl'>
          <h2 className='text-[44px] leading-[1.1875] font-extrabold tracking-tight  bg-clip-text text-secondary-500'>
            {props.title}
          </h2>
          <p className='text-base leading-7 text-slate-400 font-light'>{props.subtitle}</p>
        </div>
        <div className='mt-20'>
          <ol
            role='list'
            className='divide-y divide-slate-800 rounded-2xl border border-slate-800 overflow-hidden md:flex md:divide-y-0'
          >
            {props.steps.map((step, index) => (
              <li
                key={index}
                className='relative md:flex md:flex-1 bg-slate-900'
              >
                <div
                  aria-current='step'
                  className='flex items-center px-6 py-4 text-sm font-medium'
                >
                  <span className='flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-sky-500'>
                    <span className='text-sky-500'>{step.number}</span>
                  </span>
                  <span className='ml-4 text-base leading-6 font-semibold w-fit  bg-clip-text text-primary-500 line-clamp-2'>
                    {step.title}
                  </span>
                </div>
                {index !== props.steps.length - 1 ? (
                  <>
                    <div
                      aria-hidden='true'
                      className='absolute top-0 right-0 hidden h-full w-5 md:block'
                    >
                      <svg
                        fill='none'
                        viewBox='0 0 22 80'
                        preserveAspectRatio='none'
                        className='size-full text-primary-500'
                      >
                        <path
                          d='M0 -2L20 40L0 82'
                          stroke='currentcolor'
                          vectorEffect='non-scaling-stroke'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </ComponentLayout>
  )
}
