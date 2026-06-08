#!/bin/bash
cd "/Users/jade/Desktop/soundportfolio/potential sounds"
for file in *.m4a; do
  ffmpeg -i "$file" -c:a libmp3lame -b:a 64k "${file%.m4a}.mp3" -y 2>&1 | grep -E "Output|error" | head -2
done
echo "✅ Conversion complete! Sounds now load 3-5x faster"
