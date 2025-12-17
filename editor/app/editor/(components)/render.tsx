'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import EditorImage from './editor-image';
import DestinationInCutOutsComponent from './global-composite-actions';

const RendererComponent = () => {
  const query = useSearchParams()
  const action=query.get('stage')
  switch (action) {
        case 'editing':
            return <EditorImage key={action}/>
        case 'showmasks':
            return <DestinationInCutOutsComponent key={action}  />
        default:
            return <EditorImage/>;
    }
}

export default RendererComponent
