import {IconProps} from '@/models/icon.model'
import AcpE from './index'
import type {Meta} from '@storybook/react'

const meta = {
  title: 'components/Svgs/Logos/AcpE',
  component: AcpE,
  tags: ['autodocs']
} satisfies Meta<typeof AcpE>

export default meta

export const Default = {
  name: 'Default',
  render: (args: IconProps) => (
    <AcpE
      {...args}
      className='text-white'
    />
  )
}
