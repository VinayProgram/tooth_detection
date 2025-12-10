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

export const getPolygonPoints = async (): Promise<machineLearnDataType> => {
  const res = await fetch("http://localhost:3000/machine-learn", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch polygon data");
  }

  return res.json() as Promise<machineLearnDataType>;
};
