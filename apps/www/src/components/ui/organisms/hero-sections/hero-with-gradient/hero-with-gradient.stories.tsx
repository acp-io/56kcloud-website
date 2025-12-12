import {faker} from '@faker-js/faker'
import HeroWithGradient, {HeroWithGradientProps} from './index'
import type {Meta} from '@storybook/react'

const meta = {
  title: 'components/Organisms/HeroSections/HeroWithGradient',
  component: HeroWithGradient,
  tags: ['autodocs'],
  args: {
    title: faker.lorem.sentence(),
    subtitle: faker.lorem.sentence()
  }
} satisfies Meta<typeof HeroWithGradient>

export default meta

export const Default = {
  name: 'Default',
  render: (args: HeroWithGradientProps) => <HeroWithGradient {...args} />
}
