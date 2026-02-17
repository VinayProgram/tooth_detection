import sys
import json
from ultralytics import YOLO
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "best.pt")

# Get file path from CLI
if len(sys.argv) < 2:
    print(json.dumps({"error": "No file path provided"}))
    sys.exit(1)

image_path = sys.argv[1]

model = YOLO(MODEL_PATH)
results = model(image_path)
res = results[0]

output = {
    "original_width": res.orig_shape[1],
    "original_height": res.orig_shape[0],
    "segments": []
}

if res.masks is not None:
    masks = res.masks

    for i, polygon in enumerate(masks.xy):
        mask = masks.data[i].cpu().numpy()

        ys, xs = np.where(mask == 1)
        xmin, xmax = int(xs.min()), int(xs.max())
        ymin, ymax = int(ys.min()), int(ys.max())

        width = int(xmax - xmin)
        height = int(ymax - ymin)
        area = int(mask.sum())

        output["segments"].append({
            "id": i,
            "polygon": polygon.tolist(),
            "bbox": {
                "xmin": xmin,
                "ymin": ymin,
                "xmax": xmax,
                "ymax": ymax,
                "width": width,
                "height": height
            },
            "area": area
        })
else:
    output["segments"] = []

# --------------------------
# SAVE JSON FILE (added only this)
# --------------------------
json_path = "result.json"
with open(json_path, "w") as f:
    json.dump(output, f, indent=4)

