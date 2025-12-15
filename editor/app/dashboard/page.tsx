'use client'

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, ArrowRight } from "lucide-react"
import { usePostPolygonPoints } from "../editor/(api)/learn-api"

const Page = () => {
  const [file, saveFile] = React.useState<FileList | null>(null)
  const { mutateAsync: fileUpload, data: fileResult, isPending } = usePostPolygonPoints()

  const uploadFile = async () => {
    if (!file) return alert("No file selected")
    const formData = new FormData()
    formData.append("file", file[0])
    await fileUpload(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl font-semibold">
            Upload Image
          </CardTitle>
          <CardDescription>
            Select a file to open it in the polygon editor
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Choose file
            </label>
            <Input
              type="file"
              onChange={(e) => saveFile(e.currentTarget.files)}
            />
          </div>

          <Button
            className="w-full flex items-center gap-2"
            disabled={!file || isPending}
            onClick={uploadFile}
          >
            <Upload className="h-4 w-4" />
            {isPending ? "Uploading..." : "Upload"}
          </Button>

          {fileResult && (
            <div className="pt-2">
              <Link
                href={`/editor?file=${fileResult.filename}`}
                className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Open in Editor
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
