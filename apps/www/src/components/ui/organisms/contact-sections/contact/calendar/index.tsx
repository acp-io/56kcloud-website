'use client'

import {useEffect, useRef} from 'react'

export type CalendarOptions = 'sandro' | 'darragh' | 'jpgehrig' | 'kevin' | 'team'

export type CalendarProps = {
  className?: string
  calendar?: CalendarOptions
}

const calendars = {
  darragh: {
    src: 'https://events.56k.cloud/meetings/56k/darragh?embed=true'
  },
  jpgehrig: {
    src: 'https://events.56k.cloud/meetings/jpgehrig/meet?embed=true'
  },
  kevin: {
    src: 'https://events.56k.cloud/meetings/kevin2454?embed=true'
  },
  sandro: {
    src: 'https://meetings.hubspot.com/sandro4?embed=true'
  },
  team: {
    src: 'https://events.56k.cloud/meetings/56k/team?embed=true'
  }
} as const

const MEETINGS_SCRIPT_URL = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'

export default function Calendar(props: CalendarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const formDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const script = document.createElement('script')
    script.src = MEETINGS_SCRIPT_URL
    script.type = 'text/javascript'
    script.defer = true
    scriptRef.current = script

    const formDiv = document.createElement('div')
    formDiv.className = 'meetings-iframe-container h-full'
    formDiv.setAttribute('data-src', calendars[props.calendar ?? 'darragh'].src)
    formDivRef.current = formDiv

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
  }, [props.calendar])

  return (
    <div
      ref={containerRef}
      className={props.className}
    />
  )
}
