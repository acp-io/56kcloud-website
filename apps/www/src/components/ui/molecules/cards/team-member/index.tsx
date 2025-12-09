import {TeamMember} from '@/models/team-member.model'
import {cn} from '@/utils/toolbox'
import Button from '@/components/ui/atoms/button'
import Image from 'next/image'
import Link from 'next/link'
import Linkedin from '@/components/ui/svgs/logos/linkedin'
import Mail from '@/components/ui/svgs/logos/mail'

export type TeamMemberCardProps = {
  teamMember: TeamMember
  usedLanguage: string
}

export default function TeamMemberCard({teamMember, usedLanguage}: TeamMemberCardProps) {
  return (
    <div
      className='flex items-center justify-center'
      id={teamMember.slug}
    >
      <div className='w-full h-full mx-auto max-w-7xl'>
        <div className='relative w-full h-full flex flex-col border border-slate-800 rounded-3xl bg-slate-900 overflow-hidden xl:flex-row'>
          <div className='w-full h-full p-6 pb-0 overflow-hidden xl:w-[37%] xl:pb-6'>
            <Image
              src={teamMember.avatar.url}
              alt={teamMember.name}
              width={teamMember.avatar.width}
              height={teamMember.avatar.height}
              className='w-full h-full object-cover rounded-xl'
            />
          </div>
          <div className='w-full flex flex-col gap-y-5 p-6 xl:w-[63%] xl:pl-0'>
            <div className='space-y-1'>
              <h3 className='text-2xl leading-7 font-semibold w-fit  bg-clip-text text-primary-500'>
                {teamMember.name}
              </h3>
              <p className='text-base leading-[26px] text-slate-400 font-light'>{teamMember.role?.name}</p>
            </div>
            <div className='flex flex-col justify-between gap-y-6'>
              <p
                className={cn(
                  usedLanguage === 'fr'
                    ? 'sm:h-[152px] min-[768px]:h-32 min-[848px]:h-24 min-[1056px]:h-[72px]'
                    : 'sm:h-[124px] min-[768px]:h-24 min-[880px]:h-20 min-[1200px]:h-[72px] min-[1232px]:h-14',
                  'h-fit text-base leading-[26px] text-slate-50 font-light italic xl:h-fit'
                )}
              >{`"${teamMember.bio}"`}</p>
              <div className='flex gap-x-6'>
                {teamMember.email && (
                  <Button
                    asChild
                    variant='link'
                    tone='secondary'
                    className='!pt-[3px]'
                  >
                    <Link href={`mailto:${teamMember.email}`}>
                      <Mail className='w-5 h-5 text-slate-400' />
                    </Link>
                  </Button>
                )}
                {teamMember.linkedin && (
                  <Button
                    asChild
                    variant='link'
                    tone='secondary'
                  >
                    <Link
                      href={`https://linkedin.com/in/${teamMember.linkedin}`}
                      target='_blank'
                    >
                      <Linkedin className='w-4 h-4 text-slate-400' />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
