'use client'

import {ImageProps} from '@/models/image.model'
import {cn} from '@/utils/toolbox'
import {useState} from 'react'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import Image from 'next/image'
import MarkdownViewer from '../../markdown'

export type CaseStudyContentSectionProps = {
  title: string
  description: string
  image: ImageProps
  attachedText: string
  content: string
}

export default function CaseStudyContentSection({
  title,
  description,
  content,
  image,
  attachedText
}: CaseStudyContentSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <ComponentLayout className='bg-primary-200'>
      <div className='space-y-14 pb-16 pt-52 lg:space-y-20 lg:pb-20 lg:pt-60'>
        <div className='flex flex-col gap-y-20 lg:gap-y-24'>
          <div className='flex flex-col'>
            <div className='space-y-8'>
              <h2 className='w-fit max-w-5xl mx-auto text-[44px] leading-[48px] font-medium text-center text-brand-600 lg:leading-[58px]'>
                {title}
              </h2>
            </div>
            <div className='max-w-3xl mx-auto text-xl leading-[30px] font-normal text-center mt-7 text-primary-600'>
              <p>{description}</p>
            </div>
          </div>
          <div className='h-[480px] overflow-hidden rounded-3xl'>
            <Image
              src={image.url}
              alt={image.alternateText || image.name}
              onLoad={() => {
                setIsLoaded(true)
              }}
              width={image.width}
              height={image.height}
              className={cn('object-cover w-full h-full', isLoaded && 'bg-white')}
            />
          </div>
        </div>
        <div className={attachedText ? 'flex flex-col lg:flex-row lg:gap-x-36' : ''}>
          {attachedText && (
            <div className='w-full lg:w-3/12 order-2 lg:order-1'>
              <MarkdownViewer
                content={attachedText}
                className='text-base leading-[26px] p-0 [&_h3]:text-primary-600'
              />
            </div>
          )}
          <div className={attachedText ? 'w-full lg:w-9/12 order-1 lg:order-2' : 'w-full'}>
            <MarkdownViewer
              content={content}
              className='p-0'
              imageClassName='!w-full !h-auto mt-0'
            />
          </div>
        </div>
      </div>
    </ComponentLayout>
  )
}
