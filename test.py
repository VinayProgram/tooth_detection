from ultralytics import YOLO
import numpy as np

model = YOLO("best.pt")
results = model("test2.jpg")

res = results[0]

# ORIGINAL image size
h, w = res.orig_shape
print("Original Image Size:", w, "x", h)

# SEGMENTATION POLYGONS
if res.masks is not None:
    masks = res.masks  # ultralytics Masks object
    
    for i, polygon in enumerate(masks.xy):
        print(f"\n--- Segmentation #{i} ---")  
        print("Polygon points:", polygon.tolist())   # list of [x,y] points

        # Convert polygon to a NumPy mask to compute w/h
        mask = masks.data[i].cpu().numpy()  # boolean mask: HxW

        # Get coordinates where mask = True
        ys, xs = np.where(mask == 1)
        
        xmin, xmax = xs.min(), xs.max()
        ymin, ymax = ys.min(), ys.max()

        width = xmax - xmin
        height = ymax - ymin
        area = mask.sum()

        print("Bounding box:", xmin, ymin, xmax, ymax)
        print("Width:", width)
        print("Height:", height)
        print("Mask area (px):", area)
else:
    print("No segmentation masks found.")
