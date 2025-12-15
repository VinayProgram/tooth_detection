'use client'
import { useMutation, useQuery } from "@tanstack/react-query"
import React from "react"

export interface machineLearnDataType {
  original_width: number
  original_height: number
  segments: Segment[]
}

export interface Segment {
  id: number
  polygon: number[][]
  bbox: Bbox
  area: number
}

export interface Bbox {
  xmin: number
  ymin: number
  xmax: number
  ymax: number
  width: number
  height: number
}

export const postPolygonPoints = async (data:any): Promise<machineLearnDataType> => {
  const res = await fetch("http://localhost:7541/machine-learn", {
    method: "POST",
    body:data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch polygon data");
  }

  return res.json() as Promise<machineLearnDataType>;
};


export const useGetPolygonPoints=()=>useMutation({
  mutationKey:['polygonPoints'],
  mutationFn:async(data)=>await postPolygonPoints(data)
})