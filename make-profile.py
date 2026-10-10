#!/usr/bin/env python3
"""Regenerate the hero photo sizes from img/profile.png.

The site serves two square JPEGs that this script derives from the PNG source:
    img/profile.jpg      560x560   standard screens
    img/profile@2x.jpg  1120x1120  retina, chosen by srcset

Run it after replacing img/profile.png:

    python make-profile.py

Requires Pillow (pip install Pillow).
"""

import os
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(HERE, "img")
SOURCE = os.path.join(IMG, "profile.png")

# Fraction of the vertical overflow taken off the top when cropping a portrait
# to a square. 0 keeps the very top of the frame, 0.5 centres it. 0.10 leaves
# headroom above the hair and crops at the chest instead.
TOP_BIAS = 0.10

SIZES = [(560, "profile.jpg"), (1120, "profile@2x.jpg")]
QUALITY = 88


def main():
    if not os.path.exists(SOURCE):
        sys.exit(f"No source image at {SOURCE}")

    src = Image.open(SOURCE).convert("RGB")
    w, h = src.size
    side = min(w, h)
    top = int((h - side) * TOP_BIAS)
    square = src.crop((0, top, side, top + side))

    print(f"source {os.path.basename(SOURCE)}  {w}x{h}")
    for px, name in SIZES:
        path = os.path.join(IMG, name)
        square.resize((px, px), Image.LANCZOS).save(
            path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        print(f"  wrote {name:16} {px}x{px}  {os.path.getsize(path) / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
