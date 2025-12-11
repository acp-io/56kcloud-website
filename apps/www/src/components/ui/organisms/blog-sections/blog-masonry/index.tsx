'use client'

import {Article} from '@/models/article.model'
import {DateTime} from 'luxon'
import {useEffect, useState} from 'react'
import {useSearchParams} from 'next/navigation'
import ArticleCard from '@/components/ui/molecules/cards/article'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import MasonryLayout from '@/components/ui/molecules/masonry'
import slugify from 'slugify'

export type BlogMasonryProps = {
  title: string
  subtitle: string
  articles: Array<Article>
}

export default function BlogMasonry(props: BlogMasonryProps) {
  const searchParams = useSearchParams()
  const queryTag = searchParams.get('tag')
  const [filteredPosts, setFilteredPosts] = useState<Array<Article>>([])

  useEffect(() => {
    setFilteredPosts([])
    const filteredArticles = props.articles.filter((article) =>
      queryTag ? article.tags.map((tag) => slugify(tag.name).toLowerCase()).includes(queryTag?.toString()) : true
    )
    setTimeout(() => {
      setFilteredPosts(
        filteredArticles.sort(
          (a, b) => DateTime.fromISO(b.publishedOn).toMillis() - DateTime.fromISO(a.publishedOn).toMillis()
        )
      )
    }, 100)
  }, [queryTag])

  const articles = filteredPosts.map((article) => (
    <ArticleCard
      key={article.slug}
      article={article}
      className='flex-1'
    />
  ))

  return (
    <ComponentLayout className='bg-primary-200'>
      <div className='pb-20 pt-9 lg:pt-20 lg:pb-[104px]'>
        <MasonryLayout>{articles}</MasonryLayout>
      </div>
    </ComponentLayout>
  )
}
