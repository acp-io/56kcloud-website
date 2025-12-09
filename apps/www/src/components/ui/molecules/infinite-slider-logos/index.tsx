import {ImageProps} from '@/models/image.model'
import {cn} from '@/utils/toolbox'
import Image from 'next/image'

export type InfiniteSliderLogosProps = {
  logos: Array<ImageProps>
}

export default function InfiniteSliderLogos(props: InfiniteSliderLogosProps) {
  const logosLength = props.logos.length
  const pixelsPerSecond = 50
  const animationSpeed = (500 * logosLength) / 2 / pixelsPerSecond
  const shouldAnimate = logosLength > 3
  const logosRow = (
    <>
      {props.logos.map((logo, index) => (
        <div
          key={props.logos.length + index}
          className='flex items-center justify-center mx-4 w-[234px] p-7 sm:p-8 lg:p-10 bg-primary-900 rounded-2xl \
          border border-slate-800'
        >
          <Image
            className='max-h-6 sm:max-h-8 lg:max-h-10'
            src={logo.url}
            alt={logo.alternateText || logo.name}
            width={logo.width}
            height={logo.height}
          />
        </div>
      ))}
    </>
  )

  return (
    <div
      className='relative mt-12 overflow-hidden whitespace-nowrap sm:mx-12 /
      [mask-image:_linear-gradient(to_right,_transparent_0,_white_32px,white_calc(100%-32px),_transparent_100%)]
      sm:[mask-image:_linear-gradient(to_right,_transparent_0,_white_80px,white_calc(100%-80px),_transparent_100%)]'
    >
      <div
        className={cn(!shouldAnimate && '!w-full justify-center', 'flex')}
        style={{
          width: `calc(500px * ${logosLength})`,
          animationName: shouldAnimate ? `infiniteSliderAnimationFor${logosLength}` : 'none',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDuration: `${animationSpeed}s`
        }}
      >
        {logosRow}
        {shouldAnimate ? logosRow : null}
      </div>
      <style>{`
        @keyframes infiniteSliderAnimationFor${logosLength} {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-500px * ${logosLength / 2}));
          }
        }
      `}</style>
    </div>
  )
}
