import {IconProps} from '@/models/icon.model'
import Acp from './index'
import type {Meta} from '@storybook/react'

const meta = {
  title: 'components/Svgs/Logos/Acp',
  component: Acp,
  tags: ['autodocs']
} satisfies Meta<typeof Acp>

export default meta

export const Default = {
  name: 'Default',
  render: (args: IconProps) => <Acp {...args} />
}
