import {ImageProps} from '../../../../../models/image.model'
import {replaceBrTagWithNewline} from '@/utils/toolbox'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import Image from 'next/image'

export type CertificationsBadgesWithTitleProps = {
  title: string
  subtitle?: string
  horizontalBadgesImage: ImageProps
  verticalBadgesImage: ImageProps
}

export default function CertificationsBadgesWithTitle(props: CertificationsBadgesWithTitleProps) {
  const title = replaceBrTagWithNewline(props.title)
  const subtitle = props.subtitle ? replaceBrTagWithNewline(props.subtitle) : undefined

  return (
    <ComponentLayout gradientVariant='floatingGradient'>
      <div className='py-20 lg:pb-[104px] lg:pt-[120px]'>
        <div className='mx-auto space-y-12 max-w-4xl'>
          <div className='text-center space-y-4 max-w-4xl mx-auto'>
            <h2
              className='w-fit mx-auto text-[44px] leading-[48px] font-extrabold text-center tracking-tight \
             bg-clip-text text-secondary-500 lg:leading-[58px]'
            >
              {title}
            </h2>
            {subtitle && <p className='text-base leading-7 text-slate-400 font-light'>{subtitle}</p>}
          </div>
          <Image
            className='object-cover hidden sm:block'
            src={props.horizontalBadgesImage.url}
            width={props.horizontalBadgesImage.width}
            height={props.horizontalBadgesImage.height}
            alt={props.horizontalBadgesImage.alternateText || props.horizontalBadgesImage.name}
          />
          <Image
            className='object-cover block sm:hidden'
            src={props.verticalBadgesImage.url}
            width={props.verticalBadgesImage.width}
            height={props.verticalBadgesImage.height}
            alt={props.verticalBadgesImage.alternateText || props.verticalBadgesImage.name}
          />
        </div>
      </div>
    </ComponentLayout>
  )
}
