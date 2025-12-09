'use client'

import {Article} from '@/models/article.model'
import {DateTime} from 'luxon'
import {useEffect, useState} from 'react'
import ArticleCard from '@/components/ui/molecules/cards/article'
import ComponentLayout from '@/components/ui/atoms/component-layout'

export type BlogThreeColumnProps = {
  title: string
  subtitle: string
  articles: Array<Article>
}

export default function BlogThreeColumn(props: BlogThreeColumnProps) {
  const [filteredPosts, setFilteredPosts] = useState<Array<Article>>([])

  useEffect(() => {
    setFilteredPosts([])
    const filteredArticles = props.articles
    setTimeout(() => {
      setFilteredPosts(
        filteredArticles.sort(
          (a, b) => DateTime.fromISO(b.publishedOn).toMillis() - DateTime.fromISO(a.publishedOn).toMillis()
        )
      )
    }, 100)
  }, [])

  const articles = filteredPosts.map((article) => (
    <ArticleCard
      key={article.slug}
      article={article}
      fixedHeight
    />
  ))

  return (
    <ComponentLayout
      gradientVariant='floatingGradient'
      className='bg-primary-600'
    >
      <div className='py-20 pt-6 lg:py-[104px]'>
        <div className='mx-auto max-w-7xl space-y-10 lg:space-y-20'>
          <div className='space-y-4 max-w-4xl'>
            <h2 className='w-fit text-[44px] leading-[1.1875] font-extrabold tracking-tight text-white'>
              {props.title}
            </h2>
            <p className='text-base leading-7 text-white font-light'>{props.subtitle}</p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>{articles}</div>
        </div>
      </div>
    </ComponentLayout>
  )
}
