import {CardProps} from '@/models/card.model'

export default function TextCard({title, description}: CardProps) {
  return (
    <div className='space-y-2'>
      <div className='flex flex-row items-center gap-x-3'>
        <h3 className='text-[26px] leading-8 font-medium text-brand-600'>{title}</h3>
      </div>
      <p className='text-lg leading-7 text-primary-600 font-normal'>{description}</p>
    </div>
  )
}
