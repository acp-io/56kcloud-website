'use client'

import {Tag} from '@/models/tag.model'
import {useEffect, useState} from 'react'
import {useSearchParams} from 'next/navigation'
import Badge from '@/components/ui/atoms/badge'
import Link from 'next/link'
import slugify from 'slugify'

export type TagListProps = {
  tags: Array<Tag>
}

export default function TagList({tags}: TagListProps) {
  const queryTag = useSearchParams()?.get('tag')
  const [sortedTags, setSortedTags] = useState<Array<Tag>>([])

  useEffect(() => {
    setSortedTags(
      tags
        ? tags.sort((a, b) =>
            slugify(a.name).toLowerCase() === queryTag ? -1 : slugify(b.name).toLowerCase() === queryTag ? 1 : 0
          )
        : []
    )
  }, [tags])

  return (
    <div className='flex items-center space-x-2'>
      {sortedTags?.map((tag) => {
        const tagName = slugify(tag.name).toLowerCase()
        const href = queryTag === tagName ? '/blog' : `/blog?tag=${tagName}`
        return (
          <Link
            key={tag.name}
            href={href}
          >
            <Badge
              className={
                queryTag
                  ? slugify(tag.name).toLowerCase() === queryTag
                    ? 'bg-brand-600 text-white ring-0 hover:bg-brand-600 hover:text-white'
                    : 'bg-brand-600 text-white ring-0 opacity-30 hover:bg-brand-600 hover:text-white'
                  : 'bg-brand-600 text-white ring-0 hover:bg-brand-600 hover:text-white'
              }
            >
              {tag.name}
            </Badge>
          </Link>
        )
      })}
    </div>
  )
}
