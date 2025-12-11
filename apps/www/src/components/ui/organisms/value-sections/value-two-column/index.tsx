import {Value} from '@/models/value.model'
import {cn} from '@/utils/toolbox'
import ComponentLayout from '@/components/ui/atoms/component-layout'

export type ValueTwoColumnProps = {
  title: string
  subtitle: string
  values: Value[]
}

export default function ValueTwoColumn(props: ValueTwoColumnProps) {
  return (
    <ComponentLayout>
      <div className='pb-20 pt-9 lg:pb-[104px] lg:pt-[120px]'>
        <div className='mx-auto text-center space-y-4 max-w-4xl'>
          <h2 className='w-fit mx-auto text-[44px] leading-[48px] font-medium text-center text-primary-600 lg:leading-[58px]'>
            {props.title}
          </h2>
          <p className='text-xl leading-[30px] text-primary-600 font-normal'>{props.subtitle}</p>
        </div>
        <div className='grid grid-cols-1 mt-10 gap-y-8 md:gap-8 md:grid-cols-12 md:grid-rows-2 w-full md:mt-20'>
          {props.values.map((value, index) => (
            <div
              key={value.name}
              className={cn(
                'relative w-full col-span-1 md:col-span-6 lg:col-span-4',
                index === 3 ? 'lg:col-start-3' : '',
                index === 4 ? 'lg:col-start-7' : ''
              )}
            >
              <div className='flex flex-col items-center justify-center gap-y-2 p-8 z-10 bg-primary-200 rounded-3xl'>
                <h3 className='text-[26px] leading-8 font-medium text-brand-600 text-center'>{value.name}</h3>
                <p className='text-lg leading-7 text-primary-400 font-normal text-center'>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ComponentLayout>
  )
}
