import {faker} from '@faker-js/faker'
import LogoCloudsSimpleWithTitle, {LogoCloudsSimpleWithTitleProps} from './index'
import partnerFactory from '@/tests/factories/partner.factory'
import type {Meta} from '@storybook/react'

const meta = {
  title: 'components/Organisms/LogoClouds/LogoCloudsSimpleWithTitle',
  component: LogoCloudsSimpleWithTitle,
  tags: ['autodocs'],
  args: {
    title: faker.lorem.sentence(),
    items: Array.from({length: 4}, () => partnerFactory())
  }
} satisfies Meta<typeof LogoCloudsSimpleWithTitle>

export default meta

export const Slider = {
  name: 'Slider',
  variant: 'slider',
  render: (args: LogoCloudsSimpleWithTitleProps) => (
    <LogoCloudsSimpleWithTitle
      {...args}
      variant='slider'
    />
  )
}

export const Grid = {
  name: 'Grid',
  variant: 'grid',
  render: (args: LogoCloudsSimpleWithTitleProps) => (
    <LogoCloudsSimpleWithTitle
      {...args}
      variant='grid'
    />
  )
}
