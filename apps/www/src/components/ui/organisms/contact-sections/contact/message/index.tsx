'use client'

import {useEffect, useRef} from 'react'

interface HubSpotWindow extends Window {
  hbspt?: {
    forms: {
      create: (options: {region: string; portalId: string; formId: string; target: HTMLElement}) => void
    }
  }
}

export type MessageProps = {
  className?: string
}

const HUBSPOT_PORTAL_ID = '7685644'
const HUBSPOT_FORM_ID = 'dae441f1-1a90-49d9-8381-d09982785614'
const HUBSPOT_REGION = 'na1'

export default function Message(props: MessageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const formDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/embed/7685644.js'
    script.defer = true
    scriptRef.current = script

    const formDiv = document.createElement('div')
    formDiv.className = 'hs-form-frame'
    formDiv.setAttribute('data-region', HUBSPOT_REGION)
    formDiv.setAttribute('data-form-id', HUBSPOT_FORM_ID)
    formDiv.setAttribute('data-portal-id', HUBSPOT_PORTAL_ID)
    formDivRef.current = formDiv

    script.onload = () => {
      const hubspotWindow = window as HubSpotWindow
      if (hubspotWindow.hbspt?.forms) {
        hubspotWindow.hbspt.forms.create({
          region: HUBSPOT_REGION,
          portalId: HUBSPOT_PORTAL_ID,
          formId: HUBSPOT_FORM_ID,
          target: formDiv
        })
      }
    }

    container.appendChild(script)
    container.appendChild(formDiv)

    return () => {
      if (scriptRef.current?.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current)
      }
      if (formDivRef.current?.parentNode) {
        formDivRef.current.parentNode.removeChild(formDivRef.current)
      }
      scriptRef.current = null
      formDivRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={props.className}
    />
  )
}
