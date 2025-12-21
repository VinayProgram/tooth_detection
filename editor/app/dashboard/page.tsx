'use client'

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Camera, Upload, ArrowRight } from "lucide-react"
import { usePostPolygonPoints } from "../editor/(api)/learn-api"

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [showCamera, setShowCamera] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const { mutateAsync, data, isPending } = usePostPolygonPoints()

  /* ---------------- CAMERA START (AFTER DOM EXISTS) ---------------- */
  useEffect(() => {
    if (!showCamera) return

    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
    }

    startCamera()

    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
  }, [showCamera])

  /* ---------------- CAPTURE ---------------- */
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")!
    ctx.drawImage(video, 0, 0)

    canvas.toBlob((blob) => {
      if (!blob) return

      const imgFile = new File([blob], "camera.jpg", {
        type: "image/jpeg"
      })

      setFile(imgFile)
      setPreview(URL.createObjectURL(blob))
      setShowCamera(false) // 🔴 close camera
    }, "image/jpeg")
  }

  /* ---------------- UPLOAD ---------------- */
  const uploadImage = async () => {
    if (!file) return alert("No image selected")
    const formData = new FormData()
    formData.append("file", file)
    await mutateAsync(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md relative">
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>
            Upload or click using camera
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* FILE INPUT */}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (!f) return
              setFile(f)
              setPreview(URL.createObjectURL(f))
            }}
          />

          {/* IMAGE PREVIEW */}
          {preview && (
            <img
              src={preview}
              className="w-full rounded-lg border"
              alt="Preview"
            />
          )}

          {/* CAMERA BUTTON */}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => setShowCamera(true)}
          >
            <Camera className="h-4 w-4" />
            Open Camera
          </Button>

          {/* UPLOAD */}
          <Button
            className="w-full"
            disabled={!file || isPending}
            onClick={uploadImage}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isPending ? "Uploading..." : "Upload"}
          </Button>

          {data && (
            <Link
              href={`/editor?file=${data.filename}`}
              className="flex justify-center gap-2 text-sm text-primary"
            >
              Open in Editor
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </CardContent>

        {/* ---------------- CAMERA DIV (CREATED FIRST) ---------------- */}
        {showCamera && (
          <div className="absolute inset-0 z-50 bg-black/80 p-4 flex flex-col gap-4 rounded-2xl">
            <video
              ref={videoRef}
              className="w-full rounded-lg"
              playsInline
              muted
            />

            <canvas ref={canvasRef} className="hidden" />

            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={capturePhoto}
            >
              📸 Click Photo
            </Button>

            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setShowCamera(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
