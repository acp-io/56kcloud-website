import {Dictionary} from '@/models/dictionary.model'
import {TeamMember} from '@/models/team-member.model'
import ComponentLayout from '@/components/ui/atoms/component-layout'
import TeamMemberCard from '@/components/ui/molecules/cards/team-member'

export type TeamTwoColumnProps = {
  title: string
  subtitle: string
  teamMembers: TeamMember[]
  dictionary: Dictionary
}

export default function TeamTwoColumn(props: TeamTwoColumnProps) {
  return (
    <ComponentLayout className='bg-primary-200'>
      <div className='pb-20 pt-9 lg:pb-[104px] lg:pt-[120px]'>
        <div className='mr-auto space-y-4 max-w-4xl'>
          <h2 className='w-fit text-[44px] leading-[48px] font-medium text-primary-600 lg:leading-[58px]'>
            {props.title}
          </h2>
          <p className='text-xl leading-[30px] text-primary-600 font-normal'>{props.subtitle}</p>
        </div>
        <ul
          role='list'
          className='grid grid-cols-1 mx-auto mt-10 gap-8 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none'
        >
          {props.teamMembers.map((teamMember) => (
            <TeamMemberCard
              key={teamMember.name}
              teamMember={teamMember}
              usedLanguage={props.dictionary.locale}
            />
          ))}
        </ul>
      </div>
    </ComponentLayout>
  )
}
