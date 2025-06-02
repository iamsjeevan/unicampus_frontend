#!/bin/bash

# Output file where all content will be concatenated
OUTPUT_FILE="frontend_attendance_integration.txt"

# Ensure the script is run from the project root (basic check)
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo "ERROR: Please run this script from the root of your unicampus_frontend project."
  echo "       (The directory containing package.json and the src/ folder)"
  exit 1
fi

# List of files to concatenate
# Primary file needed for this integration:
FILES_TO_COLLECT=(
  "src/components/attendance/AttendanceScreen.tsx"
)

# Also include AuthContext and apiClient again, as they are fundamental
# and any recent changes to them would be relevant.
ALWAYS_INCLUDE=(
  "src/contexts/AuthContext.tsx"
  "src/lib/apiClient.ts"
)


# Clear the output file or create it with a header
echo "Frontend files for Attendance API integration - Collected on $(date)" > "$OUTPUT_FILE"
echo "======================================================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "Processing primary file for Attendance integration..."
for FILE_PATH in "${FILES_TO_COLLECT[@]}"; do
  if [ -f "$FILE_PATH" ]; then
    echo "--- START OF FILE: $FILE_PATH ---" >> "$OUTPUT_FILE"
    cat "$FILE_PATH" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE" # Add a newline for better separation
    echo "--- END OF FILE: $FILE_PATH ---" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "--------------------------------------------------------------" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "Added: $FILE_PATH"
  else
    echo "!!! WARNING: File not found, skipping: $FILE_PATH !!!" >> "$OUTPUT_FILE"
    echo "!!! WARNING: File not found, skipping: $FILE_PATH !!!"
  fi
done

echo ""
echo "Processing core context/utility files (AuthContext, apiClient)..."
for FILE_PATH in "${ALWAYS_INCLUDE[@]}"; do
  if [ -f "$FILE_PATH" ]; then
    echo "--- START OF CORE FILE: $FILE_PATH ---" >> "$OUTPUT_FILE"
    cat "$FILE_PATH" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "--- END OF CORE FILE: $FILE_PATH ---" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "--------------------------------------------------------------" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "Added (Core): $FILE_PATH"
  else
    echo "!!! WARNING: Core file not found, skipping: $FILE_PATH !!!" >> "$OUTPUT_FILE"
    echo "!!! WARNING: Core file not found, skipping: $FILE_PATH !!!"
  fi
done


echo ""
echo "All requested file contents have been written to: $OUTPUT_FILE"
echo "Please open $OUTPUT_FILE, copy its entire content, and paste it for me."