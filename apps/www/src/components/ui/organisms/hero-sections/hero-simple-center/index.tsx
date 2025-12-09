export type HeroSimpleCenterProps = {
  title: string
  subtitle: string
}

export default function HeroSimpleCenter(props: HeroSimpleCenterProps) {
  return (
    <div className='overflow-hidden pt-14 bg-brand-600'>
      <div className='px-6 pt-14 lg:px-8'>
        <div className='max-w-2xl pt-24 mx-auto text-center sm:pt-40'>
          <h2 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>{props.title}</h2>
          <p className='mt-6 text-lg leading-8 text-white'>{props.subtitle}</p>
        </div>
      </div>
    </div>
  )
}
