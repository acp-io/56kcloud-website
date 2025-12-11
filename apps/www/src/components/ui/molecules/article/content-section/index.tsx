import {ImageProps} from '@/models/image.model'
import {Tag} from '@/models/tag.model'
import {TeamMember} from '@/models/team-member.model'
import {formatDate} from '@/utils/toolbox'
import ArticleCover from '../cover'
import Avatar from '@/components/ui/atoms/avatar'
import Link from 'next/link'
import MarkdownViewer from '../../markdown'
import PostTagList from '../../tag-list'
import React, {Suspense} from 'react'

export type ArticleContentSectionProps = {
  image: ImageProps
  tags: Array<Tag>
  title: string
  content: string
  publishedOn: string
  author: TeamMember
}

export default function ArticleContentSection({
  image,
  tags,
  title,
  content,
  publishedOn,
  author
}: ArticleContentSectionProps) {
  content = `# ${title} \n ${content}`
  return (
    <div className='flex items-center justify-center pt-48 sm:pt-40 pb-24'>
      <div className='w-full px-6 mx-auto max-w-7xl lg:px-8'>
        <div className='z-50 w-full h-full overflow-auto bg-white/5 max-w-7xl rounded-xl overscroll-contain'>
          <ArticleCover image={image} />
          <div className='w-full p-6 pt-10 bg-primary-200 md:p-10'>
            <div className='flex flex-col-reverse justify-between gap-y-4 md:items-center md:flex-row'>
              <Suspense>
                <PostTagList tags={tags} />
              </Suspense>
              <div className='flex flex-row items-center justify-start overflow-hidden text-sm leading-6 text-primary-600 gap-y-4'>
                <time
                  dateTime={publishedOn}
                  className='md:mr-8'
                >
                  {formatDate(publishedOn)}
                </time>
                <div className='flex items-center gap-x-4 ml-4 md:-ml-4'>
                  <svg
                    viewBox='0 0 2 2'
                    className='-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50 flex'
                  >
                    <circle
                      cx={1}
                      cy={1}
                      r={1}
                    />
                  </svg>
                  <Link
                    href={`/about-us#${author.slug}`}
                    className='flex gap-x-2.5 items-center font-medium hover:underline'
                  >
                    <Avatar
                      size='sm'
                      image={author.avatar}
                    />
                    {author.name}
                  </Link>
                </div>
              </div>
            </div>
            <div className='max-w-full mt-16'>
              <MarkdownViewer
                content={content}
                className='px-0'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
