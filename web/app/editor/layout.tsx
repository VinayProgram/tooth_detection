'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import CanvasProvider from '../fabric-canvas-lib/canvas-provider'
import { queryClient } from '../providers/query-client-provider'

const layout = ({children}:{children:any}) => {
  return (
    <div>
    <QueryClientProvider client={queryClient}>
      <CanvasProvider>
        {children}
      </CanvasProvider>
    </QueryClientProvider>
    </div>
  )
}

export default layout
