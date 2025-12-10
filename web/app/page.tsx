'use client'
import React from 'react'
import { getPolygonPoints } from './(api)/learn-api'
import ImageEditingCanvas from './(components)/canvas'

const page = () => {

  return (
    <div>
      <ImageEditingCanvas/>
      {/* <LassoCanvas imageSrc='/test2.jpg' height={100}/> */}
    </div>
  )
}

export default page
