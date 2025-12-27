'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import EditorImage from './editor-image'
import DestinationInCutOutsComponent, {
  DestinationOutCutOutsComponent,
} from './global-composite-actions'

const RendererComponent = () => {
  const query = useSearchParams()
  const action = query.get('stage')

  switch (action) {
    case 'editing':
      return <EditorImage key={action} />

    case 'showmasks-in':
      return <DestinationInCutOutsComponent key={action} />

    case 'showmasks-out':
      return <DestinationOutCutOutsComponent key={action} />

    case 'showmasks-both':
      return (
        <>
          <DestinationInCutOutsComponent  />
          <DestinationOutCutOutsComponent />
         
        </>
      )

    default:
      return <EditorImage />
  }
}

export default RendererComponent
