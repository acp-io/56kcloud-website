import {ArrowRightIcon} from 'lucide-react'
import {CaseStudy} from '@/models/case-study.model'
import Image from 'next/image'
import Link from 'next/link'

export type CaseStudyCardProps = {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({caseStudy}: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className='flex flex-col overflow-hidden cursor-pointer border border-primary-300 rounded-3xl w-full h-full bg-white'
    >
      <div className='w-full h-64 relative'>
        <Image
          src={caseStudy.image.url}
          alt={caseStudy.image.alternateText || caseStudy.image.name}
          width={caseStudy.image.width}
          height={caseStudy.image.height}
          className='object-cover w-full h-full [mask-image:linear-gradient(to_top,transparent_0%,black_50%)]'
        />
      </div>
      <div className='flex flex-col p-6 sm:p-8'>
        <div className='space-y-4'>
          <h3 className='text-lg leading-6 font-semibold w-fit  bg-clip-text text-brand-600 line-clamp-2'>
            {caseStudy.title}
          </h3>
          <p className='text-sm leading-6 text-primary-400 font-light line-clamp-3'>{caseStudy.description}</p>
        </div>
        <div className='flex flex-row items-center gap-2 mt-4 ml-auto'>
          <p className='text-sm font-normal text-brand-600'>View Case Study</p>
          <ArrowRightIcon
            className='w-4 h-4 text-brand-600'
            strokeWidth={2}
          />
        </div>
      </div>
    </Link>
  )
}
