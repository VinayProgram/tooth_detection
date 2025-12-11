'use client'
import CanvasProvider from '../fabric-canvas-lib/canvas-provider'

const layout = ({children}:{children:any}) => {
  return (
    <div>
      <CanvasProvider>
        {children}
      </CanvasProvider>
    </div>
  )
}

export default layout
