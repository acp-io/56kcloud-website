import {CardProps} from '@/models/card.model'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import TextCard from '@/components/ui/molecules/cards/text'

export type HeaderWithTextCardsProps = {
  title: string
  subtitle: string
  cards: Array<CardProps>
}

export default function HeaderWithTextCards(props: HeaderWithTextCardsProps) {
  return (
    <ComponentLayout className='bg-brand-100'>
      <div className='pb-8 pt-52 lg:pt-60 lg:pb-20'>
        <div className='flex flex-col justify-between lg:flex-row gap-x-16'>
          <div className='w-full lg:w-2/6'>
            <h2 className='w-fit text-[44px] leading-[48px] font-medium text-brand-600 lg:leading-[58px]'>
              {props.title}
            </h2>
          </div>
          <div className='w-full mt-10 lg:mt-0 lg:pl-8 lg:border-l lg:w-4/6 lg:border-slate-600'>
            <p className='text-xl font-normal text-primary-600 leading-[30px]'>{props.subtitle}</p>
            <div className='flex flex-col mt-20 gap-y-10'>
              {props.cards.map((card) => (
                <TextCard
                  key={card.title}
                  {...card}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}
