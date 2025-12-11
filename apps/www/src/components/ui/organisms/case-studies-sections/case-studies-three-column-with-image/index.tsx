import {CaseStudy} from '@/models/case-study.model'
import {cn} from '@/utils/toolbox'
import Button from '@/components/ui/atoms/button'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import Image from 'next/image'
import Link from 'next/link'

export type CaseStudiesThreeColumnWithImageProps = {
  title: string
  subtitle: string
  caseStudies: Array<CaseStudy>
}

export default function CaseStudiesThreeColumnWithImage(props: CaseStudiesThreeColumnWithImageProps) {
  return (
    <ComponentLayout className='bg-primary-200'>
      <div className='pb-20 pt-9 lg:pb-[104px] lg:pt-[120px] space-y-10 lg:space-y-20'>
        <div className='mx-auto space-y-4 max-w-4xl'>
          <h2 className='w-fit text-[44px] leading-[48px] font-medium text-primary-600 lg:text-center lg:mx-auto lg:leading-[58px]'>
            {props.title}
          </h2>
          <p className='text-xl leading-[30px] text-primary-600 font-normal text-left lg:text-center'>
            {props.subtitle}
          </p>
        </div>
        <div className='mt-11'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {props.caseStudies?.map((caseStudy, index) => (
              <div
                key={index}
                className={cn(
                  'rounded-3xl w-full h-full flex flex-col items-start gap-x-10 gap-y-6 sm:gap-y-8 p-6 sm:p-8 bg-white'
                )}
              >
                <div className='w-full'>
                  <Image
                    className='object-cover w-full h-60 rounded-xl'
                    src={caseStudy.image.url}
                    width={caseStudy.image.width}
                    height={caseStudy.image.height}
                    alt={caseStudy.image.alternateText || caseStudy.image.name}
                  />
                </div>
                <div className='flex flex-col justify-between w-full h-full'>
                  <div className='space-y-4'>
                    <h3 className='text-lg leading-6 font-medium text-brand-600 \ line-clamp-2'>{caseStudy.title}</h3>
                    <p className='text-sm leading-6 text-primary-400 font-normal'>{caseStudy.description}</p>
                  </div>
                  <Button
                    asChild
                    size='large'
                    className='text-white bg-brand-600 px-6 hover:text-white hover:bg-brand-600'
                  >
                    <Link href={`/case-studies/${caseStudy.slug}`}>{caseStudy.cta}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}
