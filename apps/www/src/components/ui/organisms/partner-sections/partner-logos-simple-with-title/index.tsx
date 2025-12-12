import {Partner} from '@/models/partner.model'
import LogoCloudsSimpleWithTitle, {LogoCloudVariant} from '../../logo-clouds/logo-clouds-simple-with-title'

export type PartnerLogosSimpleWithTitleProps = {
  surtitle: string
  title: string
  partners: Array<Partner>
  variant: LogoCloudVariant
}

export default function PartnerLogosSimpleWithTitle(props: PartnerLogosSimpleWithTitleProps) {
  return (
    <LogoCloudsSimpleWithTitle
      title={props.title}
      items={props.partners}
      variant={props.variant}
    />
  )
}
