'use client'
import React from 'react'
import { getPolygonPoints } from './(api)/learn-api'
import ImageEditingCanvas from './(components)/canvas'

const page = () => {

  return (
    <div>
      <ImageEditingCanvas/>
    </div>
  )
}

export default page
