import {CardWithIconProps} from '@/models/card.model'
import Icon from '@/components/ui/atoms/icon'

export default function CardWithIcon({title, icon, description}: CardWithIconProps) {
  return (
    <div className='flex flex-row items-start gap-x-5'>
      <div className='flex items-start h-full translate-y-[6px]'>
        <Icon
          {...icon}
          className='flex-none text-brand-600 w-7 h-7'
          aria-hidden='true'
        />
      </div>
      <div className='flex flex-col h-full justify-start space-y-[2px]'>
        <h3 className='font-medium text-[18px] leading-10 text-primary-600'>{title}</h3>
        <p className='text-base font-normal leading-7 text-primary-400'>{description}</p>
      </div>
    </div>
  )
}
