'use client'

import { Button } from "@/components/ui/button"
import React from "react"
import { usePostPolygonPoints } from "../editor/(api)/learn-api"
import Link from "next/link"

const page = () => {
  const [file, saveFile] = React.useState<FileList | null>(null)
  const { mutateAsync: fileUpload, data: fileResult } = usePostPolygonPoints()
  const uploadFile = async () => {
    if (!file) return alert('no file selected ')
    const formData = new FormData()
    formData.append('file', file[0])
    await fileUpload(formData)
  }
  return (
    <>
      <div>
        Please enter a file to enter editor
        <input type="file" onChange={(e) => saveFile(e.currentTarget.files)}></input>
        <Button disabled={!file} onClick={() => uploadFile()}>Upload</Button>
      </div>
       {fileResult&&<Link href={`http://localhost:3000/editor?file=${fileResult?.filename}`}>Redirect to Editor</Link>}
    </>
  )
}

export default page
